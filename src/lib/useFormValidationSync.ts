'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Synkroniserer nettleserens :user-invalid-tilstand med aria-invalid,
 * data-error -> aria-describedby og én felles høflig aria-live-region.
 * Inkluderer WeakMap-basert fallback for eldre nettlesere uten :user-invalid.
 */
export function useFormValidationSync(formRef: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const supportsUserInvalid =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('selector(:user-invalid)');

    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.classList.add('visually-hidden');
    document.body.append(announcer);

    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: Element | null = null;

    const dirtyState = new WeakMap<
      Element,
      { hasInteracted: boolean; hasBlurred: boolean }
    >();
    const flagged = new WeakSet<Element>();
    const announced = new WeakSet<Element>();

    const linkError = (el: Element, shown: boolean) => {
      const htmlEl = el as HTMLElement;
      const errorId = htmlEl.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute('aria-describedby') || '')
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
      else el.removeAttribute('aria-describedby');
    };

    const spokenText = (node: Element): string => {
      const copy = node.cloneNode(true) as Element;
      copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
      copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
        n.replaceWith(`${n.getAttribute('aria-label')}: `);
      });
      return (copy.textContent || '').replace(/\s+/g, ' ').trim();
    };

    const announceError = (el: Element) => {
      const htmlEl = el as HTMLInputElement;
      const errorId = htmlEl.dataset.error;
      if (!errorId) return;
      const errorNode = document.getElementById(errorId);
      if (!errorNode) return;
      const labelNode = htmlEl.labels?.[0];
      const label = labelNode ? `${spokenText(labelNode)}: ` : '';
      clearTimeout(announceTimer);
      announcer.textContent = '';
      announcedField = el;
      announceTimer = setTimeout(() => {
        announcer.textContent = label + spokenText(errorNode);
      }, 500);
    };

    const syncAria = (el: Element, announce = false) => {
      if (!el.matches?.('input, select, textarea')) return;
      const control = el as HTMLInputElement;
      const invalid = supportsUserInvalid
        ? control.matches(':user-invalid')
        : control.classList.contains('user-invalid-fallback');

      if (invalid) {
        if (announce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute('aria-invalid', 'true');
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
        el.setAttribute('aria-invalid', 'false');
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
          clearTimeout(announceTimer);
          announcer.textContent = '';
        }
      }
    };

    const updateFallbackState = (control: HTMLInputElement) => {
      const isValid = control.validity.valid;
      control.classList.toggle('user-invalid-fallback', !isValid);
      control.classList.toggle('user-valid-fallback', isValid);
      syncAria(control, !isValid);
    };

    // Start alle skjemafelt med aria-invalid="false"
    form.querySelectorAll('input, select, textarea').forEach((el) => {
      syncAria(el);
    });

    const onBlur = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.matches?.('input, select, textarea')) return;
      if (!supportsUserInvalid) {
        const state = dirtyState.get(target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasBlurred = true;
        dirtyState.set(target, state);
        if (state.hasInteracted) updateFallbackState(target);
      } else {
        syncAria(target, true);
      }
    };

    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.matches?.('input, select, textarea')) return;
      if (!supportsUserInvalid) {
        const state = dirtyState.get(target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasInteracted = true;
        dirtyState.set(target, state);
        if (state.hasBlurred) updateFallbackState(target);
      } else if (target.hasAttribute('aria-invalid')) {
        syncAria(target);
      }
    };

    const onChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.matches?.('input, select, textarea')) return;
      if (!supportsUserInvalid) {
        const state = dirtyState.get(target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasInteracted = true;
        dirtyState.set(target, state);
        if (state.hasBlurred) updateFallbackState(target);
      } else {
        syncAria(target, true);
      }
    };

    const onInvalid = (e: Event) => {
      const target = e.target as HTMLInputElement;
      announced.add(target);
      if (!supportsUserInvalid) {
        dirtyState.set(target, { hasInteracted: true, hasBlurred: true });
        updateFallbackState(target);
      } else {
        syncAria(target);
      }
    };

    const onReset = () => {
      setTimeout(() => {
        Array.from(form.elements).forEach((el) => {
          dirtyState.delete(el);
          el.classList.remove('user-invalid-fallback', 'user-valid-fallback');
          syncAria(el);
        });
      });
    };

    form.addEventListener('blur', onBlur, true);
    form.addEventListener('input', onInput);
    form.addEventListener('change', onChange, true);
    form.addEventListener('invalid', onInvalid, true);
    form.addEventListener('reset', onReset, true);

    return () => {
      clearTimeout(announceTimer);
      form.removeEventListener('blur', onBlur, true);
      form.removeEventListener('input', onInput);
      form.removeEventListener('change', onChange, true);
      form.removeEventListener('invalid', onInvalid, true);
      form.removeEventListener('reset', onReset, true);
      announcer.remove();
    };
  }, [formRef]);
}
