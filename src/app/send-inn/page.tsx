import type { Metadata } from 'next';
import { SubmitProposalForm } from '@/components/SubmitProposalForm';

export const metadata: Metadata = {
  title: 'Send inn forslag',
  description:
    'Send inn arkitekturforslag, illustrasjoner og nøkkeltall til åpen visning på Bysjon.',
};

export default async function SubmitProposalPage({
  searchParams,
}: {
  searchParams?: Promise<{ omrade?: string }>;
}) {
  const query = searchParams ? await searchParams : {};

  return (
    <section className="section-pad">
      <div className="container">
        <div style={{ maxInlineSize: '66ch', marginBlockEnd: 'var(--space-lg)' }}>
          <span className="eyebrow">Åpen innsendingsportal</span>
          <h1
            className="font-display"
            style={{ margin: '0.6rem 0 1rem', fontSize: 'var(--font-display)' }}
          >
            Send inn deres visjon for byen
          </h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-lg)' }}>
            For arkitektkontorer, designbyråer, nyurbanister og borgerinitiativer.
            Last opp perspektivbilde og fyll ut nøkkeltall — forslaget publiseres
            direkte i lokal visning med forhåndsvisning i sanntid.
          </p>
        </div>

        <SubmitProposalForm initialAreaSlug={query.omrade} />
      </div>
    </section>
  );
}
