import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

const METHOD_STEPS = [
  {
    n: "01",
    color: "var(--color-accent)",
    title: "Research",
    body: "Rigorous, doctoral-level investigation into how systems actually work, and where they fail.",
  },
  {
    n: "02",
    color: "var(--color-teal)",
    title: "Educate",
    body: "Turning findings into talks, books, and programs that make complex systems usable by everyone.",
  },
  {
    n: "03",
    color: "var(--color-navy)",
    title: "Listen",
    body: "Every audience and client sharpens the method. Feedback is the fuel, not an afterthought.",
  },
  {
    n: "04",
    color: "var(--color-accent)",
    title: "Improve",
    body: "Systems, and the people inside them, get simpler, safer, and stronger with every cycle.",
  },
];

const OFFERINGS = [
  {
    title: "Keynotes & Workshops",
    body: "Live talks, panels, and hands-on master classes for teams and conferences.",
  },
  {
    title: "Online Programs",
    body: "Fully online, self-paced courses that bring the same rigor to any schedule.",
  },
  {
    title: "Team Subscriptions",
    body: "Ongoing access for organizations that want their teams current, year-round.",
  },
  {
    title: "One-on-One Consulting",
    body: "Direct, high-level advisory for institutions and Dutch healthcare providers.",
  },
  {
    title: "Books & Writing",
    body: "Published work on patient rights, with more on the way.",
  },
  {
    title: "Media & TV",
    body: "Featured commentary and his own television program, bringing these ideas to a wider audience.",
  },
];

const IMPACT_NUMBERS = [
  { value: "10+", color: "var(--color-accent)", label: "Years in Healthcare Systems" },
  { value: "3", color: "var(--color-teal)", label: "ABC Islands & the Netherlands" },
  { value: "1", color: "var(--color-navy)", label: "Published Book on Patient Rights" },
  { value: "PhD", color: "var(--color-accent)", label: "Health Sciences" },
];

const INSIGHTS = [
  {
    tag: "Health",
    tagBg: "#f2e0d2",
    tagColor: "#a1462a",
    title: "Low Risk Is Never Zero Risk: What Aruba Must Know About Hantavirus",
  },
  {
    tag: "Law",
    tagBg: "#dbeae6",
    tagColor: "#1a6b5c",
    title: "Governance Across the Kingdom: Where Dutch and Caribbean Rules Meet",
  },
  {
    tag: "Reflection",
    tagBg: "#dde5f0",
    tagColor: "#17325a",
    title: "The Elephant Was Never Pink. It Was Always White.",
  },
];

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--color-ink)",
        background: "var(--color-bg)",
      }}
    >
      <Header />

      {/* HERO */}
      <section style={{ padding: "110px 24px 100px", position: "relative", textAlign: "center" }}>
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
            maxWidth: 820,
            margin: "0 auto",
            animation: "fadeUp .7s ease-out both",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: 22,
            }}
          >
            Speaker · Author · High-Level Consultant
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 6vw, 66px)",
              lineHeight: 1.12,
              fontWeight: 700,
              margin: "0 0 26px",
              letterSpacing: "-0.02em",
            }}
          >
            No organization should manage risk alone.
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--color-muted)",
              maxWidth: 560,
              margin: "0 auto 38px",
            }}
          >
            I&apos;m Jayburtt Dijkhoff. After 13 years inside government and healthcare
            governance, I now guide and coach advisory and directive boards to take control of
            risk, before it takes control of them.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              marginBottom: 32,
              flexWrap: "wrap",
            }}
          >
            <Link href="/board-advisory" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
              Book a Board Session
            </Link>
            <Link href="/consulting" className="btn btn-secondary" style={{ padding: "16px 32px", fontSize: 15 }}>
              Explore Consulting
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, color: "var(--color-faint)", letterSpacing: "0.04em" }}>FOLLOW</span>
            <a href="#" className="text-link" style={{ fontSize: 13.5 }}>
              LinkedIn
            </a>
            <a href="#" className="text-link" style={{ fontSize: 13.5 }}>
              Instagram
            </a>
            <a href="#" className="text-link" style={{ fontSize: 13.5 }}>
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section style={{ background: "var(--color-navy)", padding: "30px 24px" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {["Featured on TV", "PhD, Health Sciences", "Published Author", "Supported by SIKI Foundation"].map(
            (item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                {i > 0 && <div style={{ width: 1, height: 16, background: "#2c4a75" }} />}
                <div
                  style={{
                    fontSize: 12.5,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#9fb2ca",
                  }}
                >
                  {item}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* SPEAKING */}
      <section
        style={{
          padding: "110px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          maxWidth: 1284,
          marginInline: "auto",
        }}
        className="grid-2 reveal"
      >
        <div className="img-zoom" style={{ borderRadius: 24 }}>
          <Image
            src="/images/portrait-speaking.png"
            alt="Jayburtt Dijkhoff"
            width={640}
            height={688}
            style={{
              width: "100%",
              height: 440,
              objectFit: "contain",
              objectPosition: "center",
              background: "var(--color-cream)",
              borderRadius: 24,
              boxShadow: "0 24px 48px #00000022",
            }}
          />
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            On Stage
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 38,
              fontWeight: 700,
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}
          >
            Talks that make complexity feel human.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-muted)", margin: "0 0 28px", maxWidth: 460 }}>
            From keynotes on healthcare governance to intimate reflections on dignity and rights,
            Jayburtt brings doctoral rigor and lived experience to every stage, across the ABC
            islands and the Netherlands.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 30 }}>
            {[
              { n: "01", bg: "var(--color-accent)", label: "The Human Side of Healthcare Systems" },
              { n: "02", bg: "var(--color-teal)", label: "Navigating Recognition Across the Kingdom" },
              { n: "03", bg: "var(--color-navy)", label: "Patient Rights, Reimagined" },
            ].map((item) => (
              <div
                key={item.n}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                  background: "var(--color-offwhite)",
                  borderRadius: 16,
                  padding: "16px 20px",
                  boxShadow: "0 6px 16px #00000010",
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: item.bg,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {item.n}
                </span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{item.label}</span>
              </div>
            ))}
          </div>
          <Link href="/speaking" className="text-link" style={{ fontSize: 15 }}>
            View Speaking Topics →
          </Link>
        </div>
      </section>

      {/* METHOD */}
      <section style={{ background: "var(--color-offwhite)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              The Method
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700 }}>
              Research. Educate. Improve.
            </h2>
          </div>
          <div
            className="grid-4 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {METHOD_STEPS.map((step) => (
              <div
                key={step.n}
                className="method-card"
                style={{ background: "var(--color-cream)", borderRadius: 20, padding: 28 }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: step.color, marginBottom: 12 }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 16.5, fontWeight: 600, margin: "0 0 10px" }}>{step.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-muted)" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Find Your Path
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700 }}>
            Built for individuals and institutions alike.
          </h2>
        </div>
        <div className="container grid-2 reveal reveal-stagger" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div style={{ background: "var(--color-navy)", borderRadius: 28, padding: 44, color: "white" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, margin: "0 0 16px" }}>
              For Individuals
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#c3d2e4", margin: "0 0 26px" }}>
              Understand your rights, learn from the books, and follow the work through talks and
              writing that make complex systems make sense.
            </p>
            <Link
              href="/books"
              className="btn btn-white"
              style={{ padding: "13px 26px", color: "var(--color-navy)", fontSize: 14.5 }}
            >
              Start With the Books →
            </Link>
          </div>
          <div style={{ background: "var(--color-teal)", borderRadius: 28, padding: 44, color: "white" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, margin: "0 0 16px" }}>
              For Organizations
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#dbf0ea", margin: "0 0 26px" }}>
              Bring Jayburtt in for keynotes, master classes, one-on-one consulting, or an ongoing
              subscription to keep your teams current.
            </p>
            <Link
              href="/consulting"
              className="btn btn-white"
              style={{ padding: "13px 26px", color: "var(--color-teal-dark)", fontSize: 14.5 }}
            >
              Explore Consulting →
            </Link>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section style={{ background: "var(--color-cream)", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Ways to Work Together
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700 }}>
            From a single talk to an ongoing partnership.
          </h2>
        </div>
        <div
          className="container grid-3 reveal reveal-stagger"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
        >
          {OFFERINGS.map((item) => (
            <div
              key={item.title}
              className="offering-card"
              style={{
                background: "var(--color-offwhite)",
                borderRadius: 20,
                padding: 32,
                boxShadow: "0 12px 28px #00000010",
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px" }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-muted)" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section style={{ background: "var(--color-offwhite)", padding: "70px 24px" }}>
        <div
          className="container grid-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 26,
            textAlign: "center",
          }}
        >
          {IMPACT_NUMBERS.map((item) => (
            <div key={item.label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 42,
                  fontWeight: 700,
                  color: item.color,
                  marginBottom: 8,
                }}
              >
                {item.value}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--color-muted)" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PULL QUOTE */}
      <section
        className="reveal"
        style={{ background: "var(--color-navy)", padding: "100px 24px", textAlign: "center" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.6, color: "#3f5c86", marginBottom: 10 }}>
            &ldquo;
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 30,
              lineHeight: 1.5,
              color: "white",
              margin: "0 0 22px",
            }}
          >
            When people understand the systems around them, they can make better decisions,
            resolve their issues, and reach their goals.
          </p>
          <div style={{ width: 40, height: 2, background: "var(--color-accent)", margin: "0 auto 14px" }} />
          <div style={{ fontSize: 14, color: "#9fb2ca" }}>Jayburtt Dijkhoff, PhD</div>
        </div>
      </section>

      {/* BOOKS */}
      <section style={{ padding: "110px 24px" }}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Books &amp; Writing
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700 }}>
              Written to be understood.
            </h2>
          </div>
          <Link href="/books" className="text-link" style={{ fontSize: 15 }}>
            See All Books →
          </Link>
        </div>
        <div
          className="container grid-2 reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "0.5fr 1fr",
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
              style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 14, boxShadow: "0 20px 40px #00000022" }}
            />
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 27, fontWeight: 600, margin: "0 0 12px" }}>
              Derechonan di Pashent
            </h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--color-muted)", margin: "0 0 26px", maxWidth: 440 }}>
              A clear-language guide to patient rights in Aruba, written to help every reader
              understand and command their place in the healthcare system.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600 }}>$20.00</div>
              <Link
                href="/books"
                className="btn btn-primary"
                style={{ padding: "14px 30px", fontSize: 15, boxShadow: "0 8px 18px #c65a3540" }}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ARTS TEASER */}
      <section style={{ background: "var(--color-teal)", padding: "100px 24px" }}>
        <div
          className="container grid-2 reveal"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "-16px 16px 16px -16px",
                border: "2px solid #ffffff40",
                borderRadius: 24,
                zIndex: 0,
              }}
            />
            <div className="img-zoom" style={{ position: "relative", zIndex: 1, borderRadius: 24 }}>
              <Image
                src="/images/portrait-arts.png"
                alt="Jayburtt Dijkhoff"
                width={1024}
                height={1024}
                style={{
                  width: "100%",
                  height: 380,
                  objectFit: "contain",
                  objectPosition: "center",
                  background: "var(--color-teal-dark)",
                  borderRadius: 24,
                  boxShadow: "0 24px 48px #00000030",
                }}
              />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d9f3ec", marginBottom: 16 }}>
              Beyond the Systems
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, margin: "0 0 20px", color: "white", lineHeight: 1.2 }}>
              Poetry, music, and other reflections.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#e3f5f0", margin: "0 0 28px", maxWidth: 440 }}>
              Jayburtt&apos;s creative work, poetry now, music next, explores the same questions as
              his professional life, in a different voice.
            </p>
            <Link
              href="/arts"
              className="btn btn-white"
              style={{ padding: "14px 30px", color: "var(--color-teal-dark)", fontSize: 15, boxShadow: "0 8px 18px #00000020" }}
            >
              Explore the Arts →
            </Link>
          </div>
        </div>
      </section>

      {/* CONSULTING */}
      <section style={{ background: "var(--color-cream)", padding: "100px 24px" }}>
        <div
          className="container grid-2 reveal"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              For Organizations
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, margin: "0 0 20px", lineHeight: 1.2 }}>
              High-level consulting, one-on-one.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-muted)", margin: "0 0 20px", maxWidth: 460 }}>
              Direct advisory for healthcare institutions and Dutch providers on governance,
              recognition pathways, and quality systems, plus ongoing team subscriptions. No
              intermediaries, just Jayburtt.
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-faint)", margin: "0 0 28px", maxWidth: 460 }}>
              Jayburtt is not a lawyer. Advisory letters and guidance support your case but are not
              legal representation.
            </p>
            <Link href="/consulting" className="btn btn-dark" style={{ padding: "14px 30px", fontSize: 15 }}>
              Explore Consulting
            </Link>
          </div>
          <div style={{ background: "var(--color-offwhite)", borderRadius: 24, padding: 40, boxShadow: "0 16px 36px #00000012" }}>
            <div style={{ fontSize: 13, color: "var(--color-faint)", marginBottom: 8 }}>Most Requested</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, margin: "0 0 14px" }}>
              Recognition Support: Beroepswaardering
            </h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--color-muted)", margin: "0 0 20px" }}>
              AruBIG &amp; KIG pathway advisory for healthcare professionals.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid var(--color-cream-line)",
                paddingTop: 20,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600 }}>US$ 675</div>
              <Link href="/contact" className="text-link" style={{ fontSize: 14 }}>
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section style={{ padding: "100px 24px" }}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 44,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              The Blog
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700 }}>
              Health. Law. Reflection.
            </h2>
          </div>
          <Link href="/insights" className="text-link" style={{ fontSize: 15 }}>
            Read All Posts →
          </Link>
        </div>
        <div
          className="container grid-3 reveal reveal-stagger"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
        >
          {INSIGHTS.map((post) => (
            <article
              key={post.title}
              className="card-hover"
              style={{
                background: "var(--color-offwhite)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 12px 28px #00000012",
              }}
            >
              <div className="article-thumb" style={{ width: "100%", height: 180 }}>
                Article image
              </div>
              <div style={{ padding: 24 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: post.tagBg,
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    color: post.tagColor,
                    marginBottom: 12,
                  }}
                >
                  {post.tag}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>
                  {post.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            The Mission
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, margin: "0 0 20px", color: "white", lineHeight: 1.3 }}>
            Stronger healthcare systems for the ABC islands.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#c9c4b6" }}>
            Part of Jayburtt&apos;s work is personal: pushing for accountability, oversight, and
            better outcomes in healthcare across Aruba, Bonaire, and Curaçao, so patients are
            protected and practitioners are supported.
          </p>
        </div>
      </section>

      {/* FOLLOW / NEWSLETTER */}
      <section style={{ background: "var(--color-ink)", padding: "90px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "white", margin: "0 0 14px" }}>
          Follow the Journey
        </h2>
        <p style={{ fontSize: 15.5, color: "#a8a49a", margin: "0 0 34px" }}>
          New talks, books, and reflections, straight to your inbox.
        </p>
        <NewsletterForm />
      </section>

      <Footer />
    </div>
  );
}
