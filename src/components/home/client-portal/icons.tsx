import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WifiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 8.5a16 16 0 0 1 20 0" />
      <path d="M5.5 12.5a11 11 0 0 1 13 0" />
      <path d="M9 16.3a5.5 5.5 0 0 1 6 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PlanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 8.5 12 4 3 8.5 12 13l9-4.5Z" />
      <path d="M3 8.5V16l9 4.5 9-4.5V8.5" />
      <path d="M12 13v7.5" />
    </svg>
  );
}

export function BillingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 10h19" />
      <path d="M6 14.5h4" />
    </svg>
  );
}

export function SupportIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12a8 8 0 1 1 3.2 6.4L4 19.5l1.1-3.4A7.96 7.96 0 0 1 4 12Z" />
    </svg>
  );
}

export function IssueIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10.3 3.9 2.7 17a1.6 1.6 0 0 0 1.4 2.4h15.8a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a1.6 1.6 0 0 0-2.8 0Z" />
      <path d="M12 9.5v4" />
      <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstallIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="6" width="13" height="10" rx="1.5" />
      <path d="M15.5 10h3.2l2.8 3v3h-6" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15" />
      <path d="M13 5.5 19.5 12 13 18.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5 9 17l10.5-11" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12.5 2.5 4 14h6l-1.5 7.5L20 10h-6l-1.5-7.5Z" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V19a1 1 0 0 0 1 1H9v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h2.5a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

export function RouterIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="10.5" width="19" height="7" rx="1.5" />
      <path d="M7 10.5V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2.5" />
      <circle cx="7" cy="14" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="10" cy="14" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
