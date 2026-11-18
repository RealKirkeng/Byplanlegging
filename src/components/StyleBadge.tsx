import { STYLE_META } from '@/config/site';
import type { ArchitecturalStyle } from '@/lib/types';

export function StyleBadge({ style }: { style: ArchitecturalStyle }) {
  const meta = STYLE_META[style];
  return (
    <span
      className="style-badge"
      style={{
        color: meta.accentColor,
        backgroundColor: meta.badgeBg,
        borderColor: meta.badgeBorder,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          inlineSize: '6px',
          blockSize: '6px',
          backgroundColor: meta.accentColor,
        }}
      />
      {meta.label}
    </span>
  );
}
