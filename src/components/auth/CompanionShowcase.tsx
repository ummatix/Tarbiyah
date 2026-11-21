import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import bariAnsharahImg from '../../assets/bari-ansharah-companion.jpg';
import { IslamicGeometryAccent } from '../../assets/IslamicGeometry';
import type { AuthMode } from '../../types/auth';
import { SHOWCASE_SEGMENTS, useShowcaseTypewriter } from './useShowcaseTypewriter';

interface CompanionShowcaseProps {
  mode: AuthMode;
  variant: 'mobile' | 'desktop';
  titleOverride?: string;
  subtitleOverride?: string;
}

export function CompanionShowcase({
  mode,
  variant,
  titleOverride,
  subtitleOverride,
}: CompanionShowcaseProps) {
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(min-width: 1024px)').matches;
  });

  useEffect(() => {
    if (variant !== 'desktop' || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia('(min-width: 1024px)');
    const syncViewport = () => setIsDesktopViewport(mql.matches);
    syncViewport();
    mql.addEventListener('change', syncViewport);
    return () => mql.removeEventListener('change', syncViewport);
  }, [variant]);

  const {
    leadText,
    accentText,
    tailText,
    showLineBreak,
    isHeadlineComplete,
    isDescriptionVisible,
    reducedMotion,
  } = useShowcaseTypewriter(variant === 'desktop' && isDesktopViewport);

  const isLogin = mode === 'login';

  if (variant === 'mobile') {
    const mobileTitle = titleOverride ?? (isLogin ? 'Welcome back!' : 'Join TARBIYAH');
    const mobileSubtitle =
      subtitleOverride ??
      (isLogin ? 'Ready to continue your journey?' : 'Begin your personal path of growth.');

    return (
      <div className="relative mb-4 w-full overflow-hidden rounded-3xl bg-gradient-to-b from-surface-container to-surface-container-low p-4 shadow-sm lg:hidden">
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 text-primary opacity-20">
          <IslamicGeometryAccent className="h-full w-full" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="aspect-square h-20 w-20 overflow-hidden rounded-2xl bg-surface-container-highest shadow-md">
              <img
                alt="Abdul Bari and Ansharah warm welcoming guides"
                className="h-full w-full object-cover object-top"
                height={512}
                src={bariAnsharahImg}
                width={512}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="flex min-w-0 flex-col pr-1">
            <div className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-fixed px-2.5 py-0.5 font-label-sm text-label-sm text-on-primary-fixed">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span>Bismillah &amp; Welcome</span>
            </div>
            <h1 className="font-heading text-headline-sm leading-tight tracking-tight text-on-surface">
              {mobileTitle}
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{mobileSubtitle}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-b from-showcase-start to-showcase-end p-10 lg:col-span-6 lg:flex lg:rounded-l-[2rem] xl:p-14">
      {/* Arch background silhouette */}
      <div className="pointer-events-none absolute inset-x-8 bottom-0 top-12 flex flex-col items-center rounded-t-[14rem] bg-surface-container-low/70 shadow-inner">
        <div className="h-full w-full rounded-t-[14rem] border-x-2 border-t-2 border-primary-fixed/60 dark:border-primary/20" />
      </div>

      <div className="relative z-10 flex flex-col gap-space-lg">
        {/* Brand header (typographic only; broken Stitch logo URL omitted) */}
        <div className="flex items-center gap-space-sm">
          <div>
            <span className="font-heading text-headline-sm font-extrabold tracking-tight text-on-surface">
              TARBIYAH
            </span>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-tertiary" />
              <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-tertiary">
                Self-Rectification &amp; Faith
              </span>
            </div>
          </div>
        </div>

        {/* Tagline & statement */}
        <div className="mt-2 space-y-2">
          <h1 className="relative grid font-heading text-headline-lg font-bold leading-snug tracking-tight text-on-surface">
            <span className="sr-only">
              {SHOWCASE_SEGMENTS.lead}
              {SHOWCASE_SEGMENTS.accent} {SHOWCASE_SEGMENTS.tail}
            </span>

            {/* Invisible height-reserving copy prevents layout shifts during writing animation */}
            <span
              aria-hidden="true"
              className="invisible pointer-events-none col-start-1 row-start-1 select-none"
            >
              {SHOWCASE_SEGMENTS.lead}
              <span>{SHOWCASE_SEGMENTS.accent}</span>
              {' '}
              <br />
              {SHOWCASE_SEGMENTS.tail}
            </span>

            {/* Animated character-by-character writing layer */}
            <span aria-hidden="true" className="col-start-1 row-start-1" data-testid="showcase-typed-headline">
              {leadText}
              {accentText ? (
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {accentText}
                </span>
              ) : null}
              {showLineBreak ? (
                <>
                  {' '}
                  <br />
                </>
              ) : null}
              {tailText}
              {!isHeadlineComplete && !reducedMotion ? (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-[0.88em] w-[2px] translate-y-[0.1em] animate-pulse rounded-full bg-primary align-baseline"
                  data-testid="showcase-cursor"
                />
              ) : null}
            </span>
          </h1>
          <p
            className={`max-w-md font-body-md text-body-md leading-relaxed text-on-surface-variant ${
              reducedMotion
                ? 'translate-y-0 opacity-100'
                : `transition-all duration-700 ease-out motion-reduce:transition-none ${
                    isDescriptionVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`
            }`}
            data-testid="showcase-description"
          >
            Begin your personalised path of Islamic knowledge, daily reflection, and mindful
            spiritual growth alongside companions who understand you.
          </p>
        </div>
      </div>

      {/* Companion illustration (1:1 aspect ratio preserved from Stitch mobile asset, free of Anara mockup text) */}
      <div className="relative z-10 my-5 flex items-end justify-center">
        <div className="group relative aspect-square w-full max-w-[300px] overflow-hidden rounded-2xl bg-surface-container-high/40 p-2 shadow-lg backdrop-blur-sm dark:ring-1 dark:ring-outline-variant/70 xl:max-w-[330px]">
          <img
            alt="Digital illustration of Muslim learning companions Abdul Bari and Ansharah smiling warmly"
            className="h-full w-full rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-105"
            height={512}
            src={bariAnsharahImg}
            width={512}
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-surface-container-lowest/90 px-3.5 py-2 shadow-sm backdrop-blur-md dark:border dark:border-outline-variant/70">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 fill-primary text-primary" />
              <span className="font-label-md text-label-md text-on-surface">
                Meet Bari &amp; Ansharah
              </span>
            </div>
            <span className="font-label-sm text-label-sm font-medium text-primary">Study Guides</span>
          </div>
        </div>
      </div>

      {/* Trust metric banner (TODO: Confirm verified community count; Stitch desktop 25,000+ vs mobile 45,000) */}
      <div className="relative z-10 flex flex-col items-center gap-3 rounded-2xl bg-surface-container-lowest/80 p-3.5 shadow-sm backdrop-blur-sm dark:border dark:border-outline-variant/70 sm:flex-row">
        <div className="flex -space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-label-sm text-label-sm font-bold text-on-primary shadow-sm">
            A
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-label-sm text-label-sm font-bold text-on-secondary shadow-sm">
            Z
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary font-label-sm text-label-sm font-bold text-on-tertiary shadow-sm">
            M
          </div>
        </div>
        <div className="text-center sm:text-left">
          <p className="font-label-md text-label-md font-semibold text-on-surface">
            Join a growing community of young Muslims
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Cultivating character and deen at their own pace.
          </p>
        </div>
      </div>
    </div>
  );
}
