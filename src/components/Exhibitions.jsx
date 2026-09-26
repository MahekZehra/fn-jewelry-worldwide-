import { useState } from "react";
import "./Exhibitions.css";

const exhibitionImages = [
  {
    src: "/exhibitions/exhibition-1.jpg",
    number: "01",
    caption: "A special moment from our first-ever exhibition.",
    position: "left",
  },
  {
    src: "/exhibitions/exhibition-2.jpg",
    number: "02",
    caption: "Jewellery, details and memorable moments.",
    position: "right",
  },
  {
    src: "/exhibitions/exhibition-3.jpg",
    number: "03",
    caption: "Where craftsmanship meets celebration.",
    position: "wide",
  },
  {
    src: "/exhibitions/exhibition-4.jpg",
    number: "04",
    caption: "Curated pieces, thoughtfully presented.",
    position: "left",
  },
  {
    src: "/exhibitions/exhibition-5.jpg",
    number: "05",
    caption: "A closer look at our collection.",
    position: "right",
  },
  {
    src: "/exhibitions/exhibition-6.jpg",
    number: "06",
    caption: "Moments from our jewellery showcases.",
    position: "wide",
  },
  {
    src: "/exhibitions/exhibition-7.jpg",
    number: "07",
    caption: "A glimpse into our exhibition journey.",
    position: "final",
  },
];

function Exhibitions() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section className="fa-exhibitions" id="exhibitions">
        <div className="fa-exhibitions-container">

          {/* =================================================
              EDITORIAL INTRO
          ================================================= */}

          <div className="fa-exhibitions-intro">

            <div className="fa-exhibitions-intro-left">

              <span className="fa-exhibitions-kicker">
                F&amp;A COLLECTIVE
              </span>

              <h2>
                Our
                <br />
                <em>Exhibition Journey</em>
              </h2>

            </div>

            <div className="fa-exhibitions-intro-right">

              <span className="fa-exhibitions-flower">
                ✽
              </span>

              <p>
                From our very first exhibition to the many professional
                exhibitions that followed, every event has been an
                important milestone in our journey. These experiences
                have allowed us to showcase our craftsmanship, connect
                with our customers, and bring our collections to life.
              </p>

              <div className="fa-exhibitions-line">
                <span>EXHIBITIONS</span>
                <span>SHOWCASES</span>
                <span>MILESTONES</span>
              </div>

            </div>

          </div>


          {/* =================================================
              FEATURED IMAGE — FIRST EVER EXHIBITION
          ================================================= */}

          <div
            className="fa-exhibition-feature"
            onClick={() => openLightbox(exhibitionImages[0])}
          >

            <img
              src={exhibitionImages[0].src}
              alt="F&A Collective first-ever exhibition"
            />

            <div className="fa-feature-overlay">

              <div className="fa-feature-number">
                01 / 07
              </div>

              <div className="fa-feature-caption">

                <span>
                  OUR FIRST-EVER EXHIBITION
                </span>

                <strong>
                  Where our exhibition
                  <br />
                  journey began.
                </strong>

              </div>

              <span className="fa-view-moment">
                VIEW MOMENT ↗
              </span>

            </div>

          </div>


          {/* =================================================
              EDITORIAL STORY
          ================================================= */}

          <div className="fa-editorial-row">

            <div className="fa-editorial-image small-image">

              <img
                src={exhibitionImages[1].src}
                alt="F&A Collective exhibition"
                onClick={() => openLightbox(exhibitionImages[1])}
              />

              <span className="fa-image-number">
                02
              </span>

            </div>


            <div className="fa-editorial-copy">

              <span className="fa-copy-number">
                02 — THE BEGINNING
              </span>

              <h3>
                Where our
                <br />
                <em>journey began.</em>
              </h3>

              <p>
                Our first-ever exhibition marked a special milestone
                for F&amp;A Collective. It was the beginning of our
                journey of bringing our jewellery closer to our
                customers, showcasing our collections, and creating
                memorable experiences through every exhibition.
              </p>

              <div className="fa-copy-decoration">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </div>

            </div>

          </div>


          {/* =================================================
              WIDE IMAGE
          ================================================= */}

          <div
            className="fa-wide-image"
            onClick={() => openLightbox(exhibitionImages[2])}
          >

            <img
              src={exhibitionImages[2].src}
              alt="F&A Collective jewellery showcase"
            />

            <div className="fa-wide-label">
              <span>03</span>
              <span>THE DETAILS</span>
            </div>

          </div>


          {/* =================================================
              SECOND EDITORIAL ROW
          ================================================= */}

          <div className="fa-editorial-row reverse">

            <div className="fa-editorial-copy">

              <span className="fa-copy-number">
                04 — CURATED MOMENTS
              </span>

              <h3>
                Crafted for
                <br />
                <em>the moment.</em>
              </h3>

              <p>
                From intimate displays to beautifully arranged
                showcases, our exhibitions reflect the same
                attention to detail that defines F&amp;A Collective.
                Every presentation is thoughtfully created to
                celebrate our jewellery and the people who wear it.
              </p>

              <div className="fa-quote">
                “Jewellery is not simply worn.
                <br />
                It becomes part of the moment.”
              </div>

            </div>


            <div className="fa-editorial-image">

              <img
                src={exhibitionImages[3].src}
                alt="F&A Collective exhibition display"
                onClick={() => openLightbox(exhibitionImages[3])}
              />

              <span className="fa-image-number">
                04
              </span>

            </div>

          </div>


          {/* =================================================
              TWO IMAGE MOMENT
          ================================================= */}

          <div className="fa-dual-images">

            <div
              className="fa-dual-image dual-large"
              onClick={() => openLightbox(exhibitionImages[4])}
            >

              <img
                src={exhibitionImages[4].src}
                alt="F&A Collective jewellery collection"
              />

              <span>
                05
              </span>

            </div>


            <div
              className="fa-dual-image dual-small"
              onClick={() => openLightbox(exhibitionImages[5])}
            >

              <img
                src={exhibitionImages[5].src}
                alt="F&A Collective jewellery exhibition"
              />

              <span>
                06
              </span>

            </div>

          </div>


          {/* =================================================
              FINAL IMAGE
          ================================================= */}

          <div
            className="fa-final-image"
            onClick={() => openLightbox(exhibitionImages[6])}
          >

            <img
              src={exhibitionImages[6].src}
              alt="F&A Collective exhibition journey"
            />

            <div className="fa-final-overlay">

              <span>
                07 / 07
              </span>

              <h3>
                A glimpse
                <br />
                <em>into our journey.</em>
              </h3>

            </div>

          </div>


          {/* =================================================
              INSTAGRAM CTA
          ================================================= */}

          <div className="fa-exhibitions-cta">

            <div className="fa-cta-symbol">
              ✽
            </div>

            <span className="fa-cta-kicker">
              CONTINUE THE STORY
            </span>

            <h3>
              More moments,
              <br />
              <em>on Instagram.</em>
            </h3>

            <p>
              Discover new collections, exhibition moments
              and behind-the-scenes glimpses from F&amp;A Collective.
            </p>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="fa-instagram-button"
            >
              Follow F&amp;A on Instagram
              <span>↗</span>
            </a>

          </div>

        </div>
      </section>


      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      {selectedImage && (
        <div
          className="fa-lightbox"
          onClick={closeLightbox}
        >

          <button
            className="fa-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.caption}
            onClick={(event) => event.stopPropagation()}
          />

          <div className="fa-lightbox-caption">
            {selectedImage.number} / 07
          </div>

        </div>
      )}

    </>
  );
}

export default Exhibitions;