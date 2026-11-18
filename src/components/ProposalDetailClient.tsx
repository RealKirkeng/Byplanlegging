'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Columns2, Expand, Vote } from 'lucide-react';
import { useState } from 'react';
import { CommentSection } from '@/components/CommentSection';
import { ImageLightbox } from '@/components/ImageLightbox';
import { StyleBadge } from '@/components/StyleBadge';
import { getActorBySlug } from '@/data/actors';
import { resolveActorName, useBysjonStore } from '@/lib/repository';
import type { Area, Proposal } from '@/lib/types';

interface ProposalDetailClientProps {
  area: Area;
  proposalSlug: string;
  initialProposal: Proposal | null;
}

export function ProposalDetailClient({
  area,
  proposalSlug,
  initialProposal,
}: ProposalDetailClientProps) {
  const {
    hydrated,
    getProposalBySlugs,
    getProposalsForArea,
    getAreaVoteStats,
    getCommentsForProposal,
    castProposalVote,
    addComment,
  } = useBysjonStore();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const proposal = getProposalBySlugs(area.slug, proposalSlug) ?? initialProposal;

  if (!proposal && !hydrated) {
    return (
      <section className="section-pad">
        <div className="container">
          <p className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
            Laster arkitekturmonografi...
          </p>
        </div>
      </section>
    );
  }

  if (!proposal) {
    return (
      <section className="section-pad">
        <div className="container" style={{ maxInlineSize: '680px' }}>
          <span className="eyebrow">Ikke funnet</span>
          <h1 className="font-display" style={{ fontSize: 'var(--font-2xl)', margin: '0.6rem 0 1rem' }}>
            Fant ikke forslaget på denne enheten
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBlockEnd: '1.5rem' }}>
            Dersom dette var et lokalt innsendt forslag fra en annen nettleser,
            er det ikke lagret i denne nettleserens lokale arkiv ennå.
          </p>
          <Link href={`/omrader/${area.slug}`} className="btn btn-primary">
            Tilbake til {area.name}
          </Link>
        </div>
      </section>
    );
  }

  const actorName = resolveActorName(proposal);
  const actor = getActorBySlug(proposal.actorSlug);
  const areaProposals = getProposalsForArea(area.slug);
  const voteStats = getAreaVoteStats(area.slug);
  const voteEntry = voteStats.entries.find((e) => e.proposalSlug === proposal.slug);
  const isVoted = voteStats.userVotedProposalSlug === proposal.slug;
  const comments = getCommentsForProposal(area.slug, proposal.slug);

  const otherProposal = areaProposals.find((p) => p.slug !== proposal.slug);
  const compareHref = otherProposal
    ? `/omrader/${area.slug}?tab=sammenlign&a=${proposal.slug}&b=${otherProposal.slug}#utforsk`
    : `/omrader/${area.slug}?tab=sammenlign#utforsk`;

  return (
    <>
      {/* Full-bleed arkitekturhero */}
      <section className="hero-fullbleed hero-fullbleed--compact">
        <div className="hero-media">
          <img
            src={proposal.heroImageUrl}
            alt={`${proposal.title} — ${actorName}`}
            width={1600}
            height={900}
            fetchPriority="high"
          />
          <div className="hero-scrim" />
        </div>

        <div className="container hero-content">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBlockEnd: '1rem',
            }}
          >
            <Link
              href={`/omrader/${area.slug}`}
              className="btn btn-sm"
              style={{ background: 'rgba(8, 8, 10, 0.7)' }}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Tilbake til {area.name}</span>
            </Link>
            <StyleBadge style={proposal.style} />
            <span className="font-mono-meta" style={{ color: 'var(--text-secondary)' }}>
              {area.city} · Innsendt {proposal.submittedAt}
            </span>
          </div>

          <h1 className="font-display hero-title">{proposal.title}</h1>
          <p className="hero-lead">{proposal.subtitle}</p>

          <div className="hero-actions">
            <button
              type="button"
              onClick={() => castProposalVote(area.slug, proposal.slug)}
              className={`btn ${isVoted ? 'btn-primary' : 'btn-brass-outline'}`}
              aria-pressed={isVoted}
            >
              {isVoted ? <Check size={16} aria-hidden="true" /> : <Vote size={16} aria-hidden="true" />}
              <span>
                {isVoted
                  ? `Valgt som din favoritt (${voteEntry?.percentage ?? 0} %)`
                  : `Stem på ${proposal.title}`}
              </span>
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => setLightboxIndex(0)}
            >
              <Expand size={15} aria-hidden="true" />
              <span>Åpne illustrasjon i fullskjerm</span>
            </button>

            <Link href={compareHref} className="btn">
              <Columns2 size={15} aria-hidden="true" />
              <span>Sammenlign med annet forslag</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hurtigbytte mellom søskenforslag i samme område */}
      <nav
        aria-label={`Andre forslag for ${area.name}`}
        style={{
          background: 'var(--bg-void)',
          borderBlockEnd: '1px solid var(--border-hairline)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            paddingBlock: '0.85rem',
            overflowX: 'auto',
          }}
        >
          <span
            className="font-mono-meta"
            style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}
          >
            FORSLAG FOR {area.name.toUpperCase()}:
          </span>
          {areaProposals.map((item) => {
            const active = item.slug === proposal.slug;
            return (
              <Link
                key={item.slug}
                href={`/omrader/${area.slug}/forslag/${item.slug}`}
                className="filter-pill"
                aria-current={active ? 'page' : undefined}
                style={
                  active
                    ? {
                        background: 'var(--accent-brass)',
                        borderColor: 'var(--accent-brass)',
                        color: 'var(--text-inverse)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }
                    : { whiteSpace: 'nowrap' }
                }
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Monografi + klistret nøkkeltallssidebar */}
      <section className="section-pad">
        <div className="container monograph-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div>
              <span className="eyebrow">Arkitektonisk visjon</span>
              <h2
                className="font-display"
                style={{ margin: '0.55rem 0 1rem', fontSize: 'var(--font-2xl)' }}
              >
                Idé og byplangrep
              </h2>
              <p
                style={{
                  margin: 0,
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--font-base)',
                  lineHeight: 1.8,
                }}
              >
                {proposal.architecturalVision}
              </p>
            </div>

            {/* Galleribilder */}
            <div>
              <span className="eyebrow">Illustrasjoner ({proposal.galleryImages.length})</span>
              <h3
                className="font-display"
                style={{ margin: '0.5rem 0 1rem', fontSize: 'var(--font-xl)' }}
              >
                Perspektiver og byrom
              </h3>
              <div className="grid-2">
                {proposal.galleryImages.map((img, i) => (
                  <figure
                    key={img.url + i}
                    style={{
                      margin: 0,
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-hairline)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      style={{
                        display: 'block',
                        inlineSize: '100%',
                        padding: 0,
                        border: 0,
                        background: 'transparent',
                        cursor: 'zoom-in',
                      }}
                      aria-label={`Forstørr bilde: ${img.caption}`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        width={1280}
                        height={800}
                        loading="lazy"
                        style={{
                          inlineSize: '100%',
                          aspectRatio: '16 / 10',
                          objectFit: 'cover',
                        }}
                      />
                    </button>
                    <figcaption
                      style={{
                        padding: '0.85rem 1rem',
                        fontSize: 'var(--font-xs)',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                      }}
                    >
                      <span>{img.caption}</span>
                      <span className="font-mono-meta" style={{ color: 'var(--accent-brass)' }}>
                        {img.perspective}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Nummererte hovedprinsipper */}
            <div>
              <span className="eyebrow">Formingsprinsipper</span>
              <h3
                className="font-display"
                style={{ margin: '0.5rem 0 1rem', fontSize: 'var(--font-xl)' }}
              >
                Sentrale grep i planen
              </h3>
              <ol
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {proposal.principles.map((principle, idx) => (
                  <li
                    key={principle}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '48px 1fr',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-hairline)',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      className="font-mono-meta"
                      style={{ color: 'var(--accent-brass-bright)', fontSize: '0.9rem' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>
                      {principle}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Styrker og avveininger */}
            <div className="grid-2">
              <div
                style={{
                  padding: 'var(--space-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-hairline)',
                }}
              >
                <span className="font-mono-meta" style={{ color: 'var(--state-valid)' }}>
                  STYRKER I FORSLAGET
                </span>
                <ul
                  style={{
                    margin: '0.85rem 0 0',
                    paddingInlineStart: '1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--font-sm)',
                  }}
                >
                  {proposal.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: 'var(--space-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-hairline)',
                }}
              >
                <span className="font-mono-meta" style={{ color: 'var(--accent-brass)' }}>
                  AVVEININGER Å VURDERE
                </span>
                <ul
                  style={{
                    margin: '0.85rem 0 0',
                    paddingInlineStart: '1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--font-sm)',
                  }}
                >
                  {proposal.tradeoffs.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Klistret nøkkeltalls-sidebar */}
          <aside className="sticky-sidebar" aria-label="Tekniske nøkkeltall for forslaget">
            <span className="eyebrow">Arkitektonisk faktablad</span>
            <h2
              className="font-display"
              style={{ margin: '0.5rem 0 1.25rem', fontSize: '1.75rem' }}
            >
              {proposal.title}
            </h2>

            <dl
              style={{
                margin: '0 0 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              {[
                ['Innsender / Aktør', actor ? actor.name : actorName],
                ['Område', `${area.name}, ${area.city}`],
                ['Stilretning', proposal.style],
                ['Maks byggehøyde', `${proposal.maxFloors} etasjer`],
                ['Estimert boligantall', `${proposal.estimatedHomes.toLocaleString('nb-NO')} boliger`],
                ['Grøntareal', `${proposal.greenSpacePercent} %`],
                ['Hovedmaterialer', proposal.primaryMaterials],
                ['Gateplan & byliv', proposal.streetLifeSummary],
              ].map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    paddingBlockEnd: '0.75rem',
                    borderBlockEnd: '1px solid var(--border-subtle)',
                  }}
                >
                  <dt
                    className="font-mono-meta"
                    style={{ color: 'var(--text-muted)', marginBlockEnd: '0.2rem' }}
                  >
                    {label}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>
                    {val}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              style={{
                padding: '0.9rem',
                background: 'var(--bg-void)',
                border: '1px solid var(--border-hairline)',
                marginBlockEnd: '1.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-xs)',
                  marginBlockEnd: '0.4rem',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>
                  Oppslutning ({(voteEntry?.votes ?? proposal.seedVotes).toLocaleString('nb-NO')} stemmer)
                </span>
                <span className="font-mono-meta" style={{ color: 'var(--accent-brass-bright)' }}>
                  {voteEntry?.percentage ?? 0} %
                </span>
              </div>
              <div className="poll-bar-track">
                <div
                  className="poll-bar-fill"
                  style={{ inlineSize: `${voteEntry?.percentage ?? 0}%` }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => castProposalVote(area.slug, proposal.slug)}
                className={`btn ${isVoted ? 'btn-primary' : 'btn-brass-outline'}`}
                aria-pressed={isVoted}
              >
                {isVoted ? '✓ Valgt som din favoritt' : 'Stem på dette forslaget'}
              </button>

              {actor && (
                <Link href={`/aktorer/${actor.slug}`} className="btn">
                  Se profilen til {actor.name}
                </Link>
              )}

              <Link href={compareHref} className="btn">
                Sammenlign side om side
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Kommentarer */}
      <section className="section-pad section-border">
        <div className="container">
          <CommentSection
            proposalTitle={proposal.title}
            comments={comments}
            onAddComment={(input) =>
              addComment({
                areaSlug: area.slug,
                proposalSlug: proposal.slug,
                ...input,
              })
            }
          />
        </div>
      </section>

      <ImageLightbox
        images={proposal.galleryImages}
        title={proposal.title}
        actorName={actorName}
        openIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
