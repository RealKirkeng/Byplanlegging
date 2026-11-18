'use client';

import { Check, Vote } from 'lucide-react';
import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { QUALITY_METRICS } from '@/config/site';
import { StyleBadge } from '@/components/StyleBadge';
import type {
  AreaPollStats,
  AreaQualityStats,
  QualityMetricKey,
  QualityRatings,
} from '@/lib/types';

interface AreaPollProps {
  areaName: string;
  pollStats: AreaPollStats;
  qualityStats: AreaQualityStats;
  onVoteProposal: (proposalSlug: string) => void;
  onSubmitQualities: (ratings: QualityRatings) => void;
}

const DEFAULT_SLIDERS: QualityRatings = {
  klassiskEstetikk: 4,
  gronneByrom: 4,
  menneskeligSkala: 4,
  aktivtByliv: 4,
};

export function AreaPoll({
  areaName,
  pollStats,
  qualityStats,
  onVoteProposal,
  onSubmitQualities,
}: AreaPollProps) {
  const [sliderValues, setSliderValues] = useState<QualityRatings>(
    qualityStats.userRatings ?? DEFAULT_SLIDERS
  );
  const [ratingSavedNotice, setRatingSavedNotice] = useState(false);

  useEffect(() => {
    if (qualityStats.userRatings) {
      setSliderValues(qualityStats.userRatings);
    }
  }, [qualityStats.userRatings]);

  const handleSliderChange = (key: QualityMetricKey, val: number) => {
    setSliderValues((prev) => ({ ...prev, [key]: val }));
    setRatingSavedNotice(false);
  };

  const handleQualitySubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitQualities(sliderValues);
    setRatingSavedNotice(true);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 'var(--space-md)',
      }}
    >
      {/* DEL 1: Favorittforslag */}
      <section
        aria-labelledby="poll-favorite-heading"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-hairline)',
          padding: 'var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="eyebrow">Innbyggeravstemning</span>
            <h3
              id="poll-favorite-heading"
              className="font-display"
              style={{ margin: '0.45rem 0 0', fontSize: 'var(--font-xl)' }}
            >
              Hvilken retning ønsker du for {areaName}?
            </h3>
          </div>
          <span
            className="font-mono-meta"
            style={{ color: 'var(--accent-brass-bright)' }}
          >
            {pollStats.totalVotes.toLocaleString('nb-NO')} STEMMER
          </span>
        </div>

        <p style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
          Din stemme gir direkte signaler til både private utbyggere og kommunale
          planleggere om hvilken arkitektonisk retning befolkningen foretrekker.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {pollStats.entries.map((entry) => {
            const isSelected = pollStats.userVotedProposalSlug === entry.proposalSlug;
            return (
              <div
                key={entry.proposalSlug}
                style={{
                  padding: '0.95rem 1rem',
                  background: isSelected
                    ? 'rgba(201, 169, 110, 0.08)'
                    : 'var(--bg-void)',
                  border: `1px solid ${
                    isSelected ? 'var(--accent-brass)' : 'var(--border-hairline)'
                  }`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    marginBlockEnd: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '1rem' }}>{entry.title}</strong>
                    <StyleBadge style={entry.style} />
                  </div>
                  <span
                    className="font-mono-meta"
                    style={{ color: 'var(--accent-brass-bright)' }}
                  >
                    {entry.percentage} % ({entry.votes.toLocaleString('nb-NO')})
                  </span>
                </div>

                <div className="poll-bar-track" style={{ marginBlockEnd: '0.65rem' }}>
                  <div
                    className="poll-bar-fill"
                    style={{ inlineSize: `${entry.percentage}%` }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                    {entry.actorName}
                  </span>
                  <button
                    type="button"
                    onClick={() => onVoteProposal(entry.proposalSlug)}
                    className={`btn btn-sm ${
                      isSelected ? 'btn-primary' : 'btn-brass-outline'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? (
                      <>
                        <Check size={14} aria-hidden="true" />
                        <span>Din stemme</span>
                      </>
                    ) : (
                      <>
                        <Vote size={14} aria-hidden="true" />
                        <span>Stem</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEL 2: Kvalitetsvekting */}
      <section
        aria-labelledby="poll-quality-heading"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-hairline)',
          padding: 'var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="eyebrow">Kvalitetsprofil</span>
            <h3
              id="poll-quality-heading"
              className="font-display"
              style={{ margin: '0.45rem 0 0', fontSize: 'var(--font-xl)' }}
            >
              Hva bør vektlegges sterkest?
            </h3>
          </div>
          <span className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
            {qualityStats.responseCount.toLocaleString('nb-NO')} SVAR
          </span>
        </div>

        <p style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
          Vekt dine prioriteringer fra 1 til 5 og sammenlign med gjennomsnittet for
          alle deltakere på {areaName}.
        </p>

        <form
          onSubmit={handleQualitySubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}
        >
          {QUALITY_METRICS.map((metric) => {
            const userVal = sliderValues[metric.key];
            const communityAvg = qualityStats.averages[metric.key];
            const progressPct = `${((userVal - 1) / 4) * 100}%`;

            return (
              <div
                key={metric.key}
                style={{
                  paddingBottom: '0.9rem',
                  borderBlockEnd: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBlockEnd: '0.2rem',
                  }}
                >
                  <label
                    htmlFor={`slider-${metric.key}`}
                    style={{ fontWeight: 600, fontSize: 'var(--font-sm)' }}
                  >
                    {metric.label}
                  </label>
                  <span
                    className="font-mono-meta"
                    style={{ color: 'var(--accent-brass-bright)' }}
                  >
                    Ditt valg: {userVal}/5
                  </span>
                </div>

                <p
                  style={{
                    margin: '0 0 0.5rem',
                    fontSize: 'var(--font-xs)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {metric.description}
                </p>

                <input
                  id={`slider-${metric.key}`}
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={userVal}
                  onChange={(e) =>
                    handleSliderChange(metric.key, Number(e.target.value))
                  }
                  className="range-slider"
                  style={{ '--progress': progressPct } as CSSProperties}
                />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginBlock: '0.2rem 0.55rem',
                  }}
                >
                  <span>1 · {metric.lowLabel}</span>
                  <span>5 · {metric.highLabel}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <progress
                    className="poll-progress"
                    max={5}
                    value={communityAvg}
                    aria-label={`Innbyggersnitt for ${metric.label}: ${communityAvg} av 5`}
                  >
                    {communityAvg} / 5
                  </progress>
                  <span
                    className="font-mono-meta"
                    style={{
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Snitt {communityAvg.toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <button type="submit" className="btn btn-primary">
              {qualityStats.userRatings
                ? 'Oppdater dine prioriteringer'
                : 'Send inn vekting'}
            </button>

            {ratingSavedNotice && (
              <span
                role="status"
                className="font-mono-meta"
                style={{ color: 'var(--state-valid)' }}
              >
                ✓ Prioritering lagret i innbyggerprofilen
              </span>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
