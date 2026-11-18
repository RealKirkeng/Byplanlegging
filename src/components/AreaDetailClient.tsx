'use client';

import Link from 'next/link';
import { Columns2, LayoutGrid, Plus } from 'lucide-react';
import { useState } from 'react';
import { AreaPoll } from '@/components/AreaPoll';
import { ImageLightbox } from '@/components/ImageLightbox';
import { ProposalCard } from '@/components/ProposalCard';
import { ProposalComparator } from '@/components/ProposalComparator';
import { ALL_STYLES } from '@/config/site';
import { resolveActorName, useBysjonStore } from '@/lib/repository';
import type { ArchitecturalStyle, Area, Proposal } from '@/lib/types';

interface AreaDetailClientProps {
  area: Area;
  initialTab?: 'galleri' | 'sammenlign';
  initialCompareA?: string;
  initialCompareB?: string;
}

export function AreaDetailClient({
  area,
  initialTab = 'galleri',
  initialCompareA,
  initialCompareB,
}: AreaDetailClientProps) {
  const {
    getProposalsForArea,
    getAreaVoteStats,
    getAreaQualityStats,
    getCommentsForArea,
    castProposalVote,
    submitQualityRatings,
  } = useBysjonStore();

  const [activeTab, setActiveTab] = useState<'galleri' | 'sammenlign'>(
    initialTab
  );
  const [styleFilter, setStyleFilter] = useState<'Alle' | ArchitecturalStyle>(
    'Alle'
  );
  const [lightboxProposal, setLightboxProposal] = useState<Proposal | null>(
    null
  );

  const allProposals = getProposalsForArea(area.slug);
  const filteredProposals =
    styleFilter === 'Alle'
      ? allProposals
      : allProposals.filter((p) => p.style === styleFilter);

  const voteStats = getAreaVoteStats(area.slug);
  const qualityStats = getAreaQualityStats(area.slug);
  const areaComments = getCommentsForArea(area.slug);

  return (
    <>
      {/* Full-bleed område-hero */}
      <section className="hero-fullbleed hero-fullbleed--compact">
        <div className="hero-media">
          <img
            src={area.heroImageUrl}
            alt={area.heroCaption}
            width={1600}
            height={900}
            fetchPriority="high"
          />
          <div className="hero-scrim" />
        </div>

        <div className="container hero-content">
          <span className="eyebrow">
            {area.city} · {area.status} · {area.coordinates}
          </span>
          <h1 className="font-display hero-title">{area.name}</h1>
          <p className="hero-lead">{area.summary}</p>

          <div className="hero-actions">
            <a href="#utforsk" className="btn btn-primary">
              Utforsk {allProposals.length} forslag
            </a>
            <button
              type="button"
              className="btn btn-brass-outline"
              onClick={() => {
                setActiveTab('sammenlign');
                document
                  .getElementById('utforsk')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Columns2 size={15} aria-hidden="true" />
              <span>Sammenlign side om side</span>
            </button>
            <a href="#avstemning" className="btn">
              Delta i avstemning ({voteStats.totalVotes.toLocaleString('nb-NO')})
            </a>
          </div>

          <div className="hero-meta-strip">
            <div>
              <span className="meta-stat-label">Tomtestørrelse</span>
              <span className="meta-stat-value">{area.areaDekar} dekar</span>
            </div>
            <div>
              <span className="meta-stat-label">Estimert omfang</span>
              <span className="meta-stat-value">{area.plannedHomes}</span>
            </div>
            <div>
              <span className="meta-stat-label">Tidshorisont</span>
              <span className="meta-stat-value">{area.timeline}</span>
            </div>
            <div>
              <span className="meta-stat-label">Innsendte planer</span>
              <span className="meta-stat-value">{allProposals.length} visjoner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Områdekontekst og hovedspørsmål */}
      <section className="section-pad section-border">
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          <div>
            <span className="eyebrow">Stedskontekst &amp; oppdrag</span>
            <h2
              className="font-display"
              style={{ margin: '0.6rem 0 1rem', fontSize: 'var(--font-2xl)' }}
            >
              Hva står på spill på {area.name}?
            </h2>
            <p
              style={{
                margin: 0,
                color: 'var(--text-secondary)',
                fontSize: 'var(--font-base)',
                lineHeight: 1.75,
              }}
            >
              {area.contextBody}
            </p>
          </div>

          <div
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-hairline)',
              padding: 'var(--space-md)',
            }}
          >
            <span className="eyebrow">Nøkkelspørsmål i planprosessen</span>
            <ol
              style={{
                margin: '1rem 0 0',
                paddingInlineStart: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                color: 'var(--text-secondary)',
                fontSize: 'var(--font-sm)',
              }}
            >
              {area.keyQuestions.map((question) => (
                <li key={question} style={{ lineHeight: 1.6 }}>
                  {question}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Utforsk og sammenlign forslag */}
      <section id="utforsk" className="section-pad section-border">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBlockEnd: 'var(--space-md)',
            }}
          >
            <div>
              <span className="eyebrow">Innsendte arkitekturvisjoner</span>
              <h2
                className="font-display"
                style={{ margin: '0.5rem 0 0', fontSize: 'var(--font-2xl)' }}
              >
                {activeTab === 'galleri'
                  ? `Alle forslag for ${area.name}`
                  : `Side-om-side sammenligning`}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`btn btn-sm ${
                  activeTab === 'galleri' ? 'btn-primary' : ''
                }`}
                aria-pressed={activeTab === 'galleri'}
                onClick={() => setActiveTab('galleri')}
              >
                <LayoutGrid size={14} aria-hidden="true" />
                <span>Galleri ({allProposals.length})</span>
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  activeTab === 'sammenlign' ? 'btn-primary' : ''
                }`}
                aria-pressed={activeTab === 'sammenlign'}
                onClick={() => setActiveTab('sammenlign')}
              >
                <Columns2 size={14} aria-hidden="true" />
                <span>Sammenlign side om side</span>
              </button>
              <Link
                href={`/send-inn?omrade=${area.slug}`}
                className="btn btn-sm btn-brass-outline"
              >
                <Plus size={14} aria-hidden="true" />
                <span>Send inn forslag</span>
              </Link>
            </div>
          </div>

          {activeTab === 'galleri' ? (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBlockEnd: 'var(--space-md)',
                }}
              >
                <div className="filter-pills" role="group" aria-label="Filtrer på arkitektonisk retning">
                  <button
                    type="button"
                    className="filter-pill"
                    aria-pressed={styleFilter === 'Alle'}
                    onClick={() => setStyleFilter('Alle')}
                  >
                    Alle retninger ({allProposals.length})
                  </button>
                  {ALL_STYLES.map((style) => {
                    const count = allProposals.filter(
                      (p) => p.style === style
                    ).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={style}
                        type="button"
                        className="filter-pill"
                        aria-pressed={styleFilter === style}
                        onClick={() => setStyleFilter(style)}
                      >
                        {style} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid-2">
                {filteredProposals.map((proposal, idx) => {
                  const entry = voteStats.entries.find(
                    (e) => e.proposalSlug === proposal.slug
                  );
                  return (
                    <ProposalCard
                      key={proposal.slug}
                      proposal={proposal}
                      actorName={resolveActorName(proposal)}
                      index={idx}
                      votes={entry?.votes ?? proposal.seedVotes}
                      votePercentage={entry?.percentage ?? 0}
                      isUserVoted={
                        voteStats.userVotedProposalSlug === proposal.slug
                      }
                      onVote={() => castProposalVote(area.slug, proposal.slug)}
                      onOpenImage={() => setLightboxProposal(proposal)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <ProposalComparator
              proposals={allProposals}
              pollStats={voteStats}
              initialA={initialCompareA}
              initialB={initialCompareB}
            />
          )}
        </div>
      </section>

      {/* Offentlig avstemning */}
      <section id="avstemning" className="section-pad section-border">
        <div className="container">
          <AreaPoll
            areaName={area.name}
            pollStats={voteStats}
            qualityStats={qualityStats}
            onVoteProposal={(proposalSlug) =>
              castProposalVote(area.slug, proposalSlug)
            }
            onSubmitQualities={(ratings) =>
              submitQualityRatings(area.slug, ratings)
            }
          />
        </div>
      </section>

      {/* Siste innbyggerinnspill for området */}
      <section className="section-pad section-border">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBlockEnd: 'var(--space-md)',
            }}
          >
            <div>
              <span className="eyebrow">Offentlig ordskifte</span>
              <h2
                className="font-display"
                style={{ margin: '0.5rem 0 0', fontSize: 'var(--font-2xl)' }}
              >
                Innbyggerstemmer om {area.name} ({areaComments.length})
              </h2>
            </div>
            <span className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
              Gå inn på et enkeltforslag for å legge til nytt innspill
            </span>
          </div>

          <div className="grid-3">
            {areaComments.slice(0, 3).map((comment) => {
              const targetProposal = allProposals.find(
                (p) => p.slug === comment.proposalSlug
              );
              return (
                <article
                  key={comment.id}
                  style={{
                    padding: '1.25rem',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-hairline)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                  }}
                >
                  <span
                    className="font-mono-meta"
                    style={{ color: 'var(--accent-brass)' }}
                  >
                    Ang. {targetProposal?.title ?? comment.proposalSlug}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--text-secondary)',
                      fontSize: 'var(--font-sm)',
                    }}
                  >
                    «{comment.body}»
                  </p>
                  <div
                    style={{
                      marginBlockStart: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 'var(--font-xs)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span>
                      {comment.authorName} · {comment.authorRole}
                    </span>
                    <Link
                      href={`/omrader/${area.slug}/forslag/${comment.proposalSlug}`}
                      style={{ color: 'var(--accent-brass-bright)' }}
                    >
                      Åpne →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Invitasjon til nye arkitektkontorer og aktører */}
      <section className="section-pad section-border">
        <div
          className="container"
          style={{
            padding: 'var(--space-lg)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-brass)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-md)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="eyebrow">Åpen innsending</span>
            <h2
              className="font-display"
              style={{ margin: '0.5rem 0 0.5rem', fontSize: 'var(--font-xl)' }}
            >
              Har ditt kontor eller nettverk en alternativ plan for {area.name}?
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', maxInlineSize: '58ch' }}>
              Last opp illustrasjon, materialpalett og nøkkeltall. Forslaget vises side
              om side med eksisterende konsepter for innbyggere og beslutningstakere.
            </p>
          </div>

          <Link href={`/send-inn?omrade=${area.slug}`} className="btn btn-primary">
            Send inn forslag for {area.name}
          </Link>
        </div>
      </section>

      <ImageLightbox
        images={lightboxProposal?.galleryImages ?? []}
        title={lightboxProposal?.title ?? ''}
        actorName={lightboxProposal ? resolveActorName(lightboxProposal) : ''}
        openIndex={lightboxProposal ? 0 : null}
        onClose={() => setLightboxProposal(null)}
      />
    </>
  );
}
