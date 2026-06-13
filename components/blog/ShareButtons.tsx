'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  url: string;
  title: string;
  excerpt?: string;
  image?: string;
  sticky?: boolean;
}

function ShareIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

export default function ShareButtons({ url, title, excerpt, image, sticky }: Props) {
  const [open, setOpen]           = useState(false);
  const [copied, setCopied]       = useState(false);
  const [hasNative, setHasNative] = useState(false);

  useEffect(() => {
    setHasNative(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const twitter  = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const email    = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(url); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = () => navigator.share?.({ title, url, text: excerpt });

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-sm bg-brand-card border border-brand-border rounded-t-2xl sm:rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-brand-border">
          <p className="text-brand-light font-semibold text-base">Share</p>
          <button
            onClick={() => setOpen(false)}
            className="text-brand-grey hover:text-brand-light transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* OG preview */}
        <div className="mx-4 mt-4 mb-2 rounded-xl overflow-hidden border border-brand-border bg-brand-surface">
          {image ? (
            <div className="relative w-full aspect-video">
              <Image src={image} alt={title} fill className="object-cover" sizes="400px" />
            </div>
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-brand-accent/20 to-brand-green/20 flex items-center justify-center p-8">
              <p className="font-heading font-bold text-brand-light text-center text-lg leading-snug">{title}</p>
            </div>
          )}
          <div className="px-4 py-3">
            <p className="text-brand-light font-semibold text-sm leading-snug line-clamp-2 mb-1">{title}</p>
            {excerpt && (
              <p className="text-brand-grey text-xs leading-relaxed line-clamp-2 mb-3">{excerpt}</p>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-brand-accent flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black" style={{ fontSize: 8 }}>L</span>
              </div>
              <span className="text-brand-grey text-xs">Leadarx Blog</span>
            </div>
          </div>
        </div>

        {/* Action row */}
        <div className="px-4 pb-6 pt-3 flex items-center gap-2">
          {/* Copy link — wide */}
          <button
            onClick={copyLink}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {copied ? 'Copied!' : 'Copy link'}
          </button>

          {/* X */}
          <a
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-xl border border-brand-border bg-brand-card hover:border-brand-accent/40 text-brand-grey hover:text-brand-light transition-colors flex-shrink-0"
            aria-label="Share on X"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-xl border border-brand-border bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white transition-colors flex-shrink-0"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href={email}
            className="w-11 h-11 flex items-center justify-center rounded-xl border border-brand-border bg-brand-card hover:border-brand-accent/40 text-brand-grey hover:text-brand-light transition-colors flex-shrink-0"
            aria-label="Share via email"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>

          {/* More — native share if available */}
          {hasNative && (
            <button
              onClick={nativeShare}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-brand-border bg-brand-card hover:border-brand-accent/40 text-brand-grey hover:text-brand-light transition-colors flex-shrink-0"
              aria-label="More sharing options"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (sticky) {
    return (
      <>
        <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-brand-dark border-t border-brand-border px-4 py-3">
          <button
            onClick={() => setOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            <ShareIcon />
            Share this article
          </button>
        </div>
        {open && modal}
      </>
    );
  }

  return (
    <>
      <div>
        <p className="text-brand-light text-xs font-bold tracking-widest uppercase mb-3">Share</p>
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
        >
          <ShareIcon />
          Share this article
        </button>
      </div>
      {open && modal}
    </>
  );
}
