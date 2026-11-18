export type ArchitecturalStyle = 'Klassisk' | 'Nyurbanisme' | 'Moderne' | 'Økologisk';

export type AreaStatus = 'Åpen høring' | 'Under utredning' | 'Konseptfase';

export type ActorCategory =
  | 'Arkitekturbevegelse'
  | 'Arkitektkontor'
  | 'Urbanisme-studio'
  | 'Landskap & Byform';

export type QualityMetricKey =
  | 'klassiskEstetikk'
  | 'gronneByrom'
  | 'menneskeligSkala'
  | 'aktivtByliv';

export type QualityRatings = Record<QualityMetricKey, number>;

export interface Area {
  slug: string;
  name: string;
  city: string;
  municipality: string;
  region: string;
  coordinates: string;
  status: AreaStatus;
  areaDekar: number;
  plannedHomes: string;
  timeline: string;
  summary: string;
  contextBody: string;
  keyQuestions: string[];
  heroImageUrl: string;
  heroCaption: string;
  seedQualityAverages: QualityRatings;
  seedQualityResponseCount: number;
}

export interface Actor {
  slug: string;
  name: string;
  category: ActorCategory;
  city: string;
  tagline: string;
  philosophy: string;
  focusTags: string[];
  websiteLabel: string;
  isDemoProfile: boolean;
}

export interface GalleryImage {
  url: string;
  caption: string;
  perspective: string;
}

export interface Proposal {
  slug: string;
  areaSlug: string;
  actorSlug: string;
  actorNameOverride?: string;
  title: string;
  subtitle: string;
  style: ArchitecturalStyle;
  maxFloors: number;
  estimatedHomes: number;
  greenSpacePercent: number;
  primaryMaterials: string;
  streetLifeSummary: string;
  architecturalVision: string;
  principles: string[];
  highlights: string[];
  tradeoffs: string[];
  heroImageUrl: string;
  galleryImages: GalleryImage[];
  seedVotes: number;
  submittedAt: string;
  isUserSubmitted?: boolean;
}

export interface CommentItem {
  id: string;
  areaSlug: string;
  proposalSlug: string;
  authorName: string;
  authorRole: string;
  body: string;
  createdAt: string;
}

export interface ProposalVoteEntry {
  proposalSlug: string;
  title: string;
  style: ArchitecturalStyle;
  actorName: string;
  votes: number;
  percentage: number;
}

export interface AreaPollStats {
  totalVotes: number;
  userVotedProposalSlug: string | null;
  entries: ProposalVoteEntry[];
}

export interface AreaQualityStats {
  responseCount: number;
  averages: QualityRatings;
  userRatings: QualityRatings | null;
}

export interface ProposalSubmissionInput {
  areaSlug: string;
  actorName: string;
  actorRoleNote: string;
  title: string;
  subtitle: string;
  style: ArchitecturalStyle;
  maxFloors: number;
  estimatedHomes: number;
  greenSpacePercent: number;
  primaryMaterials: string;
  streetLifeSummary: string;
  architecturalVision: string;
  principles: string[];
  heroImageUrl: string;
}
