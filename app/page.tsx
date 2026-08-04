import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import CourseAgendaForm from "@/components/CourseAgendaForm";
import { COURSES } from "@/lib/courses";

const PILLARS = [
  {
    eyebrow: "Learn",
    title: "Short courses and live masterclasses.",
    body: "Short online courses and live masterclasses for professionals who want practical knowledge, insight and confidence.",
    href: "/courses",
    cta: "Explore Courses",
    background: "var(--color-navy)",
    text: "#c3d2e4",
    ctaColor: "var(--color-navy)",
  },
  {
    eyebrow: "Train Your Organization",
    title: "In-house training, built for your team.",
    body: "In-house courses, workshops and customized learning programs for teams and professional organizations.",
    href: "/in-house-training",
    cta: "Book an In-House Training",
    background: "var(--color-teal)",
    text: "#dbf0ea",
    ctaColor: "var(--color-teal-dark)",
  },
  {
    eyebrow: "Experience",
    title: "Ideas brought to life, in public.",
    body: "Artistic performances, lectures, poetry, music and storytelling that bring ideas and human experience to life.",
    href: "/performances",
    cta: "Performances & Speaking",
    background: "var(--color-ink)",
    text: "#c9c4b6",
    ctaColor: "var(--color-ink)",
  },
];

const CREDENTIALS = [
  "PhD, Health Sciences",
  "Published Author",
  "Featured on TV",
  "Supported by SIKI Foundation",
];

export default function Home() {
  const featured = COURSES.slice(0, 3);

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: "110px 24px 90px", position: "relative", textAlign: "center" }}>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "#2f8f7e1a",
            zIndex: 0,
            animation: "floatSlow 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 60,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "#c65a3518",
            zIndex: 0,
          }}
        />
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            animation: "fadeUp .7s ease-out both",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 6vw, 66px)",
              lineHeight: 1.1,
              fontWeight: 700,
              margin: "0 0 26px",
              letterSpacing: "-0.02em",
            }}
          >
            Ideas that move people and systems.
          </h1>
          <p
            style={{
              fontSize: 18.5,
              lineHeight: 1.6,
              color: "var(--color-muted)",
              maxWidth: 620,
              margin: "0 auto 40px",
            }}
          >
            Short courses, professional training, public speaking and artistic performance by{" "}
            Dr. Jayburtt Dijkhoff.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/courses" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
              Explore Courses
            </Link>
            <Link href="/in-house-training" className="btn btn-secondary" style={{ padding: "16px 32px", fontSize: 15 }}>
              Book an In-House Training
            </Link>
            <Link href="/performances" className="btn btn-secondary" style={{ padding: "16px 32px", fontSize: 15 }}>
              Performances &amp; Speaking
            </Link>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section style={{ background: "var(--color-navy)", padding: "30px 24px" }}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}
        >
          {CREDENTIALS.map((item, i) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {i > 0 && <div style={{ width: 1, height: 16, background: "#2c4a75" }} />}
              <div style={{ fontSize: 12.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9fb2ca" }}>
                {item}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            How I Work
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700 }}>
            Teaching at scale. Training in depth. Art in public.
          </h2>
        </div>
        <div
          className="container grid-3 reveal reveal-stagger"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}
        >
          {PILLARS.map((p) => (
            <SpotlightCard
              key={p.eyebrow}
              className="talk-card"
              style={{
                background: p.background,
                borderRadius: 28,
                padding: 40,
                color: "white",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "#ffffffb0",
                  marginBottom: 14,
                }}
              >
                {p.eyebrow}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 23, fontWeight: 700, margin: "0 0 14px", lineHeight: 1.25 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: p.text, margin: "0 0 28px", flexGrow: 1 }}>
                {p.body}
              </p>
              <Link
                href={p.href}
                className="btn btn-white"
                style={{ padding: "13px 24px", color: p.ctaColor, fontSize: 14.5, alignSelf: "flex-start" }}
              >
                {p.cta} →
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="reveal" style={{ background: "var(--color-offwhite)", padding: "100px 24px" }}>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Learn
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700 }}>
              Practical knowledge you can use.
            </h2>
          </div>
          <Link href="/courses" className="text-link" style={{ fontSize: 15 }}>
            See All Courses →
          </Link>
        </div>
        <div
          className="container grid-3 reveal reveal-stagger"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
        >
          {featured.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="card-hover"
              style={{
                background: "var(--color-cream)",
                borderRadius: 20,
                padding: 30,
                display: "block",
              }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
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
                  {course.language}
                </span>
                {course.status === "coming-soon" && (
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
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, margin: "0 0 8px" }}>
                {course.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-muted)", margin: 0 }}>
                {course.summary.slice(0, 120)}…
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* IN-HOUSE TRAINING */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div
          className="container grid-2"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
        >
          <div className="img-zoom" style={{ borderRadius: 24 }}>
            <Image
              src="/images/portrait-speaking.png"
              alt="Jayburtt Dijkhoff teaching"
              width={640}
              height={688}
              style={{
                width: "100%",
                height: 420,
                objectFit: "contain",
                background: "var(--color-cream)",
                borderRadius: 24,
                boxShadow: "0 24px 48px #00000022",
              }}
            />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Train Your Organization
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, margin: "0 0 20px", lineHeight: 1.2 }}>
              Bring the training in-house.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-muted)", margin: "0 0 26px", maxWidth: 460 }}>
              Organizations can book an existing course or have a program adapted to their team —
              from a masterclass of a few hours to a half or full training day, or a series of
              sessions.
            </p>
            <Link href="/in-house-training" className="btn btn-primary" style={{ padding: "15px 30px", fontSize: 15 }}>
              Explore In-House Training
            </Link>
          </div>
        </div>
      </section>

      {/* PERFORMANCES */}
      <section className="reveal" style={{ background: "var(--color-teal)", padding: "100px 24px" }}>
        <div
          className="container grid-2"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#d9f3ec",
                marginBottom: 16,
              }}
            >
              Experience
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, margin: "0 0 20px", color: "white", lineHeight: 1.2 }}>
              Poetry, music, storytelling and lecture-performance.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#e3f5f0", margin: "0 0 28px", maxWidth: 460 }}>
              The artistic work is not a footnote to the teaching — it carries the same questions
              in a different voice, and belongs on a stage in front of people.
            </p>
            <Link
              href="/performances"
              className="btn btn-white"
              style={{ padding: "14px 30px", color: "var(--color-teal-dark)", fontSize: 15, boxShadow: "0 8px 18px #00000020" }}
            >
              Performances &amp; Speaking →
            </Link>
          </div>
          <div className="img-zoom" style={{ borderRadius: 24 }}>
            <Image
              src="/images/portrait-arts.png"
              alt="Jayburtt Dijkhoff"
              width={1024}
              height={1024}
              style={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                borderRadius: 24,
                boxShadow: "0 24px 48px #00000030",
              }}
            />
          </div>
        </div>
      </section>

      {/* COURSE AGENDA / FOUNDING COHORTS */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "90px 24px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            Course Agenda
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "white", margin: "0 0 16px" }}>
            Be first into the next cohort.
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#a8a49a", margin: "0 0 32px" }}>
            New courses open in small founding cohorts. Join the agenda list and you&apos;ll hear
            about new dates, new programs, and founding-cohort places before anyone else.
          </p>
        </div>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <CourseAgendaForm />
        </div>
      </section>

      {/* BOOKS & IDEAS */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div
          className="container grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "0.45fr 1fr",
            gap: 56,
            alignItems: "center",
            background: "var(--color-offwhite)",
            borderRadius: 28,
            padding: 48,
            boxShadow: "0 20px 50px #00000012",
          }}
        >
          <div className="img-zoom" style={{ borderRadius: 14 }}>
            <Image
              src="/images/book-cover.webp"
              alt="Derechonan di Pashent book cover"
              width={640}
              height={1024}
              style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 14, boxShadow: "0 20px 40px #00000022" }}
            />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Books &amp; Ideas
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, margin: "0 0 16px" }}>
              Written to be understood.
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--color-muted)", margin: "0 0 26px", maxWidth: 440 }}>
              Books, essays and reflections on rights, systems and what it means to be human
              inside them — written in clear language, for everyone.
            </p>
            <Link href="/books-and-ideas" className="text-link" style={{ fontSize: 15 }}>
              Read Books &amp; Ideas →
            </Link>
          </div>
        </div>
      </section>

      {/* ADVISORY — deliberately low on the page, by invitation */}
      <section className="reveal" style={{ background: "var(--color-cream)", padding: "70px 24px" }}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-faint)", marginBottom: 10 }}>
              By Invitation
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, margin: "0 0 10px" }}>
              Selective advisory and coaching
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--color-muted)", margin: 0 }}>
              A limited number of advisory and coaching engagements are taken on each year, at a
              premium rate and within a clearly defined scope.
            </p>
          </div>
          <Link href="/advisory" className="text-link" style={{ fontSize: 14.5, whiteSpace: "nowrap" }}>
            Enquire →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
