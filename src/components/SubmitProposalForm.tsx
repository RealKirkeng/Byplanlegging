'use client';

import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ImagePlus } from 'lucide-react';
import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { StyleBadge } from '@/components/StyleBadge';
import { ALL_STYLES } from '@/config/site';
import { AREAS } from '@/data/areas';
import { useBysjonStore } from '@/lib/repository';
import { useFormValidationSync } from '@/lib/useFormValidationSync';
import type { ArchitecturalStyle, Proposal } from '@/lib/types';

const DEMO_RENDER_OPTIONS = [
  {
    label: 'Klassisk sjøfront (Kvadraturen-stil)',
    url: '/images/lagmannsholmen-klassisk.jpg',
  },
  {
    label: 'Gateperspektiv & byplass',
    url: '/images/lagmannsholmen-klassisk-gate.jpg',
  },
  {
    label: 'Nyurbanistisk treby ved sjøen',
    url: '/images/lagmannsholmen-nyurbanisme.jpg',
  },
  {
    label: 'Moderne massivtre & kulturpaviljong',
    url: '/images/lagmannsholmen-moderne.jpg',
  },
  {
    label: 'Økologisk kystpark & sjøbad',
    url: '/images/lagmannsholmen-naturby.jpg',
  },
];

async function compressImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => reject(new Error('Kunne ikke lese bildet.'));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('Kunne ikke laste filen.'));
    reader.readAsDataURL(file);
  });
}

export function SubmitProposalForm({
  initialAreaSlug,
}: {
  initialAreaSlug?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  useFormValidationSync(formRef);
  const { submitNewProposal } = useBysjonStore();

  const defaultArea =
    AREAS.find((a) => a.slug === initialAreaSlug)?.slug ?? AREAS[0].slug;

  const [areaSlug, setAreaSlug] = useState(defaultArea);
  const [actorName, setActorName] = useState('');
  const [actorRoleNote, setActorRoleNote] = useState('Arkitektkontor / Byplanlegger');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [style, setStyle] = useState<ArchitecturalStyle>('Klassisk');
  const [maxFloors, setMaxFloors] = useState(5);
  const [estimatedHomes, setEstimatedHomes] = useState(1250);
  const [greenSpacePercent, setGreenSpacePercent] = useState(38);
  const [primaryMaterials, setPrimaryMaterials] = useState(
    'Håndbanket tegl, kjernefuru, naturstein'
  );
  const [streetLifeSummary, setStreetLifeSummary] = useState('');
  const [architecturalVision, setArchitecturalVision] = useState('');
  const [principleOne, setPrincipleOne] = useState('');
  const [principleTwo, setPrincipleTwo] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState(DEMO_RENDER_OPTIONS[0].url);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [publishedProposal, setPublishedProposal] = useState<Proposal | null>(
    null
  );

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);

    if (!file.type.startsWith('image/')) {
      setUploadError('Velg en gyldig bildefil (JPG, PNG eller WebP).');
      return;
    }

    try {
      const dataUrl = await compressImageToDataUrl(file);
      setHeroImageUrl(dataUrl);
      setUploadedFileName(file.name);
    } catch {
      setUploadError('Kunne ikke behandle bildefilen. Prøv et annet bilde.');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    const created = submitNewProposal({
      areaSlug,
      actorName,
      actorRoleNote,
      title,
      subtitle,
      style,
      maxFloors: Number(maxFloors) || 4,
      estimatedHomes: Number(estimatedHomes) || 1000,
      greenSpacePercent: Number(greenSpacePercent) || 35,
      primaryMaterials,
      streetLifeSummary:
        streetLifeSummary || 'Åpne førsteetasjer med handel, verksted og servering.',
      architecturalVision,
      principles: [
        principleOne || 'Tydelig kvartalstruktur tilpasset stedets klima og skala.',
        principleTwo || 'Allmenn tilgang til sjøfront og bilfrie møteplasser.',
      ],
      heroImageUrl,
    });

    setPublishedProposal(created);
  };

  const selectedArea = AREAS.find((a) => a.slug === areaSlug) ?? AREAS[0];

  if (publishedProposal) {
    return (
      <div
        style={{
          padding: 'var(--space-lg)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--accent-brass)',
          maxInlineSize: '780px',
          marginInline: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--state-valid)' }}>
          <CheckCircle2 size={24} aria-hidden="true" />
          <span className="font-mono-meta">FORSLAG PUBLISERT I LOKAL PROTOTYPE</span>
        </div>

        <h2 className="font-display" style={{ margin: 0, fontSize: 'var(--font-2xl)' }}>
          «{publishedProposal.title}» er nå synlig under {selectedArea.name}
        </h2>

        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Forslaget fra <strong>{publishedProposal.actorNameOverride}</strong> er lagt
          til i områdegalleriet, sammenligningsverktøyet og avstemningen i denne
          nettleseren. Når plattformen kobles til Supabase lagres dette direkte i
          databasen.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
          <Link
            href={`/omrader/${publishedProposal.areaSlug}/forslag/${publishedProposal.slug}`}
            className="btn btn-primary"
          >
            <span>Se ditt publiserte forslag</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <Link href={`/omrader/${publishedProposal.areaSlug}`} className="btn btn-brass-outline">
            Gå til {selectedArea.name}
          </Link>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setPublishedProposal(null);
              setTitle('');
              setSubtitle('');
              setArchitecturalVision('');
            }}
          >
            Send inn ett til
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="monograph-layout">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        style={{
          padding: 'var(--space-md)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-hairline)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1rem',
          }}
        >
          <div className="field">
            <label htmlFor="sub-area" className="field-label">
              Transformasjonsområde *
            </label>
            <select
              id="sub-area"
              className="field-select"
              value={areaSlug}
              onChange={(e) => setAreaSlug(e.target.value)}
            >
              {AREAS.map((area) => (
                <option key={area.slug} value={area.slug}>
                  {area.name} ({area.city})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="sub-style" className="field-label">
              Arkitektonisk retning *
            </label>
            <select
              id="sub-style"
              className="field-select"
              value={style}
              onChange={(e) => setStyle(e.target.value as ArchitecturalStyle)}
            >
              {ALL_STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1rem',
          }}
        >
          <div className="field">
            <label htmlFor="sub-actor" className="field-label">
              Aktør / Arkitektkontor / Organisasjon *
            </label>
            <span id="sub-actor-hint" className="field-hint">
              Navnet på byrået, bevegelsen eller arbeidsgruppen bak planen.
            </span>
            <input
              id="sub-actor"
              type="text"
              className="field-input"
              required
              minLength={2}
              value={actorName}
              onChange={(e) => setActorName(e.target.value)}
              placeholder="F.eks. Arkitekturopprøret Agder"
              aria-describedby="sub-actor-hint"
              data-error="sub-actor-error"
            />
            <div id="sub-actor-error" className="error-msg">
              <span role="img" aria-label="Feil">
                ⚠
              </span>{' '}
              Oppgi navnet på innsender eller kontor.
            </div>
          </div>

          <div className="field">
            <label htmlFor="sub-role" className="field-label">
              Type aktør
            </label>
            <span id="sub-role-hint" className="field-hint">
              F.eks. Arkitektkontor, Innbyggerbevegelse, Landskapsstudio
            </span>
            <input
              id="sub-role"
              type="text"
              className="field-input"
              value={actorRoleNote}
              onChange={(e) => setActorRoleNote(e.target.value)}
              aria-describedby="sub-role-hint"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="sub-title" className="field-label">
            Tittel på forslaget *
          </label>
          <span id="sub-title-hint" className="field-hint">
            Kort og minneverdig navn på planen (minst 3 tegn).
          </span>
          <input
            id="sub-title"
            type="text"
            className="field-input"
            required
            minLength={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="F.eks. Odderøya Bryggekvartal"
            aria-describedby="sub-title-hint"
            data-error="sub-title-error"
          />
          <div id="sub-title-error" className="error-msg">
            <span role="img" aria-label="Feil">
              ⚠
            </span>{' '}
            Skriv inn en prosjekttittel på minst 3 tegn.
          </div>
        </div>

        <div className="field">
          <label htmlFor="sub-subtitle" className="field-label">
            Kort undertittel / hovedidé *
          </label>
          <span id="sub-subtitle-hint" className="field-hint">
            Én setning som oppsummerer hva forslaget gir byen.
          </span>
          <input
            id="sub-subtitle"
            type="text"
            className="field-input"
            required
            minLength={10}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="F.eks. 4-etasjers teglkvartaler med åpen sjøpromenade og håndverksarkader"
            aria-describedby="sub-subtitle-hint"
            data-error="sub-subtitle-error"
          />
          <div id="sub-subtitle-error" className="error-msg">
            <span role="img" aria-label="Feil">
              ⚠
            </span>{' '}
            Skriv en kort undertittel på minst 10 tegn.
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
            gap: '1rem',
          }}
        >
          <div className="field">
            <label htmlFor="sub-floors" className="field-label">
              Maks etasjer *
            </label>
            <input
              id="sub-floors"
              type="number"
              min={1}
              max={30}
              required
              className="field-input"
              value={maxFloors}
              onChange={(e) => setMaxFloors(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="sub-homes" className="field-label">
              Est. boliger *
            </label>
            <input
              id="sub-homes"
              type="number"
              min={10}
              max={15000}
              required
              className="field-input"
              value={estimatedHomes}
              onChange={(e) => setEstimatedHomes(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="sub-green" className="field-label">
              Grøntareal (%) *
            </label>
            <input
              id="sub-green"
              type="number"
              min={0}
              max={95}
              required
              className="field-input"
              value={greenSpacePercent}
              onChange={(e) => setGreenSpacePercent(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="sub-materials" className="field-label">
            Hovedmaterialer
          </label>
          <input
            id="sub-materials"
            type="text"
            className="field-input"
            value={primaryMaterials}
            onChange={(e) => setPrimaryMaterials(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="sub-street" className="field-label">
            Gateplan &amp; byliv
          </label>
          <input
            id="sub-street"
            type="text"
            className="field-input"
            value={streetLifeSummary}
            onChange={(e) => setStreetLifeSummary(e.target.value)}
            placeholder="F.eks. Kafeer, bakeri, verksteder og sjøbad i første etasje"
          />
        </div>

        <div className="field">
          <label htmlFor="sub-vision" className="field-label">
            Arkitektonisk redegjørelse *
          </label>
          <span id="sub-vision-hint" className="field-hint">
            Forklar hvorfor planen passer til området, skalaen, klimaet og bylivet (minst 25 tegn).
          </span>
          <textarea
            id="sub-vision"
            className="field-textarea"
            required
            minLength={25}
            value={architecturalVision}
            onChange={(e) => setArchitecturalVision(e.target.value)}
            aria-describedby="sub-vision-hint"
            data-error="sub-vision-error"
          />
          <div id="sub-vision-error" className="error-msg">
            <span role="img" aria-label="Feil">
              ⚠
            </span>{' '}
            Redegjørelsen må være på minst 25 tegn.
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1rem',
          }}
        >
          <div className="field">
            <label htmlFor="sub-p1" className="field-label">
              Hovedprinsipp 1
            </label>
            <input
              id="sub-p1"
              type="text"
              className="field-input"
              value={principleOne}
              onChange={(e) => setPrincipleOne(e.target.value)}
              placeholder="F.eks. Kontinuerlig 4-etasjers gesims mot sjøen"
            />
          </div>
          <div className="field">
            <label htmlFor="sub-p2" className="field-label">
              Hovedprinsipp 2
            </label>
            <input
              id="sub-p2"
              type="text"
              className="field-input"
              value={principleTwo}
              onChange={(e) => setPrincipleTwo(e.target.value)}
              placeholder="F.eks. Åpen offentlig brygge uten gjennomgangstrafikk"
            />
          </div>
        </div>

        {/* Bildeopplasting eller eksempelillustrasjon */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--bg-void)',
            border: '1px solid var(--border-hairline)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ImagePlus size={18} style={{ color: 'var(--accent-brass)' }} aria-hidden="true" />
            <strong style={{ fontSize: 'var(--font-sm)' }}>
              Illustrasjon / Perspektivbilde
            </strong>
          </div>

          <div className="field">
            <label htmlFor="sub-image-file" className="field-label">
              Last opp egen rendering (JPG / PNG / WebP)
            </label>
            <input
              id="sub-image-file"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="field-input"
            />
            {uploadedFileName && (
              <span className="font-mono-meta" style={{ color: 'var(--state-valid)' }}>
                ✓ Lastet inn: {uploadedFileName}
              </span>
            )}
            {uploadError && (
              <span style={{ color: 'var(--state-error)', fontSize: 'var(--font-xs)' }}>
                {uploadError}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="sub-demo-img" className="field-label">
              Eller velg en eksempelillustrasjon for rask testing
            </label>
            <select
              id="sub-demo-img"
              className="field-select"
              value={
                DEMO_RENDER_OPTIONS.some((o) => o.url === heroImageUrl)
                  ? heroImageUrl
                  : ''
              }
              onChange={(e) => {
                if (e.target.value) {
                  setHeroImageUrl(e.target.value);
                  setUploadedFileName(null);
                }
              }}
            >
              {!DEMO_RENDER_OPTIONS.some((o) => o.url === heroImageUrl) && (
                <option value="">Eget opplastet bilde brukes</option>
              )}
              {DEMO_RENDER_OPTIONS.map((opt) => (
                <option key={opt.url} value={opt.url}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Publiser forslag til {selectedArea.name}
        </button>
      </form>

      {/* Live forhåndsvisning */}
      <aside className="sticky-sidebar" aria-label="Forhåndsvisning av forslagskort">
        <span className="eyebrow">Forhåndsvisning i sanntid</span>
        <p
          style={{
            margin: '0.45rem 0 1rem',
            fontSize: 'var(--font-xs)',
            color: 'var(--text-muted)',
          }}
        >
          Slik vil bidraget vises i galleriet under {selectedArea.name}.
        </p>

        <article className="editorial-card">
          <div className="card-image-frame">
            <img
              src={heroImageUrl}
              alt="Forhåndsvisning av innsendt arkitekturillustrasjon"
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
                flexWrap: 'wrap',
              }}
            >
              <StyleBadge style={style} />
              <span className="font-mono-meta" style={{ color: 'var(--text-muted)' }}>
                {actorName || 'Ditt byrå / aktør'}
              </span>
            </div>

            <div>
              <h3 className="font-display" style={{ margin: '0 0 0.35rem', fontSize: '1.65rem' }}>
                {title || 'Tittel på ditt forslag'}
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                {subtitle || 'Kort undertittel som beskriver hovedgrepet i planen.'}
              </p>
            </div>

            <div className="metrics-row">
              <div>
                <span className="metric-cell-label">Maks høyde</span>
                <span className="metric-cell-value">{maxFloors} etg.</span>
              </div>
              <div>
                <span className="metric-cell-label">Boliger</span>
                <span className="metric-cell-value">
                  {Number(estimatedHomes).toLocaleString('nb-NO')}
                </span>
              </div>
              <div>
                <span className="metric-cell-label">Grøntareal</span>
                <span className="metric-cell-value">{greenSpacePercent} %</span>
              </div>
            </div>
          </div>
        </article>
      </aside>
    </div>
  );
}
