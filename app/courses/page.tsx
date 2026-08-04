import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseAgendaForm from "@/components/CourseAgendaForm";
import { COURSES, LANGUAGE_LABELS, activeLanguages, type Course } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses — Jayburtt Dijkhoff",
  description:
    "Short online courses and live masterclasses for professionals who want practical knowledge, insight and confidence. In Dutch, English and Papiamento.",
};

function CourseCard({ course }: { course: Course }) {
  const available = course.status === "available";

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="card-hover"
      style={{
        background: "var(--color-offwhite)",
        borderRadius: 20,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 12px 28px #00000010",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <span
          style={{
            padding: "4px 11px",
            background: "#dde5f0",
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 600,
            color: "#17325a",
          }}
        >
          {course.format}
        </span>
        {!available && (
          <span
            style={{
              padding: "4px 11px",
              background: "#ece2d0",
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 600,
              color: "#5a4a30",
            }}
          >
            In development
          </span>
        )}
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 600, margin: "0 0 4px" }}>
        {course.title}
      </h3>
      {course.subtitle && (
        <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14.5, color: "var(--color-faint)", marginBottom: 12 }}>
          {course.subtitle}
        </div>
      )}

      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--color-muted)", margin: "0 0 22px", flexGrow: 1 }}>
        {course.summary}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>
          {available ? course.price : "Coming soon"}
        </span>
        <span className="text-link" style={{ fontSize: 14 }}>
          {available ? "View course →" : "Read more →"}
        </span>
      </div>
    </Link>
  );
}

export default function CoursesPage() {
  const languages = activeLanguages();

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: "90px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Learn
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5.5vw, 52px)",
              lineHeight: 1.12,
              fontWeight: 700,
              margin: "0 0 22px",
              letterSpacing: "-0.02em",
            }}
          >
            Practical knowledge, insight and confidence.
          </h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, color: "var(--color-muted)" }}>
            Short online courses and live masterclasses for professionals — follow them at your
            own pace, or join a live cohort.
          </p>
        </div>
      </section>

      {/* COURSES BY LANGUAGE */}
      {languages.map((lang, index) => {
        const courses = COURSES.filter((c) => c.language === lang);
        return (
          <section
            key={lang}
            className="reveal"
            style={{
              padding: "60px 24px",
              background: index % 2 === 0 ? "var(--color-bg)" : "var(--color-cream)",
            }}
          >
            <div className="container">
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 32, flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, margin: 0 }}>
                  {LANGUAGE_LABELS[lang]}
                </h2>
                <span style={{ fontSize: 13.5, color: "var(--color-faint)" }}>
                  {courses.length} {courses.length === 1 ? "course" : "courses"}
                </span>
              </div>
              <div
                className="grid-3 reveal reveal-stagger"
                style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
              >
                {courses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* AGENDA */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "90px 24px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            Course Agenda
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: "0 0 16px" }}>
            New courses open in small cohorts.
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#a8a49a", margin: "0 0 32px" }}>
            Join the agenda list to hear about new dates, new programs, and founding-cohort places
            before they&apos;re announced publicly.
          </p>
        </div>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <CourseAgendaForm />
        </div>
      </section>

      {/* IN-HOUSE CROSS-LINK */}
      <section style={{ padding: "70px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, margin: "0 0 14px" }}>
          Want this for your whole team?
        </h2>
        <p style={{ fontSize: 15.5, color: "var(--color-muted)", margin: "0 0 26px" }}>
          Any course here can be delivered in-house and adapted to your organization.
        </p>
        <Link href="/in-house-training" className="btn btn-primary" style={{ padding: "15px 32px", fontSize: 15 }}>
          Explore In-House Training
        </Link>
      </section>

      <Footer />
    </div>
  );
}
