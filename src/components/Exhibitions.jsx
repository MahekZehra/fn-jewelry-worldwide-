import { useState } from "react";
import "./Exhibitions.css";

const exhibitionImages = [
  {
    src: "/exhibitions/exhibition-1.jpg",
    number: "01",
    caption: "A curated glimpse into the F&A world.",
    position: "left",
  },
  {
    src: "/exhibitions/exhibition-2.jpg",
    number: "02",
    caption: "Jewellery, details and moments.",
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
    caption: "A closer look at the collection.",
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
    caption: "Beyond the collection.",
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
                The F&amp;A
                <br />
                <em>Exhibition Journal</em>
              </h2>

            </div>


            <div className="fa-exhibitions-intro-right">

              <span className="fa-exhibitions-flower">
                ✽
              </span>

              <p>
                A glimpse into the moments where our jewellery
                leaves the collection and becomes part of a
                beautiful experience.
              </p>

              <div className="fa-exhibitions-line">
                <span>EXHIBITIONS</span>
                <span>SHOWCASES</span>
                <span>MOMENTS</span>
              </div>

            </div>

          </div>


          {/* =================================================
              FEATURED IMAGE
          ================================================= */}

          <div
            className="fa-exhibition-feature"
            onClick={() => openLightbox(exhibitionImages[0])}
          >

            <img
              src={exhibitionImages[0].src}
              alt="F&A Collective jewellery exhibition"
            />

            <div className="fa-feature-overlay">
              <div className="fa-feature-number">
                01 / 07
              </div>

              <div className="fa-feature-caption">
                <span>THE COLLECTION</span>
                <strong>
                  A world of jewellery,
                  <br />
                  beautifully brought together.
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
                02 — THE EXPERIENCE
              </span>

              <h3>
                Beyond the
                <br />
                <em>collection.</em>
              </h3>

              <p>
                Every exhibition is an opportunity to bring
                our jewellery closer to the people who love it.
                From intricate details to statement pieces,
                each showcase is carefully curated to feel
                personal, elegant and memorable.
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

              <span>05</span>
            </div>


            <div
              className="fa-dual-image dual-small"
              onClick={() => openLightbox(exhibitionImages[5])}
            >
              <img
                src={exhibitionImages[5].src}
                alt="F&A Collective jewellery exhibition"
              />

              <span>06</span>
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
              alt="F&A Collective exhibition moment"
            />

            <div className="fa-final-overlay">

              <span>
                07 / 07
              </span>

              <h3>
                A glimpse
                <br />
                <em>into F&amp;A.</em>
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