'use client';

import { useCallback, useEffect, useState } from 'react';
import { getActorBySlug } from '@/data/actors';
import { getAreaBySlug } from '@/data/areas';
import { SEED_COMMENTS } from '@/data/comments';
import { SEED_PROPOSALS } from '@/data/proposals';
import type {
  AreaPollStats,
  AreaQualityStats,
  CommentItem,
  Proposal,
  ProposalSubmissionInput,
  QualityRatings,
} from '@/lib/types';

const STORAGE_KEYS = {
  votes: 'bysjon_votes_v1',
  ratings: 'bysjon_ratings_v1',
  comments: 'bysjon_comments_v1',
  submissions: 'bysjon_submissions_v1',
} as const;

const STORE_EVENT = 'bysjon-store-updated';

type VotesMap = Record<string, string>; // areaSlug -> proposalSlug
type RatingsMap = Record<string, QualityRatings>; // areaSlug -> ratings

interface PersistedState {
  votes: VotesMap;
  ratings: RatingsMap;
  comments: CommentItem[];
  submissions: Proposal[];
}

const EMPTY_STATE: PersistedState = {
  votes: {},
  ratings: {},
  comments: [],
  submissions: [],
};

function safeReadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJson<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(STORE_EVENT));
    return true;
  } catch {
    return false;
  }
}

function readAllState(): PersistedState {
  return {
    votes: safeReadJson<VotesMap>(STORAGE_KEYS.votes, {}),
    ratings: safeReadJson<RatingsMap>(STORAGE_KEYS.ratings, {}),
    comments: safeReadJson<CommentItem[]>(STORAGE_KEYS.comments, []),
    submissions: safeReadJson<Proposal[]>(STORAGE_KEYS.submissions, []),
  };
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replaceAll('æ', 'ae')
    .replaceAll('ø', 'o')
    .replaceAll('å', 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export function resolveActorName(proposal: Proposal): string {
  if (proposal.actorNameOverride) return proposal.actorNameOverride;
  return getActorBySlug(proposal.actorSlug)?.name ?? 'Uavhengig bidragsyter';
}

export function useBysjonStore() {
  const [persisted, setPersisted] = useState<PersistedState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);

  const syncFromStorage = useCallback(() => {
    setPersisted(readAllState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    syncFromStorage();
    const onStoreEvent = () => syncFromStorage();
    const onStorageEvent = () => syncFromStorage();
    window.addEventListener(STORE_EVENT, onStoreEvent);
    window.addEventListener('storage', onStorageEvent);
    return () => {
      window.removeEventListener(STORE_EVENT, onStoreEvent);
      window.removeEventListener('storage', onStorageEvent);
    };
  }, [syncFromStorage]);

  const getAllProposals = useCallback((): Proposal[] => {
    return [...persisted.submissions, ...SEED_PROPOSALS];
  }, [persisted.submissions]);

  const getProposalsForArea = useCallback(
    (areaSlug: string): Proposal[] => {
      return getAllProposals().filter((p) => p.areaSlug === areaSlug);
    },
    [getAllProposals]
  );

  const getProposalsForActor = useCallback(
    (actorSlug: string): Proposal[] => {
      return getAllProposals().filter((p) => p.actorSlug === actorSlug);
    },
    [getAllProposals]
  );

  const getProposalBySlugs = useCallback(
    (areaSlug: string, proposalSlug: string): Proposal | undefined => {
      return getAllProposals().find(
        (p) => p.areaSlug === areaSlug && p.slug === proposalSlug
      );
    },
    [getAllProposals]
  );

  const getAreaVoteStats = useCallback(
    (areaSlug: string): AreaPollStats => {
      const proposals = getProposalsForArea(areaSlug);
      const userVote = persisted.votes[areaSlug] ?? null;

      const rawCounts = proposals.map((proposal) => {
        const extraVote = userVote === proposal.slug ? 1 : 0;
        return {
          proposal,
          votes: proposal.seedVotes + extraVote,
        };
      });

      const totalVotes = rawCounts.reduce((acc, item) => acc + item.votes, 0);

      const entries = rawCounts
        .map(({ proposal, votes }) => ({
          proposalSlug: proposal.slug,
          title: proposal.title,
          style: proposal.style,
          actorName: resolveActorName(proposal),
          votes,
          percentage:
            totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0,
        }))
        .sort((a, b) => b.votes - a.votes);

      return {
        totalVotes,
        userVotedProposalSlug: userVote,
        entries,
      };
    },
    [getProposalsForArea, persisted.votes]
  );

  const getAreaQualityStats = useCallback(
    (areaSlug: string): AreaQualityStats => {
      const area = getAreaBySlug(areaSlug);
      const base = area?.seedQualityAverages ?? {
        klassiskEstetikk: 4.0,
        gronneByrom: 4.2,
        menneskeligSkala: 4.1,
        aktivtByliv: 4.0,
      };
      const baseCount = area?.seedQualityResponseCount ?? 100;
      const userRatings = persisted.ratings[areaSlug] ?? null;

      if (!userRatings) {
        return {
          responseCount: baseCount,
          averages: base,
          userRatings: null,
        };
      }

      const newCount = baseCount + 1;
      const blend = (seedAvg: number, userVal: number) =>
        Number(((seedAvg * baseCount + userVal) / newCount).toFixed(1));

      return {
        responseCount: newCount,
        averages: {
          klassiskEstetikk: blend(
            base.klassiskEstetikk,
            userRatings.klassiskEstetikk
          ),
          gronneByrom: blend(base.gronneByrom, userRatings.gronneByrom),
          menneskeligSkala: blend(
            base.menneskeligSkala,
            userRatings.menneskeligSkala
          ),
          aktivtByliv: blend(base.aktivtByliv, userRatings.aktivtByliv),
        },
        userRatings,
      };
    },
    [persisted.ratings]
  );

  const getCommentsForProposal = useCallback(
    (areaSlug: string, proposalSlug: string): CommentItem[] => {
      return [...persisted.comments, ...SEED_COMMENTS]
        .filter(
          (c) => c.areaSlug === areaSlug && c.proposalSlug === proposalSlug
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    },
    [persisted.comments]
  );

  const getCommentsForArea = useCallback(
    (areaSlug: string): CommentItem[] => {
      return [...persisted.comments, ...SEED_COMMENTS]
        .filter((c) => c.areaSlug === areaSlug)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    },
    [persisted.comments]
  );

  const castProposalVote = useCallback(
    (areaSlug: string, proposalSlug: string) => {
      const current = readAllState();
      const nextVotes: VotesMap = {
        ...current.votes,
        [areaSlug]: proposalSlug,
      };
      safeWriteJson(STORAGE_KEYS.votes, nextVotes);
    },
    []
  );

  const submitQualityRatings = useCallback(
    (areaSlug: string, ratings: QualityRatings) => {
      const current = readAllState();
      const nextRatings: RatingsMap = {
        ...current.ratings,
        [areaSlug]: ratings,
      };
      safeWriteJson(STORAGE_KEYS.ratings, nextRatings);
    },
    []
  );

  const addComment = useCallback(
    (input: {
      areaSlug: string;
      proposalSlug: string;
      authorName: string;
      authorRole: string;
      body: string;
    }): CommentItem => {
      const newItem: CommentItem = {
        id: `c-user-${Date.now()}`,
        areaSlug: input.areaSlug,
        proposalSlug: input.proposalSlug,
        authorName: input.authorName.trim(),
        authorRole: input.authorRole.trim() || 'Innbygger',
        body: input.body.trim(),
        createdAt: new Date().toISOString(),
      };
      const current = readAllState();
      safeWriteJson(STORAGE_KEYS.comments, [newItem, ...current.comments]);
      return newItem;
    },
    []
  );

  const submitNewProposal = useCallback(
    (input: ProposalSubmissionInput): Proposal => {
      const baseSlug = slugify(input.title) || 'nytt-forslag';
      const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      const today = new Date().toISOString().slice(0, 10);

      const newProposal: Proposal = {
        slug: uniqueSlug,
        areaSlug: input.areaSlug,
        actorSlug: slugify(input.actorName) || 'ekstern-aktor',
        actorNameOverride: input.actorName.trim(),
        title: input.title.trim(),
        subtitle: input.subtitle.trim(),
        style: input.style,
        maxFloors: input.maxFloors,
        estimatedHomes: input.estimatedHomes,
        greenSpacePercent: input.greenSpacePercent,
        primaryMaterials: input.primaryMaterials.trim(),
        streetLifeSummary: input.streetLifeSummary.trim(),
        architecturalVision: input.architecturalVision.trim(),
        principles: input.principles.filter((p) => p.trim().length > 0),
        highlights: [
          `Innsendt av ${input.actorName.trim()} (${input.actorRoleNote.trim() || 'Ekstern aktør'})`,
          `${input.greenSpacePercent} % grønt- og fellesareal i prosjektet`,
        ],
        tradeoffs: [
          'Nylig innsendt konsept — venter på videre innbyggerinnspill og teknisk vurdering',
        ],
        heroImageUrl: input.heroImageUrl,
        galleryImages: [
          {
            url: input.heroImageUrl,
            caption: `${input.title.trim()} — innsendt illustrasjon fra ${input.actorName.trim()}`,
            perspective: 'Hovedillustrasjon',
          },
        ],
        seedVotes: 1,
        submittedAt: today,
        isUserSubmitted: true,
      };

      const current = readAllState();
      safeWriteJson(STORAGE_KEYS.submissions, [
        newProposal,
        ...current.submissions,
      ]);
      return newProposal;
    },
    []
  );

  return {
    hydrated,
    userVotes: persisted.votes,
    userRatings: persisted.ratings,
    getAllProposals,
    getProposalsForArea,
    getProposalsForActor,
    getProposalBySlugs,
    getAreaVoteStats,
    getAreaQualityStats,
    getCommentsForProposal,
    getCommentsForArea,
    castProposalVote,
    submitQualityRatings,
    addComment,
    submitNewProposal,
  };
}
