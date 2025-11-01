"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

type SlideVisual =
  | {
      type: "lifecycle";
      steps: { title: string; detail: string }[];
    }
  | {
      type: "stack";
      layers: { title: string; detail: string }[];
    }
  | {
      type: "impact";
      pillars: { title: string; metric: string; detail: string }[];
    }
  | {
      type: "roadmap";
      milestones: { quarter: string; focus: string; outcome: string }[];
    };

type Slide = {
  kicker?: string;
  title: string;
  description?: string;
  bullets?: string[];
  stats?: { label: string; value: string; detail?: string }[];
  quote?: { text: string; author: string; role?: string };
  visual?: SlideVisual;
  footnote?: string;
};

const AUTO_ADVANCE_MS = 15000;

export default function Home() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        kicker: "Data Analytics Playbook",
        title: "Turning raw data into decisive action",
        description:
          "This presentation outlines the foundations for a modern data analytics capability that surfaces trusted insights, accelerates decision-making, and delivers measurable business value.",
        bullets: [
          "Define the analytics lifecycle from ingestion to activation",
          "Prioritize the data stack and governance guardrails",
          "Showcase high-impact use cases and success metrics",
        ],
        stats: [
          {
            label: "Time-to-Insight",
            value: "↓ 45%",
            detail: "Streamlined ingestion + automated modeling",
          },
          {
            label: "Adoption",
            value: "3.2×",
            detail: "Dashboard utilization across business teams",
          },
          {
            label: "ROI",
            value: "$4.6M",
            detail: "Incremental annual run-rate from data-led actions",
          },
        ],
        footnote:
          "Outcome: translate data investments into operational leverage and competitive differentiation.",
      },
      {
        kicker: "Lifecycle",
        title: "A resilient analytics lifecycle connects every data point",
        description:
          "Each phase builds quality and accelerates insight delivery. The sequencing below keeps teams aligned on the high-value path from raw capture to activated decisions.",
        visual: {
          type: "lifecycle",
          steps: [
            {
              title: "Capture",
              detail: "Streaming + batch ingestion from apps, SaaS, IoT",
            },
            {
              title: "Refine",
              detail: "Automated quality checks, cataloging, lineage tracing",
            },
            {
              title: "Model",
              detail: "Semantic layers, feature stores, governed metrics",
            },
            {
              title: "Analyze",
              detail: "Self-serve BI, augmented analytics, experimentation",
            },
            {
              title: "Activate",
              detail: "Reverse ETL, alerts, decision workflows, ML ops",
            },
          ],
        },
        bullets: [
          "Embed observability at every handoff to protect trust",
          "Codify data contracts to prevent schema drift",
          "Close the loop with activation feedback signals",
        ],
        footnote:
          "Design principle: treat analytics as a product with a shared roadmap and success metrics.",
      },
      {
        kicker: "Data Platform",
        title: "Composable analytics stack for scale and governance",
        description:
          "Blend best-in-class managed services with reusable platform accelerators to keep teams shipping insights while maintaining compliance.",
        visual: {
          type: "stack",
          layers: [
            {
              title: "Experience",
              detail: "Operational dashboards, guided analytics apps, BI portal",
            },
            {
              title: "Intelligence",
              detail:
                "Predictive models, experimentation engine, natural language insights",
            },
            {
              title: "Transform",
              detail: "dbt metrics, transformation orchestration, data contracts",
            },
            {
              title: "Storage",
              detail: "Cloud data warehouse + lakehouse unified via open table formats",
            },
            {
              title: "Ingestion",
              detail: "Real-time CDC, API connectors, streaming pipelines",
            },
          ],
        },
        bullets: [
          "Adopt modular architecture to plug in new capabilities quickly",
          "Centralize governance controls without blocking innovation",
          "Automate lineage metadata to simplify audit readiness",
        ],
      },
      {
        kicker: "Business Impact",
        title: "Analytics delivers value when embedded in daily decisions",
        description:
          "Three high-leverage pillars unlock compounding impact once surfacing insights is seamless and contextual.",
        visual: {
          type: "impact",
          pillars: [
            {
              title: "Growth",
              metric: "+18% conversion",
              detail:
                "Personalized lifecycle journeys informed by propensity modeling",
            },
            {
              title: "Efficiency",
              metric: "35% faster ops",
              detail:
                "Predictive maintenance + inventory optimization reduce downtime",
            },
            {
              title: "Experience",
              metric: "NPS +12",
              detail:
                "Voice-of-customer analytics routes signals directly to product teams",
            },
          ],
        },
        bullets: [
          "Define business owners for each insight stream",
          "Publish success metrics to reinforce accountability",
          "Instrument feedback loops to measure downstream behavior change",
        ],
        quote: {
          text: "When data shows up inside the workflow instead of a separate portal, adoption accelerates overnight.",
          author: "Avery Chen",
          role: "Director, Revenue Strategy",
        },
      },
      {
        kicker: "Roadmap",
        title: "90-day momentum plan to launch the analytics engine",
        description:
          "Deliver iterative wins that prove credibility while laying the groundwork for advanced capabilities.",
        visual: {
          type: "roadmap",
          milestones: [
            {
              quarter: "Weeks 1-4",
              focus: "Stabilize pipelines + define source-of-truth metrics",
              outcome: "Core dashboards refreshed daily with automated QA",
            },
            {
              quarter: "Weeks 5-8",
              focus: "Roll out semantic layer + governed self-serve assets",
              outcome: "Business teams explore trusted metrics without analyst handoffs",
            },
            {
              quarter: "Weeks 9-12",
              focus: "Embed activation + alerting into operations",
              outcome: "Closed-loop analytics drives proactive responses and ML experimentation",
            },
          ],
        },
        bullets: [
          "Staff a cross-functional squad: data engineering, analytics, product",
          "Publish a living playbook documenting contracts, SLAs, and runbooks",
          "Celebrate adoption milestones to reinforce cultural change",
        ],
        footnote:
          "Gate each phase with measurable adoption and quality targets before scaling further.",
      },
      {
        kicker: "Key Takeaways",
        title: "Data analytics succeeds when it is trustworthy, actionable, and owned",
        description:
          "Double down on operations and storytelling to make analytics the engine behind every strategic decision.",
        bullets: [
          "Invest in quality automation early—it compounds velocity and trust",
          "Prioritize activation pathways so insights meet stakeholders where they work",
          "Anchor every initiative to an explicit business outcome and owner",
        ],
        stats: [
          {
            label: "Decision Cycle",
            value: "Real-time",
            detail: "When activation pipelines push insights automatically",
          },
          {
            label: "Data Debt",
            value: "Contained",
            detail: "Continuous monitoring flags breakage before it spreads",
          },
        ],
        footnote: "Next step: align executive sponsors on success metrics and resource plan.",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const totalSlides = slides.length;
  const activeSlide = slides[currentIndex];

  const goTo = useCallback(
    (nextIndex: number) => {
      setCurrentIndex((nextIndex + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  useEffect(() => {
    if (!isAutoPlay) {
      return;
    }

    const timer = window.setTimeout(() => {
      goNext();
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [currentIndex, goNext, isAutoPlay]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const renderVisual = useCallback((visual: SlideVisual) => {
    switch (visual.type) {
      case "lifecycle":
        return (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              {visual.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex flex-1 flex-col items-center text-center"
                >
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/60 bg-cyan-400/20 text-sm font-semibold text-cyan-100 shadow-[0_0_30px_rgba(45,225,255,0.25)]">
                    {index + 1}
                  </div>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-wide text-cyan-100">
                    {step.title}
                  </div>
                  <p className="mt-1 text-xs text-slate-200/80">{step.detail}</p>
                  {index < visual.steps.length - 1 && (
                    <span className="absolute left-full top-6 hidden h-[2px] w-full translate-x-[-50%] bg-gradient-to-r from-cyan-200/40 via-cyan-200/80 to-cyan-200/0 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case "stack":
        return (
          <div className="grid gap-3">
            {visual.layers.map((layer, index) => (
              <div
                key={layer.title}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-5 shadow-[0_10px_40px_-20px_rgba(15,118,110,0.65)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                      {`Layer ${visual.layers.length - index}`}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {layer.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase text-emerald-100">
                    {index === 0
                      ? "Experience"
                      : index === visual.layers.length - 1
                      ? "Foundation"
                      : "Enablement"}
                  </span>
                </div>
                <p className="relative mt-2 text-sm text-slate-200/80">
                  {layer.detail}
                </p>
              </div>
            ))}
          </div>
        );
      case "impact":
        return (
          <div className="grid gap-4 md:grid-cols-3">
            {visual.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left shadow-[0_10px_45px_-18px_rgba(37,99,235,0.45)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                  {pillar.title}
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {pillar.metric}
                </p>
                <p className="mt-3 text-sm text-slate-200/80">{pillar.detail}</p>
              </div>
            ))}
          </div>
        );
      case "roadmap":
        return (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/30 p-6 shadow-[0_22px_70px_-35px_rgba(14,165,233,0.55)]">
            <div className="grid gap-5 md:grid-cols-3">
              {visual.milestones.map((milestone) => (
                <div key={milestone.quarter} className="relative rounded-2xl bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                    {milestone.quarter}
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white">
                    {milestone.focus}
                  </h3>
                  <p className="mt-2 text-xs text-slate-200/80">
                    {milestone.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_55%)]" />
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 pb-20 lg:px-12">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/80">
              Insight Lab
            </p>
            <h1 className="mt-1 text-lg font-semibold text-white/90">
              Data Analytics Narrative
            </h1>
          </div>
          <div className="text-right text-xs text-slate-300/70">
            <p>Slide {currentIndex + 1}</p>
            <p>of {totalSlides}</p>
          </div>
        </header>

        <div className="mt-6 flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2 flex-1 overflow-hidden rounded-full transition-all duration-500 ${
                index <= currentIndex
                  ? "bg-gradient-to-r from-cyan-300 via-emerald-300 to-indigo-300"
                  : "bg-slate-700"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <section className="relative mt-10 flex flex-1 flex-col justify-between rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_35px_120px_-60px_rgba(6,182,212,0.8)] backdrop-blur-lg sm:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-1 flex-col gap-8"
            >
              <div className="flex flex-col gap-3">
                {activeSlide.kicker && (
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
                    {activeSlide.kicker}
                  </span>
                )}
                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {activeSlide.title}
                </h2>
                {activeSlide.description && (
                  <p className="max-w-3xl text-base text-slate-200/80 sm:text-lg">
                    {activeSlide.description}
                  </p>
                )}
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <div className="space-y-6">
                  {activeSlide.bullets && (
                    <ul className="space-y-3 text-sm text-slate-100/90 sm:text-base">
                      {activeSlide.bullets.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-gradient-to-r from-cyan-300 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.65)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeSlide.quote && (
                    <blockquote className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm sm:text-base">
                      <span className="absolute -left-4 top-5 text-6xl font-bold text-cyan-500/20">
                        “
                      </span>
                      <p className="relative text-slate-100/90">
                        {activeSlide.quote.text}
                      </p>
                      <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                        {activeSlide.quote.author}
                        {activeSlide.quote.role ? ` · ${activeSlide.quote.role}` : ""}
                      </footer>
                    </blockquote>
                  )}

                  {activeSlide.footnote && (
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-200/60">
                      {activeSlide.footnote}
                    </p>
                  )}
                </div>

                <div className="space-y-5">
                  {activeSlide.visual && renderVisual(activeSlide.visual)}

                  {activeSlide.stats && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {activeSlide.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_12px_45px_-30px_rgba(56,189,248,0.9)]"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/70">
                            {stat.label}
                          </p>
                          <p className="mt-2 text-2xl font-bold text-white">
                            {stat.value}
                          </p>
                          {stat.detail && (
                            <p className="mt-2 text-xs text-slate-200/70">
                              {stat.detail}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <NavButton
                label="Previous slide"
                onClick={() => {
                  setIsAutoPlay(false);
                  goPrev();
                }}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15 18-6-6 6-6"
                    />
                  </svg>
                }
              />
              <NavButton
                label="Next slide"
                onClick={() => {
                  setIsAutoPlay(false);
                  goNext();
                }}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 6 6 6-6 6"
                    />
                  </svg>
                }
              />
            </div>
            <button
              type="button"
              onClick={() => setIsAutoPlay((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-50"
            >
              {isAutoPlay ? (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" d="M8.5 6v12" />
                    <path strokeLinecap="round" d="M15.5 6v12" />
                  </svg>
                  Auto-play
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 6v12l10-6-10-6Z"
                    />
                  </svg>
                  Play deck
                </>
              )}
            </button>
          </div>
        </section>

        <footer className="mt-10 flex flex-col justify-between gap-3 text-xs text-slate-400/80 sm:flex-row">
          <p>© {new Date().getFullYear()} Insight Lab · Modern Analytics Office</p>
          <p>Navigate with ← → or spacebar · Auto-advance every 15 seconds</p>
        </footer>
      </main>
    </div>
  );
}

type NavButtonProps = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
};

function NavButton({ label, icon, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-50"
      aria-label={label}
    >
      {icon}
    </button>
  );
}
