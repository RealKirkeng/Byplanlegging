import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { StyleBadge } from '@/components/StyleBadge';
import { getActorBySlug } from '@/data/actors';
import { getAreaBySlug } from '@/data/areas';
import { getSeedProposalsByActor } from '@/data/proposals';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const actor = getActorBySlug(slug);
  if (!actor) return { title: 'Aktør ikke funnet' };
  return {
    title: actor.name,
    description: actor.tagline,
  };
}

export default async function ActorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const actor = getActorBySlug(slug);
  if (!actor) notFound();

  const proposals = getSeedProposalsByActor(actor.slug);
  const totalVotes = proposals.reduce((s, p) => s + p.seedVotes, 0);

  return (
    <section className="section-pad">
      <div className="container">
        <div style={{ marginBlockEnd: '1.5rem' }}>
          <Link href="/aktorer" className="btn btn-sm">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Alle aktører</span>
          </Link>
        </div>

        <div
          style={{
            padding: 'var(--space-lg)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-hairline)',
            marginBlockEnd: 'var(--space-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          <div>
            <span className="eyebrow">
              {actor.category} · {actor.city}
            </span>
            <h1
              className="font-display"
              style={{ margin: '0.6rem 0 0.85rem', fontSize: 'var(--font-display)' }}
            >
              {actor.name}
            </h1>
            <p
              style={{
                margin: '0 0 1.25rem',
                fontSize: 'var(--font-lg)',
                color: 'var(--accent-brass-bright)',
              }}
            >
              {actor.tagline}
            </p>
            <p
              style={{
                margin: 0,
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
              }}
            >
              {actor.philosophy}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              justifyContent: 'space-between',
            }}
          >
            <div className="metrics-row">
              <div>
                <span className="metric-cell-label">Forslag</span>
                <span className="metric-cell-value">{proposals.length}</span>
              </div>
              <div>
                <span className="metric-cell-label">Byer</span>
                <span className="metric-cell-value">
                  {new Set(proposals.map((p) => p.areaSlug)).size}
                </span>
              </div>
              <div>
                <span className="metric-cell-label">Stemmer</span>
                <span className="metric-cell-value">
                  {totalVotes.toLocaleString('nb-NO')}
                </span>
              </div>
            </div>

            <div>
              <span
                className="font-mono-meta"
                style={{ color: 'var(--text-muted)', display: 'block', marginBlockEnd: '0.55rem' }}
              >
                FAGOMRÅDER
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {actor.focusTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.35rem 0.7rem',
                      border: '1px solid var(--border-strong)',
                      fontSize: 'var(--font-xs)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="font-mono-meta"
              style={{
                padding: '0.85rem 1rem',
                background: 'var(--bg-void)',
                border: '1px solid var(--border-hairline)',
                color: 'var(--text-muted)',
              }}
            >
              {actor.websiteLabel}
            </div>
          </div>
        </div>

        <div>
          <span className="eyebrow">Publiserte planer</span>
          <h2
            className="font-display"
            style={{ margin: '0.5rem 0 var(--space-md)', fontSize: 'var(--font-2xl)' }}
          >
            Forslag fra {actor.name}
          </h2>

          <div className="grid-2">
            {proposals.map((proposal) => {
              const area = getAreaBySlug(proposal.areaSlug);
              return (
                <article key={proposal.slug} className="editorial-card">
                  <div className="card-image-frame">
                    <Link
                      href={`/omrader/${proposal.areaSlug}/forslag/${proposal.slug}`}
                    >
                      <img
                        src={proposal.heroImageUrl}
                        alt={proposal.title}
                        width={1280}
                        height={800}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <StyleBadge style={proposal.style} />
                      <span
                        className="font-mono-meta"
                        style={{ color: 'var(--accent-brass)' }}
                      >
                        {area?.name}, {area?.city}
                      </span>
                    </div>
                    <h3
                      className="font-display"
                      style={{ margin: 0, fontSize: '1.75rem' }}
                    >
                      <Link
                        href={`/omrader/${proposal.areaSlug}/forslag/${proposal.slug}`}
                      >
                        {proposal.title}
                      </Link>
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
                    <div style={{ marginBlockStart: 'auto' }}>
                      <Link
                        href={`/omrader/${proposal.areaSlug}/forslag/${proposal.slug}`}
                        className="btn btn-sm"
                      >
                        <span>Se hele planen</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
