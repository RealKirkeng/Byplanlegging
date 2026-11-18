'use client';

import { MessageSquare } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { useFormValidationSync } from '@/lib/useFormValidationSync';
import type { CommentItem } from '@/lib/types';

interface CommentSectionProps {
  proposalTitle: string;
  comments: CommentItem[];
  onAddComment: (input: {
    authorName: string;
    authorRole: string;
    body: string;
  }) => void;
}

export function CommentSection({
  proposalTitle,
  comments,
  onAddComment,
}: CommentSectionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  useFormValidationSync(formRef);

  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [body, setBody] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    onAddComment({
      authorName,
      authorRole,
      body,
    });

    setAuthorName('');
    setAuthorRole('');
    setBody('');
    setSubmittedNotice(true);
    formRef.current?.reset();
  };

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('nb-NO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(iso));
    } catch {
      return iso.slice(0, 10);
    }
  };

  return (
    <section
      aria-labelledby="comments-heading"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: 'var(--space-lg)',
        alignItems: 'start',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBlockEnd: '1.25rem',
          }}
        >
          <MessageSquare size={18} style={{ color: 'var(--accent-brass)' }} aria-hidden="true" />
          <h2 id="comments-heading" className="font-display" style={{ margin: 0, fontSize: 'var(--font-xl)' }}>
            Innbyggerinnspill ({comments.length})
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.length === 0 ? (
            <p
              style={{
                padding: '1.25rem',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-hairline)',
                color: 'var(--text-secondary)',
                margin: 0,
              }}
            >
              Ingen innspill er registrert for «{proposalTitle}» ennå. Bli den
              første til å dele hva som fungerer eller bør forbedres.
            </p>
          ) : (
            comments.map((comment) => (
              <article
                key={comment.id}
                style={{
                  padding: '1.25rem',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-hairline)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    marginBlockEnd: '0.55rem',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 'var(--font-sm)' }}>
                      {comment.authorName}
                    </strong>
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: 'var(--font-xs)',
                        marginInlineStart: '0.55rem',
                      }}
                    >
                      · {comment.authorRole}
                    </span>
                  </div>
                  <time
                    dateTime={comment.createdAt}
                    className="font-mono-meta"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--font-sm)',
                    lineHeight: 1.65,
                  }}
                >
                  {comment.body}
                </p>
              </article>
            ))
          )}
        </div>
      </div>

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
          gap: '1rem',
        }}
      >
        <div>
          <span className="eyebrow">Del ditt perspektiv</span>
          <h3 className="font-display" style={{ margin: '0.4rem 0 0', fontSize: '1.55rem' }}>
            Legg til innspill om forslaget
          </h3>
        </div>

        <div className="field">
          <label htmlFor="comment-name" className="field-label">
            Ditt navn *
          </label>
          <span id="comment-name-hint" className="field-hint">
            Eksempel: Ingrid Solberg (vises offentlig ved innspillet)
          </span>
          <input
            id="comment-name"
            name="authorName"
            type="text"
            className="field-input"
            required
            minLength={2}
            value={authorName}
            onChange={(e) => {
              setAuthorName(e.target.value);
              setSubmittedNotice(false);
            }}
            aria-describedby="comment-name-hint"
            data-error="comment-name-error"
          />
          <div id="comment-name-error" className="error-msg">
            <span role="img" aria-label="Feil">
              ⚠
            </span>{' '}
            Skriv inn navnet ditt (minst 2 tegn).
          </div>
        </div>

        <div className="field">
          <label htmlFor="comment-role" className="field-label">
            Tilhørighet eller rolle
          </label>
          <span id="comment-role-hint" className="field-hint">
            F.eks. Innbygger i Kvadraturen, Arkitekt, Næringsdrivende
          </span>
          <input
            id="comment-role"
            name="authorRole"
            type="text"
            className="field-input"
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            aria-describedby="comment-role-hint"
          />
        </div>

        <div className="field">
          <label htmlFor="comment-body" className="field-label">
            Innspill eller vurdering *
          </label>
          <span id="comment-body-hint" className="field-hint">
            Beskriv hva du mener om høyde, arkitektur, byliv eller sjøtilgang (minst 12 tegn).
          </span>
          <textarea
            id="comment-body"
            name="body"
            className="field-textarea"
            required
            minLength={12}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setSubmittedNotice(false);
            }}
            aria-describedby="comment-body-hint"
            data-error="comment-body-error"
          />
          <div id="comment-body-error" className="error-msg">
            <span role="img" aria-label="Feil">
              ⚠
            </span>{' '}
            Innspillet må inneholde minst 12 tegn.
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Publiser innspill
        </button>

        {submittedNotice && (
          <p
            role="status"
            className="font-mono-meta"
            style={{ margin: 0, color: 'var(--state-valid)' }}
          >
            ✓ Innspillet ditt er publisert øverst i listen.
          </p>
        )}
      </form>
    </section>
  );
}
