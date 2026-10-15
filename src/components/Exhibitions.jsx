
import "./Exhibitions.css";

const exhibitionVideo = "/exhibitions/exhibition-showcase.mp4";

const milestones = [
  {
    number: "01",
    title: "THE BEGINNING",
    text: "Our first exhibition marked the beginning of the F&A journey, bringing our jewellery closer to our customers.",
  },
  {
    number: "02",
    title: "ACROSS DUBAI",
    text: "Every showcase has created new connections, beautiful memories and opportunities to share our collections.",
  },
  {
    number: "03",
    title: "THE JOURNEY CONTINUES",
    text: "Each exhibition is another chapter in our story of timeless elegance and meaningful experiences.",
  },
];

const Exhibitions = () => {
  return (
    <section className="fa-exhibitions" id="exhibitions">
      <div className="fa-exhibitions-container">

        {/* COMPACT INTRO */}
        <header className="fa-exhibitions-intro">
          <div className="fa-exhibitions-kicker">
            <span className="fa-line" />
            F&A COLLECTIVE
          </div>

          <div className="fa-exhibitions-heading">
            <h2>
              Our Exhibitions,
              <br />
              <em>Our Journey.</em>
            </h2>
          </div>

          <p className="fa-intro-description">
            A glimpse into the exhibitions, beautiful encounters and
            special moments that bring the F&A story to life.
          </p>
        </header>

        {/* VIDEO + IMAGE PLACEHOLDER */}
        <div className="fa-exhibition-showcase">
          <div className="fa-section-label">
            <span>EXHIBITION MOMENTS</span>
          </div>

          <div className="fa-showcase-grid">

            {/* EXISTING VIDEO */}
            <div className="fa-video-column">
              <div className="fa-video-wrapper">
                <video
                  className="fa-exhibitions-video"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="F&A exhibition showcase"
                >
                  <source
                    src={exhibitionVideo}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <p className="fa-media-caption">
                Moments from our exhibitions and showcases across Dubai.
              </p>
            </div>

            {/* IMAGE PLACEHOLDER: REPLACE LATER */}
            <div className="fa-image-column">
              <img
                className="fa-exhibition-photo"
                src="/exhibitions/exhibition-photo.jpg"
                alt="F&A exhibition showcase"
              />

              <p className="fa-media-caption">
                The people, details and experiences behind F&A.
              </p>
            </div>

          </div>
        </div>

        {/* COMPACT STORY */}
        <div className="fa-exhibition-story">
          <div className="fa-story-heading">
            <span className="fa-story-kicker">OUR STORY · 01</span>

            <h3>
              More than a showcase.
              <br />
              <em>A journey of connection.</em>
            </h3>
          </div>

          <div className="fa-story-content">
            <p>
              From our first exhibition to showcases across Dubai,
              every event has given us the opportunity to meet customers
              in person, share our collections and celebrate the beauty
              of jewellery together.
            </p>

            <p>
              Every conversation and every memorable moment continues
              to shape the F&A story.
            </p>
          </div>
        </div>

        {/* COMPACT MILESTONES */}
        <div className="fa-exhibition-milestones">
          <div className="fa-milestones-heading">
            <span>THE F&A JOURNEY</span>
            <h3>
              Every showcase,
              <br />
              <em>a beautiful memory.</em>
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
                  <span className="fa-milestone-dot" />
                </div>

                <h4>{milestone.title}</h4>
                <p>{milestone.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* COMBINED CLOSING + CTA */}
        <div className="fa-exhibitions-cta">
          <div className="fa-cta-content">
            <span>WITH LOVE FROM F&A</span>

            <h3>
              More than jewellery.
              <br />
              <em>Moments to remember.</em>
            </h3>

            <p>
              Discover timeless elegance, meaningful craftsmanship
              and jewellery created to become part of your story.
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