import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnrollForm from "@/components/EnrollForm";
import CourseAgendaForm from "@/components/CourseAgendaForm";
import { COURSES, LANGUAGE_LABELS, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found — Jayburtt Dijkhoff" };

  return {
    title: `${course.title} — Jayburtt Dijkhoff`,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const available = course.status === "available";

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
            <span
              style={{
                padding: "5px 13px",
                background: "#dde5f0",
                borderRadius: 12,
                fontSize: 11.5,
                fontWeight: 600,
                color: "#17325a",
              }}
            >
              {LANGUAGE_LABELS[course.language]}
            </span>
            <span
              style={{
                padding: "5px 13px",
                background: "var(--color-cream)",
                borderRadius: 12,
                fontSize: 11.5,
                fontWeight: 600,
                color: "var(--color-muted)",
              }}
            >
              {course.format}
            </span>
            {!available && (
              <span
                style={{
                  padding: "5px 13px",
                  background: "#ece2d0",
                  borderRadius: 12,
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: "#5a4a30",
                }}
              >
                In development
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5.5vw, 54px)",
              lineHeight: 1.1,
              fontWeight: 700,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            {course.title}
          </h1>
          {course.subtitle && (
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 19, color: "var(--color-muted)", marginBottom: 24 }}>
              {course.subtitle}
            </div>
          )}
          <p style={{ fontSize: 17.5, lineHeight: 1.65, color: "var(--color-muted)", maxWidth: 600, margin: "0 auto 34px" }}>
            {course.summary}
          </p>

          {available ? (
            <a href="#enroll" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
              Enroll — {course.price}
            </a>
          ) : (
            <a href="#agenda" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
              Get Notified When It Opens
            </a>
          )}
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="reveal" style={{ background: "var(--color-offwhite)", padding: "90px 24px" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              What You&apos;ll Learn
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700 }}>
              What you take away.
            </h2>
          </div>
          <div
            className="grid-2 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {course.learn.map((item, i) => (
              <div
                key={item}
                className="method-card"
                style={{
                  background: "var(--color-cream)",
                  borderRadius: 16,
                  padding: "22px 26px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: "var(--color-accent)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE + FORMAT */}
      <section className="reveal" style={{ background: "var(--color-navy)", padding: "80px 24px" }}>
        <div className="container grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9fb2ca", marginBottom: 16 }}>
              Who It&apos;s For
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#c3d2e4", margin: 0 }}>
              {course.audience ?? "Professionals who want practical knowledge they can use immediately."}
            </p>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9fb2ca", marginBottom: 16 }}>
              Format
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={{ fontSize: 15.5, color: "#c3d2e4" }}>{course.format}</li>
              {course.duration && <li style={{ fontSize: 15.5, color: "#c3d2e4" }}>{course.duration}</li>}
              <li style={{ fontSize: 15.5, color: "#c3d2e4" }}>
                Taught in {LANGUAGE_LABELS[course.language]}
              </li>
              <li style={{ fontSize: 15.5, color: "#c3d2e4" }}>Lifetime access after purchase</li>
            </ul>
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="reveal" style={{ padding: "90px 24px" }}>
        <div
          className="container grid-2"
          style={{ maxWidth: 960, display: "grid", gridTemplateColumns: "0.55fr 1fr", gap: 48, alignItems: "center" }}
        >
          <div className="img-zoom" style={{ borderRadius: 24 }}>
            <Image
              src="/images/portrait-speaking.png"
              alt="Jayburtt Dijkhoff"
              width={640}
              height={688}
              style={{
                width: "100%",
                height: 300,
                objectFit: "contain",
                background: "var(--color-cream)",
                borderRadius: 24,
                boxShadow: "0 24px 48px #00000022",
              }}
            />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Your Instructor
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, margin: "0 0 14px" }}>
              Dr. Jayburtt Dijkhoff
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--color-muted)" }}>
              Educator, author and speaker. Jayburtt teaches from the inside of the systems he
              writes about — turning years of research and lived experience into knowledge people
              can actually use.
            </p>
          </div>
        </div>
      </section>

      {/* ENROLL / NOTIFY */}
      {available ? (
        <section id="enroll" className="reveal" style={{ background: "var(--color-teal)", padding: "90px 24px", scrollMarginTop: 90 }}>
          <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: "0 0 14px" }}>
              Enroll in {course.title}
            </h2>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 700, color: "white", margin: "0 0 6px" }}>
              {course.price}
            </div>
            <p style={{ fontSize: 14.5, color: "#e3f5f0", marginBottom: 30 }}>
              One-time payment · Lifetime access
            </p>
          </div>
          <div style={{ maxWidth: 420, margin: "0 auto" }}>
            <EnrollForm
              program={course.slug}
              price={course.price ?? ""}
              paymentUrl={course.paymentUrl}
            />
          </div>
        </section>
      ) : (
        <section id="agenda" className="reveal" style={{ background: "var(--color-ink)", padding: "90px 24px", scrollMarginTop: 90 }}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: "0 0 14px" }}>
              This course is still being built.
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#a8a49a", margin: "0 0 32px" }}>
              Join the agenda list and you&apos;ll be told the moment it opens — founding cohorts
              are offered to this list first.
            </p>
          </div>
          <div style={{ maxWidth: 420, margin: "0 auto" }}>
            <CourseAgendaForm />
          </div>
        </section>
      )}

      {/* BACK */}
      <section style={{ padding: "60px 24px", textAlign: "center" }}>
        <Link href="/courses" className="text-link" style={{ fontSize: 15 }}>
          ← All courses
        </Link>
      </section>

      <Footer />
    </div>
  );
}
