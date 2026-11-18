import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AreaDetailClient } from '@/components/AreaDetailClient';
import { getAreaBySlug } from '@/data/areas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return { title: 'Område ikke funnet' };

  return {
    title: `${area.name} (${area.city})`,
    description: area.summary,
  };
}

export default async function AreaDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ tab?: string; a?: string; b?: string }>;
}) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const initialTab = query.tab === 'sammenlign' ? 'sammenlign' : 'galleri';

  return (
    <AreaDetailClient
      area={area}
      initialTab={initialTab}
      initialCompareA={query.a}
      initialCompareB={query.b}
    />
  );
}
