import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Columns2, Layers, Vote } from 'lucide-react';
import { HomeLivePollPreview } from '@/components/HomeLivePollPreview';
import { SITE_CONFIG } from '@/config/site';
import { ACTORS } from '@/data/actors';
import { AREAS } from '@/data/areas';
import { SEED_PROPOSALS } from '@/data/proposals';

export default function HomePage() {
  const lagmannsholmen = AREAS[0];
  const lagProposals = SEED_PROPOSALS.filter(
    (p) => p.areaSlug === 'lagmannsholmen'
  );
  const totalSeedVotes = SEED_PROPOSALS.reduce((s, p) => s + p.seedVotes, 0);

  return (
    <>
      {/* 1. Full-bleed redaksjonell hero */}
      <section className="hero-fullbleed">
        <div className="hero-media">
          <img
            src={lagmannsholmen.heroImageUrl}
            alt={lagmannsholmen.heroCaption}
            width={1600}
            height={900}
            fetchPriority="high"
          />
          <div className="hero-scrim" />
        </div>

        <div className="container hero-content">
          <span className="eyebrow">
            Utvalgt transformasjon · {lagmannsholmen.city} ·{' '}
            {lagmannsholmen.coordinates}
          </span>
          <h1 className="font-display hero-title">
            Se hvordan byen kan se ut — før den bygges.
          </h1>
          <p className="hero-lead">
            {SITE_CONFIG.name} samler arkitekturforslag fra ulike kontorer,
            urbanister og innbyggerbevegelser på ett sted. Utforsk visjonene for{' '}
            <strong>Lagmannsholmen</strong> og andre norske sjøfronter side om
            side, og gi din stemme.
          </p>

          <div className="hero-actions">
            <Link href="/omrader/lagmannsholmen" className="btn btn-primary">
              <span>Utforsk Lagmannsholmen (4 forslag)</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/omrader/lagmannsholmen?tab=sammenlign"
              className="btn btn-brass-outline"
            >
              <Columns2 size={15} aria-hidden="true" />
              <span>Sammenlign side om side</span>
            </Link>
            <Link href="/send-inn" className="btn">
              <span>Send inn forslag</span>
            </Link>
          </div>

          <div className="hero-meta-strip">
            <div>
              <span className="meta-stat-label">Norske byområder</span>
              <span className="meta-stat-value">{AREAS.length} bydeler</span>
            </div>
            <div>
              <span className="meta-stat-label">Publiserte planer</span>
              <span className="meta-stat-value">
                {SEED_PROPOSALS.length} visjoner
              </span>
            </div>
            <div>
              <span className="meta-stat-label">Registrerte stemmer</span>
              <span className="meta-stat-value">
                {totalSeedVotes.toLocaleString('nb-NO')}
              </span>
            </div>
            <div>
              <span className="meta-stat-label">Deltakende aktører</span>
              <span className="meta-stat-value">{ACTORS.length} studioer</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Redaksjonelt manifest */}
      <section className="section-pad section-border">
        <div className="container">
          <div style={{ maxInlineSize: '68ch', marginBlockEnd: 'var(--space-lg)' }}>
            <span className="eyebrow">Hvorfor {SITE_CONFIG.name} finnes</span>
            <h2
              className="font-display"
              style={{ margin: '0.6rem 0 1rem', fontSize: 'var(--font-2xl)' }}
            >
              Fra ett enkelt bilde i lokalavisa til en åpen arkitekturplattform
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-lg)' }}>
              Store byutviklingsprosjekter avgjør hvordan byene våre ser ut i
              hundre år. Likevel må innbyggere ofte nøye seg med én illustrasjon i
              avisen eller spredte innlegg i sosiale medier. Her stilles alle
              retninger opp med samme verdighet.
            </p>
          </div>

          <div className="grid-3">
            {[
              {
                icon: Layers,
                step: '01',
                title: 'Alle retninger på samme scene',
                body: 'Klassisk kvartalsby, nyurbanisme, skulpturell samtid og naturbasert økologi presenteres side om side med samme detaljnivå og tekniske nøkkeltall.',
              },
              {
                icon: Columns2,
                step: '02',
                title: 'Permanent kunnskapsarkiv',
                body: 'Arkitektkontorer, designstudioer og bevegelser får en varig plattform for hele planer, snitt, gateperspektiver og formingsprinsipper.',
              },
              {
                icon: Vote,
                step: '03',
                title: 'Tydelig folkepuls til utbyggere',
                body: 'Innbyggere stemmer på foretrukne konsepter og vektlegger kvaliteter som skala, grøntareal og gateliv — en direkte veiviser for private og offentlige aktører.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.step}
                  style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-hairline)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      className="font-mono-meta"
                      style={{ color: 'var(--accent-brass)' }}
                    >
                      PRINSIPP {item.step}
                    </span>
                    <Icon
                      size={18}
                      style={{ color: 'var(--accent-brass)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3
                    className="font-display"
                    style={{ margin: 0, fontSize: '1.65rem' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--text-secondary)',
                      fontSize: 'var(--font-sm)',
                    }}
                  >
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Utvalgte forslag for Lagmannsholmen */}
      <section className="section-pad section-border">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBlockEnd: 'var(--space-lg)',
            }}
          >
            <div>
              <span className="eyebrow">Hovedprosjekt · Kristiansand</span>
              <h2
                className="font-display"
                style={{ margin: '0.5rem 0 0', fontSize: 'var(--font-2xl)' }}
              >
                Fire visjoner for Lagmannsholmen
              </h2>
            </div>
            <Link
              href="/omrader/lagmannsholmen"
              className="btn btn-brass-outline btn-sm"
            >
              <span>Åpne hele Lagmannsholmen</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid-2">
            {lagProposals.map((proposal, index) => (
              <article key={proposal.slug} className="editorial-card">
                <div className="card-image-frame">
                  <Link
                    href={`/omrader/lagmannsholmen/forslag/${proposal.slug}`}
                  >
                    <img
                      src={proposal.heroImageUrl}
                      alt={`${proposal.title} for Lagmannsholmen`}
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
                      padding: '0.28rem 0.65rem',
                      background: 'rgba(8, 8, 10, 0.85)',
                      border: '1px solid var(--border-strong)',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      color: 'var(--accent-brass-bright)',
                    }}
                  >
                    0{index + 1} · {proposal.style.toUpperCase()}
                  </div>
                </div>
                <div className="card-body">
                  <h3
                    className="font-display"
                    style={{ margin: 0, fontSize: '1.75rem' }}
                  >
                    <Link
                      href={`/omrader/lagmannsholmen/forslag/${proposal.slug}`}
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
                  <div className="metrics-row">
                    <div>
                      <span className="metric-cell-label">Maks høyde</span>
                      <span className="metric-cell-value">
                        {proposal.maxFloors} etg.
                      </span>
                    </div>
                    <div>
                      <span className="metric-cell-label">Boliger</span>
                      <span className="metric-cell-value">
                        {proposal.estimatedHomes.toLocaleString('nb-NO')}
                      </span>
                    </div>
                    <div>
                      <span className="metric-cell-label">Grøntareal</span>
                      <span className="metric-cell-value">
                        {proposal.greenSpacePercent} %
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/omrader/lagmannsholmen/forslag/${proposal.slug}`}
                    className="btn btn-sm"
                    style={{ marginBlockStart: 'auto' }}
                  >
                    <span>Utforsk konseptet</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sanntidsavstemning */}
      <section className="section-pad section-border">
        <div className="container">
          <HomeLivePollPreview />
        </div>
      </section>

      {/* 5. Nasjonale transformasjonsområder */}
      <section className="section-pad section-border">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBlockEnd: 'var(--space-lg)',
            }}
          >
            <div>
              <span className="eyebrow">Hele Norge</span>
              <h2
                className="font-display"
                style={{ margin: '0.5rem 0 0', fontSize: 'var(--font-2xl)' }}
              >
                Aktive transformasjonsområder
              </h2>
            </div>
            <Link href="/omrader" className="btn btn-sm">
              <span>Se alle områder</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid-2">
            {AREAS.map((area) => {
              const count = SEED_PROPOSALS.filter(
                (p) => p.areaSlug === area.slug
              ).length;
              return (
                <article key={area.slug} className="editorial-card">
                  <div className="card-image-frame">
                    <Link href={`/omrader/${area.slug}`}>
                      <img
                        src={area.heroImageUrl}
                        alt={`${area.name}, ${area.city}`}
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
                        padding: '0.28rem 0.65rem',
                        background: 'rgba(8, 8, 10, 0.86)',
                        border: '1px solid var(--border-brass)',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.68rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-brass-bright)',
                      }}
                    >
                      {area.city} · {area.status}
                    </div>
                  </div>
                  <div className="card-body">
                    <h3
                      className="font-display"
                      style={{ margin: 0, fontSize: '1.85rem' }}
                    >
                      <Link href={`/omrader/${area.slug}`}>{area.name}</Link>
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--font-sm)',
                      }}
                    >
                      {area.summary}
                    </p>
                    <div
                      style={{
                        marginBlockStart: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBlockStart: '0.75rem',
                        borderBlockStart: '1px solid var(--border-hairline)',
                      }}
                    >
                      <span
                        className="font-mono-meta"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {area.areaDekar} daa · {count} forslag
                      </span>
                      <Link
                        href={`/omrader/${area.slug}`}
                        className="btn btn-sm"
                      >
                        Åpne område →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Aktører & Studioer */}
      <section className="section-pad section-border">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBlockEnd: 'var(--space-lg)',
            }}
          >
            <div>
              <span className="eyebrow">Arkitektur &amp; stemmer</span>
              <h2
                className="font-display"
                style={{ margin: '0.5rem 0 0', fontSize: 'var(--font-2xl)' }}
              >
                Aktører som former bydebatten
              </h2>
            </div>
            <Link href="/aktorer" className="btn btn-sm">
              Alle aktørprofiler →
            </Link>
          </div>

          <div className="grid-3">
            {ACTORS.map((actor) => (
              <Link
                key={actor.slug}
                href={`/aktorer/${actor.slug}`}
                className="editorial-card"
                style={{ padding: 'var(--space-md)', gap: '0.55rem' }}
              >
                <span
                  className="font-mono-meta"
                  style={{ color: 'var(--accent-brass)' }}
                >
                  {actor.category} · {actor.city}
                </span>
                <h3
                  className="font-display"
                  style={{ margin: 0, fontSize: '1.5rem' }}
                >
                  {actor.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--font-sm)',
                  }}
                >
                  {actor.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Avsluttende CTA */}
      <section className="section-pad section-border">
        <div
          className="container"
          style={{
            padding: 'var(--space-xl) var(--space-lg)',
            background:
              'linear-gradient(135deg, rgba(201, 169, 110, 0.12) 0%, rgba(13, 13, 16, 0.96) 65%)',
            border: '1px solid var(--border-brass)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-lg)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxInlineSize: '58ch' }}>
            <span className="eyebrow">Åpen innsending for byråer og initiativer</span>
            <h2
              className="font-display"
              style={{ margin: '0.6rem 0 1rem', fontSize: 'var(--font-2xl)' }}
            >
              Har dere en plan som fortjener å bli sett i full størrelse?
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Send inn deres arkitekturillustrasjoner, formingsprinsipper og
              nøkkeltall for Lagmannsholmen eller et annet norsk byområde.
            </p>
          </div>
          <Link href="/send-inn" className="btn btn-primary">
            <span>Send inn forslag</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
