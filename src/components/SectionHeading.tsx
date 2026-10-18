import Reveal from "./Reveal";

type Props = {
  index: string; // "01"
  kicker: string; // "BACKGROUND"
  title: string; // "About"
  subtitle?: string;
  center?: boolean;
  children?: React.ReactNode; // optional right-side slot
};

/**
 * Editorial section header: a huge outlined watermark number, a mono kicker
 * with a hairline, and a large display title. Keeps every section visually
 * consistent while feeling designed rather than templated.
 */
export default function SectionHeading({ index, kicker, title, subtitle, center, children }: Props) {
  return (
    <div className={`relative mb-14 ${center ? "text-center" : ""}`}>
      <span
        className="section-num absolute -top-10 right-0 text-[9rem] sm:text-[12rem]"
        aria-hidden
      >
        {index}
      </span>
      <Reveal>
        <div className={`relative flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          {!center && <span className="h-px w-8 bg-accent/60" />}
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            {index} — {kicker}
          </span>
          {center && <span className="h-px w-8 bg-accent/60" />}
        </div>
        <h2 className="relative mt-3 text-4xl font-bold sm:text-6xl">
          <span className="text-gradient">{title}</span>
          <span className="text-accent">.</span>
        </h2>
        {subtitle && (
          <p className={`mt-4 max-w-2xl text-sm text-neutral-500 ${center ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        )}
      </Reveal>
      {children && <div className="absolute right-0 bottom-2 hidden sm:block">{children}</div>}
    </div>
  );
}
