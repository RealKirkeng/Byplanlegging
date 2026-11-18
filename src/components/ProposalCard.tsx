'use client';

import Link from 'next/link';
import { ArrowUpRight, Check, Expand } from 'lucide-react';
import { StyleBadge } from '@/components/StyleBadge';
import type { Proposal } from '@/lib/types';

interface ProposalCardProps {
  proposal: Proposal;
  actorName: string;
  index: number;
  votes: number;
  votePercentage: number;
  isUserVoted: boolean;
  onVote: () => void;
  onOpenImage?: () => void;
}

export function ProposalCard({
  proposal,
  actorName,
  index,
  votes,
  votePercentage,
  isUserVoted,
  onVote,
  onOpenImage,
}: ProposalCardProps) {
  const indexLabel = String(index + 1).padStart(2, '0');
  const detailHref = `/omrader/${proposal.areaSlug}/forslag/${proposal.slug}`;

  return (
    <article className="editorial-card">
      <div className="card-image-frame">
        <Link href={detailHref} aria-label={`Se forslag: ${proposal.title}`}>
          <img
            src={proposal.heroImageUrl}
            alt={`${proposal.title} — illustrasjon av ${actorName}`}
            width={1280}
            height={800}
            loading="lazy"
          />
        </Link>

        <div
          style={{
            position: 'absolute',
            insetBlockStart: '0.85rem',
            insetInlineStart: '0.85rem',
            padding: '0.28rem 0.6rem',
            background: 'rgba(8, 8, 10, 0.85)',
            border: '1px solid var(--border-strong)',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: 'var(--accent-brass-bright)',
          }}
        >
          FORSLAG {indexLabel}
        </div>

        {onOpenImage && (
          <button
            type="button"
            onClick={onOpenImage}
            aria-label={`Forstørr illustrasjon for ${proposal.title}`}
            style={{
              position: 'absolute',
              insetBlockEnd: '0.85rem',
              insetInlineEnd: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.38rem 0.65rem',
              background: 'rgba(8, 8, 10, 0.85)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text-primary)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <Expand size={13} aria-hidden="true" />
            <span>Forstørr</span>
          </button>
        )}
      </div>

      <div className="card-body">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <StyleBadge style={proposal.style} />
          {proposal.isUserSubmitted ? (
            <span
              className="font-mono-meta"
              style={{ color: 'var(--accent-brass)' }}
            >
              NYTT INNSENDT BIDRAG · {actorName}
            </span>
          ) : (
            <Link
              href={`/aktorer/${proposal.actorSlug}`}
              className="font-mono-meta"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textDecorationColor: 'var(--border-strong)',
              }}
            >
              {actorName}
            </Link>
          )}
        </div>

        <div>
          <h3
            className="font-display"
            style={{ margin: '0 0 0.35rem', fontSize: '1.75rem' }}
          >
            <Link href={detailHref}>{proposal.title}</Link>
          </h3>
          <p
            style={{
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-sm)',
            }}
          >
            {proposal.subtitle}
          </p>
        </div>

        <div className="metrics-row">
          <div>
            <span className="metric-cell-label">Maks høyde</span>
            <span className="metric-cell-value">{proposal.maxFloors} etg.</span>
          </div>
          <div>
            <span className="metric-cell-label">Boliger</span>
            <span className="metric-cell-value">
              {proposal.estimatedHomes.toLocaleString('nb-NO')}
            </span>
          </div>
          <div>
            <span className="metric-cell-label">Grøntareal</span>
            <span className="metric-cell-value">{proposal.greenSpacePercent} %</span>
          </div>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--font-xs)',
              marginBlockEnd: '0.35rem',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>
              Innbyggeroppslutning ({votes.toLocaleString('nb-NO')} stemmer)
            </span>
            <span
              className="font-mono-meta"
              style={{ color: 'var(--accent-brass-bright)' }}
            >
              {votePercentage} %
            </span>
          </div>
          <div className="poll-bar-track" aria-hidden="true">
            <div
              className="poll-bar-fill"
              style={{ inlineSize: `${votePercentage}%` }}
            />
          </div>
        </div>

        <div
          style={{
            marginBlockStart: 'auto',
            paddingBlockStart: '0.4rem',
            display: 'flex',
            gap: '0.6rem',
            flexWrap: 'wrap',
          }}
        >
          <Link href={detailHref} className="btn btn-sm" style={{ flex: '1 1 auto' }}>
            <span>Les forslag</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={onVote}
            className={`btn btn-sm ${
              isUserVoted ? 'btn-primary' : 'btn-brass-outline'
            }`}
            aria-pressed={isUserVoted}
          >
            {isUserVoted && <Check size={14} aria-hidden="true" />}
            <span>{isUserVoted ? 'Valgt favoritt' : 'Stem på denne'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
