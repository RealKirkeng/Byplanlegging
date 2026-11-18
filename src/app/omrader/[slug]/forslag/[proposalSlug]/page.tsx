import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProposalDetailClient } from '@/components/ProposalDetailClient';
import { getAreaBySlug } from '@/data/areas';
import { SEED_PROPOSALS } from '@/data/proposals';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; proposalSlug: string }>;
}): Promise<Metadata> {
  const { slug, proposalSlug } = await params;
  const area = getAreaBySlug(slug);
  const proposal = SEED_PROPOSALS.find(
    (p) => p.areaSlug === slug && p.slug === proposalSlug
  );

  if (!area) return { title: 'Område ikke funnet' };
  if (!proposal) return { title: `Forslag for ${area.name}` };

  return {
    title: `${proposal.title} — ${area.name}`,
    description: proposal.subtitle,
  };
}

export default async function ProposalDetailPage({
  params,
}: {
  params: Promise<{ slug: string; proposalSlug: string }>;
}) {
  const { slug, proposalSlug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const initialProposal =
    SEED_PROPOSALS.find(
      (p) => p.areaSlug === area.slug && p.slug === proposalSlug
    ) ?? null;

  return (
    <ProposalDetailClient
      area={area}
      proposalSlug={proposalSlug}
      initialProposal={initialProposal}
    />
  );
}
