import "./Exhibitions.css";

const exhibitionVideo = "/exhibitions/exhibition-showcase.mp4";

const milestones = [
  {
    number: "01",
    title: "THE BEGINNING",
    text: "Our first exhibition marked the moment our jewellery journey stepped beyond the collection and into a shared experience."
  },
  {
    number: "02",
    title: "ACROSS DUBAI",
    text: "With every new showcase, we have continued meeting customers, sharing our collections and building beautiful connections across Dubai."
  },
  {
    number: "03",
    title: "THE JOURNEY CONTINUES",
    text: "Every exhibition becomes another memory — and another opportunity to bring F&A closer to the women we create for."
  }
];

const Exhibitions = () => {
  return (
    <section className="fa-exhibitions" id="exhibitions">
      <div className="fa-exhibitions-container">

        {/* =====================================================
            INTRO
        ===================================================== */}
        <div className="fa-exhibitions-intro">

          <div className="fa-exhibitions-kicker">
            <span className="fa-line"></span>
            F&A COLLECTIVE
          </div>

          <div className="fa-exhibitions-heading">
            <h2>
              Our Exhibitions,
              <br />
              <em>Our Journey.</em>
            </h2>
          </div>

          <div className="fa-exhibitions-intro-copy">
            <p>
              From our very first exhibition to the many showcases that
              followed across Dubai, every exhibition has been a chapter
              in the F&A story.
            </p>

            <p>
              These moments have allowed us to bring our jewellery closer
              to women, share the details behind each collection, and create
              meaningful connections beyond the boutique.
            </p>
          </div>

        </div>


        {/* =====================================================
            VIDEO
        ===================================================== */}
        <div className="fa-exhibition-video-section">

          <div className="fa-section-label">
            <span>EXHIBITION MOMENTS</span>
          </div>

          <div className="fa-video-wrapper">

            <video
              className="fa-exhibitions-video"
              controls
              playsInline
              preload="metadata"
              aria-label="F&A exhibition showcase"
            >
              <source src={exhibitionVideo} type="video/mp4" />

              Your browser does not support the video tag.
            </video>

          </div>

          <p className="fa-video-caption">
            A glimpse into the exhibitions, showcases and beautiful moments
            that have shaped the F&A journey.
          </p>

        </div>


        {/* =====================================================
            STORY
        ===================================================== */}
        <div className="fa-exhibition-story">

          <div className="fa-story-number">
            <span>THE STORY</span>
            <strong>01</strong>
          </div>

          <div className="fa-story-content">

            <h3>
              From our first exhibition
              <br />
              <em>to every showcase after.</em>
            </h3>

            <p>
              Our first exhibition was more than a showcase — it was the
              beginning of a journey. Meeting customers in person, seeing
              pieces come alive, and sharing the F&A experience gave us
              a new way to tell our story.
            </p>

            <p>
              Since then, we have had the joy of taking part in exhibitions
              and showcases across Dubai. Each one has been different, but
              the feeling remains the same: beautiful jewellery, genuine
              conversations, and women finding pieces that feel like
              their own.
            </p>

            <p>
              The video above brings together a few of those moments —
              from early beginnings to later showcases — as a little
              glimpse into the journey behind F&A.
            </p>

          </div>

        </div>


        {/* =====================================================
            MILESTONES
        ===================================================== */}
        <div className="fa-exhibition-milestones">

          <div className="fa-milestones-heading">
            <span>OUR JOURNEY</span>

            <h3>
              Every exhibition
              <br />
              <em>becomes a memory.</em>
            </h3>
          </div>


          <div className="fa-milestones-grid">

            {milestones.map((milestone) => (
              <article
                className="fa-milestone-card"
                key={milestone.number}
              >

                <div className="fa-milestone-top">
                  <span>{milestone.number}</span>
                  <span className="fa-milestone-dot"></span>
                </div>

                <h4>{milestone.title}</h4>

                <p>{milestone.text}</p>

              </article>
            ))}

          </div>

        </div>


        {/* =====================================================
            CLOSING STATEMENT
        ===================================================== */}
        <div className="fa-exhibition-closing">

          <div className="fa-closing-decoration">
            ✦
          </div>

          <span className="fa-closing-kicker">
            WITH LOVE FROM F&A
          </span>

          <h3>
            More than jewellery.
            <br />
            <em>Moments to remember.</em>
          </h3>

          <p>
            Every exhibition gives us another opportunity to share what
            F&A represents — timeless elegance, meaningful craftsmanship,
            and jewellery created to become part of a woman's story.
          </p>

        </div>


        {/* =====================================================
            CTA
        ===================================================== */}
        <div className="fa-exhibitions-cta">

          <div className="fa-cta-content">

            <span>DISCOVER F&A</span>

            <h3>
              Come experience
              <br />
              <em>the collection.</em>
            </h3>

            <p>
              Explore our latest jewellery collections and stay close
              to the moments, stories and showcases that are still to come.
            </p>

          </div>


          <div className="fa-cta-actions">

            <a
              href="/collections"
              className="fa-cta-button fa-cta-primary"
            >
              Explore Collection
              <span>↗</span>
            </a>

            <a
              href="#"
              className="fa-cta-button fa-cta-secondary"
            >
              Follow F&A
              <span>↗</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Exhibitions;