'use client';

import Link from 'next/link';
import { Columns2, SlidersHorizontal } from 'lucide-react';
import { useEffect, useId, useState, type CSSProperties } from 'react';
import { StyleBadge } from '@/components/StyleBadge';
import { resolveActorName } from '@/lib/repository';
import type { AreaPollStats, Proposal } from '@/lib/types';

interface ProposalComparatorProps {
  proposals: Proposal[];
  pollStats: AreaPollStats;
  initialA?: string;
  initialB?: string;
}

export function ProposalComparator({
  proposals,
  pollStats,
  initialA,
  initialB,
}: ProposalComparatorProps) {
  const tableCaptionId = useId();
  const [slugA, setSlugA] = useState(
    () =>
      (initialA && proposals.some((p) => p.slug === initialA)
        ? initialA
        : proposals[0]?.slug) ?? ''
  );
  const [slugB, setSlugB] = useState(
    () =>
      (initialB && proposals.some((p) => p.slug === initialB)
        ? initialB
        : proposals[1]?.slug ?? proposals[0]?.slug) ?? ''
  );
  const [viewMode, setViewMode] = useState<'split' | 'side-by-side'>('split');
  const [splitPercent, setSplitPercent] = useState(50);

  useEffect(() => {
    if (initialA && proposals.some((p) => p.slug === initialA)) {
      setSlugA(initialA);
    }
    if (initialB && proposals.some((p) => p.slug === initialB)) {
      setSlugB(initialB);
    }
  }, [initialA, initialB, proposals]);

  if (proposals.length < 2) {
    return (
      <div
        style={{
          padding: 'var(--space-lg)',
          border: '1px solid var(--border-hairline)',
          background: 'var(--bg-elevated)',
        }}
      >
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Det trengs minst to innsendte forslag i dette området for å bruke
          sammenligningsverktøyet.
        </p>
      </div>
    );
  }

  const proposalA =
    proposals.find((p) => p.slug === slugA) ?? proposals[0];
  const proposalB =
    proposals.find((p) => p.slug === slugB) ?? proposals[1];

  const actorA = resolveActorName(proposalA);
  const actorB = resolveActorName(proposalB);

  const voteEntryA = pollStats.entries.find(
    (e) => e.proposalSlug === proposalA.slug
  );
  const voteEntryB = pollStats.entries.find(
    (e) => e.proposalSlug === proposalB.slug
  );

  const sliderProgressStyle = {
    '--progress': `${((splitPercent - 5) / 90) * 100}%`,
  } as CSSProperties;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {/* Kontrollpanel */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '1rem',
          padding: 'var(--space-md)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-hairline)',
          alignItems: 'end',
        }}
      >
        <div className="field">
          <label htmlFor="compare-select-a" className="field-label">
            Forslag A (venstre)
          </label>
          <select
            id="compare-select-a"
            className="field-select"
            value={proposalA.slug}
            onChange={(e) => setSlugA(e.target.value)}
          >
            {proposals.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title} ({p.style})
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="compare-select-b" className="field-label">
            Forslag B (høyre)
          </label>
          <select
            id="compare-select-b"
            className="field-select"
            value={proposalB.slug}
            onChange={(e) => setSlugB(e.target.value)}
          >
            {proposals.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title} ({p.style})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn btn-sm ${
              viewMode === 'split' ? 'btn-primary' : ''
            }`}
            aria-pressed={viewMode === 'split'}
            onClick={() => setViewMode('split')}
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            <span>Skyvebryter</span>
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              viewMode === 'side-by-side' ? 'btn-primary' : ''
            }`}
            aria-pressed={viewMode === 'side-by-side'}
            onClick={() => setViewMode('side-by-side')}
          >
            <Columns2 size={14} aria-hidden="true" />
            <span>Side om side</span>
          </button>
        </div>
      </div>

      {/* Visuell sammenligning */}
      {viewMode === 'split' ? (
        <div>
          <div className="split-stage">
            <img
              src={proposalB.heroImageUrl}
              alt={`${proposalB.title} — sammenligningsbilde B`}
              className="split-stage-img"
              width={1600}
              height={900}
            />
            <img
              src={proposalA.heroImageUrl}
              alt={`${proposalA.title} — sammenligningsbilde A`}
              className="split-stage-img"
              width={1600}
              height={900}
              style={{
                clipPath: `inset(0 ${100 - splitPercent}% 0 0)`,
              }}
            />

            <div
              className="split-stage-divider"
              style={{ insetInlineStart: `${splitPercent}%` }}
              aria-hidden="true"
            >
              <div className="split-stage-handle">↔</div>
            </div>

            <input
              type="range"
              min={5}
              max={95}
              value={splitPercent}
              onChange={(e) => setSplitPercent(Number(e.target.value))}
              className="split-range-overlay"
              style={sliderProgressStyle}
              aria-label={`Sammenlign ${proposalA.title} og ${proposalB.title} med skyvebryter`}
            />

            <div className="split-label split-label--left">
              <span
                className="font-mono-meta"
                style={{ color: 'var(--accent-brass-bright)', display: 'block' }}
              >
                {proposalA.style}
              </span>
              <strong>{proposalA.title}</strong>
            </div>

            <div className="split-label split-label--right">
              <span
                className="font-mono-meta"
                style={{ color: 'var(--accent-brass-bright)', display: 'block' }}
              >
                {proposalB.style}
              </span>
              <strong>{proposalB.title}</strong>
            </div>
          </div>
          <p
            className="font-mono-meta"
            style={{
              marginBlock: '0.65rem 0',
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}
          >
            Dra skyvebryteren eller bruk piltastene for å sveipe mellom {proposalA.title}{' '}
            ({splitPercent} %) og {proposalB.title} ({100 - splitPercent} %)
          </p>
        </div>
      ) : (
        <div className="grid-2">
          <div className="editorial-card">
            <div className="card-image-frame">
              <img
                src={proposalA.heroImageUrl}
                alt={`${proposalA.title} av ${actorA}`}
                width={1280}
                height={800}
              />
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
                <StyleBadge style={proposalA.style} />
                <span className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
                  {actorA}
                </span>
              </div>
              <h3 className="font-display" style={{ margin: 0, fontSize: '1.55rem' }}>
                <Link href={`/omrader/${proposalA.areaSlug}/forslag/${proposalA.slug}`}>
                  {proposalA.title}
                </Link>
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                {proposalA.subtitle}
              </p>
            </div>
          </div>

          <div className="editorial-card">
            <div className="card-image-frame">
              <img
                src={proposalB.heroImageUrl}
                alt={`${proposalB.title} av ${actorB}`}
                width={1280}
                height={800}
              />
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
                <StyleBadge style={proposalB.style} />
                <span className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
                  {actorB}
                </span>
              </div>
              <h3 className="font-display" style={{ margin: 0, fontSize: '1.55rem' }}>
                <Link href={`/omrader/${proposalB.areaSlug}/forslag/${proposalB.slug}`}>
                  {proposalB.title}
                </Link>
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                {proposalB.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Responsiv og tilgjengelig sammenligningstabell */}
      <div
        tabIndex={0}
        role="region"
        aria-labelledby={tableCaptionId}
        className="comparison-table-wrapper"
      >
        <table
          className="comparison-table"
          style={
            {
              '--label-2': JSON.stringify(proposalA.title),
              '--label-3': JSON.stringify(proposalB.title),
            } as CSSProperties
          }
        >
          <caption id={tableCaptionId}>
            Nøkkeltall og bykvaliteter: {proposalA.title} vs. {proposalB.title}
          </caption>
          <thead>
            <tr>
              <th scope="col">Parameter</th>
              <th scope="col">{proposalA.title}</th>
              <th scope="col">{proposalB.title}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Avsender / Aktør</th>
              <td>{actorA}</td>
              <td>{actorB}</td>
            </tr>
            <tr>
              <th scope="row">Arkitektonisk retning</th>
              <td>{proposalA.style}</td>
              <td>{proposalB.style}</td>
            </tr>
            <tr>
              <th scope="row">Maks byggehøyde</th>
              <td>{proposalA.maxFloors} etasjer</td>
              <td>{proposalB.maxFloors} etasjer</td>
            </tr>
            <tr>
              <th scope="row">Estimert boligantall</th>
              <td>{proposalA.estimatedHomes.toLocaleString('nb-NO')} boliger</td>
              <td>{proposalB.estimatedHomes.toLocaleString('nb-NO')} boliger</td>
            </tr>
            <tr>
              <th scope="row">Grøntareal &amp; offentlig rom</th>
              <td>{proposalA.greenSpacePercent} % av tomtearealet</td>
              <td>{proposalB.greenSpacePercent} % av tomtearealet</td>
            </tr>
            <tr>
              <th scope="row">Hovedmaterialer</th>
              <td>{proposalA.primaryMaterials}</td>
              <td>{proposalB.primaryMaterials}</td>
            </tr>
            <tr>
              <th scope="row">Gateplan &amp; byliv</th>
              <td>{proposalA.streetLifeSummary}</td>
              <td>{proposalB.streetLifeSummary}</td>
            </tr>
            <tr>
              <th scope="row">Innbyggeroppslutning</th>
              <td>
                {voteEntryA?.percentage ?? 0} % (
                {(voteEntryA?.votes ?? 0).toLocaleString('nb-NO')} stemmer)
              </td>
              <td>
                {voteEntryB?.percentage ?? 0} % (
                {(voteEntryB?.votes ?? 0).toLocaleString('nb-NO')} stemmer)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
