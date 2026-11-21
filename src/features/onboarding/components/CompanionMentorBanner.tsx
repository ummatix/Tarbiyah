import { HeartHandshake } from 'lucide-react';
import companionsImg from '../../../assets/bari-ansharah-companion.jpg';

interface CompanionMentorBannerProps {
  message: string;
}

export function CompanionMentorBanner({ message }: CompanionMentorBannerProps) {
  return (
    <div className="relative flex items-center gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-theme-card dark:ring-1 dark:ring-outline-variant/80 lg:items-start lg:bg-surface-container-low lg:p-5">
      <div className="relative shrink-0">
        <div className="aspect-square h-12 w-12 overflow-hidden rounded-full bg-primary-fixed shadow-md lg:h-14 lg:w-14">
          <img
            alt="Abdul Bari and Ansharah learning companions"
            className="h-full w-full object-cover object-top"
            height={512}
            src={companionsImg}
            width={512}
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute -bottom-1 -right-1 hidden h-5 w-5 items-center justify-center rounded-full bg-tertiary-container text-on-tertiary-container shadow-sm lg:flex"
        >
          <HeartHandshake className="h-3 w-3" />
        </span>
      </div>

      <div className="min-w-0 flex-1 pr-1">
        <div className="mb-0.5 flex flex-wrap items-center gap-2 lg:mb-1">
          <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-primary lg:font-label-lg lg:text-label-lg lg:font-bold lg:normal-case lg:tracking-normal">
            Abdul Bari &amp; Ansharah
          </span>
          <span className="hidden rounded-full bg-surface-container-high px-2 py-0.5 font-label-sm text-label-sm text-on-surface-variant lg:inline-block">
            Your Learning Companions
          </span>
        </div>
        <p className="font-body-sm text-body-sm leading-snug text-on-surface-variant lg:font-body-md lg:text-body-md lg:leading-relaxed lg:text-on-surface">
          {message}
        </p>
      </div>
    </div>
  );
}

