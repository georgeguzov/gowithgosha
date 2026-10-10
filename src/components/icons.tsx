export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21.5 4.5 2.8 11.8c-1.1.43-1.1 1.06-.2 1.33l4.8 1.5 1.85 5.63c.23.63.4.88.8.88.33 0 .5-.15.72-.37l1.95-1.9 4.05 3c.75.41 1.28.2 1.47-.69l2.67-12.6c.28-1.14-.42-1.65-1.4-1.24Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m8.6 14.6 9.2-7.1-7.5 8.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" />
    </svg>
  );
}
