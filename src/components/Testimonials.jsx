import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    image: "/reviews/review-1.jpg",
    rating: 5,
    text: "Quality bohat bohat kamal ki aur bohat affordable price mein. Bohat cooperative seller hain.",
    name: "Happy Customer",
    label: "Verified Customer",
  },
  {
    id: 2,
    image: "/reviews/review-2.jpg",
    rating: 5,
    text: "I am absolutely in love with this jewellery set! The craftsmanship is stunning, with every detail beautifully designed. Elegant, classy, and beautifully made.",
    name: "Happy Customer",
    label: "Verified Customer",
  },
  {
    id: 3,
    image: "/reviews/review-3.jpg",
    rating: 5,
    text: "Beautiful jewellery, excellent quality and a lovely overall experience. The piece looked even more beautiful in person.",
    name: "Happy Customer",
    label: "Verified Customer",
  },
  {
    id: 4,
    image: "/reviews/review-4.jpg",
    rating: 5,
    text: "Absolutely loved my jewellery! Beautiful finishing, elegant design and wonderful quality. Highly satisfied with my purchase.",
    name: "Happy Customer",
    label: "Verified Customer",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">

        {/* SECTION HEADER */}
        <div className="testimonials-heading">
          <span className="testimonials-eyebrow">
            CUSTOMER LOVE
          </span>

          <h2>
            Loved by Our Customers
          </h2>

          <p>
            Real experiences from customers who chose F&amp;A Collective
            to add a little more elegance to their look.
          </p>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="testimonials-grid">

          {testimonials.map((testimonial) => (
            <article
              className="testimonial-card"
              key={testimonial.id}
            >

              {/* CUSTOMER SCREENSHOT */}
              <div className="testimonial-image-wrapper">
                <img
                  src={testimonial.image}
                  alt={`Customer review ${testimonial.id}`}
                  className="testimonial-image"
                />

                <div className="testimonial-image-badge">
                  CUSTOMER LOVE
                </div>
              </div>

              {/* REVIEW CONTENT */}
              <div className="testimonial-content">

                <div className="testimonial-stars">
                  {"★".repeat(testimonial.rating)}
                </div>

                <p className="testimonial-text">
                  “{testimonial.text}”
                </p>

                <div className="testimonial-author">
                  <div className="testimonial-author-icon">
                    ♡
                  </div>

                  <div>
                    <h3>{testimonial.name}</h3>
                    <span>{testimonial.label}</span>
                  </div>
                </div>

              </div>

            </article>
          ))}

        </div>

        {/* BOTTOM BRAND LINE */}
        <div className="testimonials-footer">
          <span>F&amp;A COLLECTIVE</span>
          <i></i>
          <span>FASHION &amp; JEWELLERY</span>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;