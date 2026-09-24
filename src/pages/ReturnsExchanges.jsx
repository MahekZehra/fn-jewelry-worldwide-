import React, { useState } from "react";
import "./ReturnsExchanges.css";

const faqItems = [
  {
    question: "How many days do I have to request a return or exchange?",
    answer:
      "Eligible return or exchange requests can be submitted within 7 days of delivery.",
  },
  {
    question: "Can I return jewellery after wearing it?",
    answer:
      "Jewellery must be returned in its original, unused condition. Earrings and other jewellery items that have been worn are generally not eligible for return or exchange, except where the item is defective, damaged upon delivery, or incorrectly supplied.",
  },
  {
    question: "What if I receive a damaged or incorrect item?",
    answer:
      "Please contact us within 48 hours of delivery and provide clear photographs and/or an unboxing video if requested. Our team will review the case and provide an appropriate resolution.",
  },
  {
    question: "Can I exchange a garment?",
    answer:
      "Eligible garments may be exchanged within 7 days of delivery, provided they are unworn, unwashed, unaltered, free from stains or marks, and returned with their original tags and packaging.",
  },
  {
    question: "Do you accept international returns?",
    answer:
      "Yes. F&A Collective ships worldwide. International returns may involve additional shipping, customs or other charges depending on the destination and circumstances of the return.",
  },
  {
    question: "Who pays the return shipping cost?",
    answer:
      "For customer-requested exchanges, such as size, preference or change of mind, return and re-shipping costs may be the customer's responsibility. If an item is damaged, defective or incorrectly supplied, the case will be reviewed separately.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Please contact us as soon as possible after placing your order. We will make reasonable efforts to accommodate cancellation requests before an order is processed or dispatched.",
  },
];

function ReturnsExchanges() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="returns-page">

      {/* HERO */}
      <section className="returns-hero">
        <div className="returns-hero-content">
          <span className="returns-eyebrow">F&A COLLECTIVE</span>

          <h1>
            Returns
            <span>&amp; Exchanges</span>
          </h1>

          <p>
            Because every F&amp;A piece should feel just right.
          </p>

          <div className="returns-hero-line"></div>
        </div>
      </section>

      {/* INTRO */}
      <section className="returns-intro">
        <div className="returns-intro-number">01</div>

        <div className="returns-intro-content">
          <span className="returns-section-label">OUR PROMISE</span>

          <h2>
            Made to be loved.
            <br />
            Chosen with confidence.
          </h2>

          <p>
            At F&amp;A Collective, we want every piece you receive to feel as
            special as it did when you selected it. Every order is carefully
            prepared and inspected before dispatch.
          </p>

          <p>
            Please take a moment to read our Returns &amp; Exchanges Policy
            before placing your order.
          </p>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section className="returns-highlights">
        <div className="returns-highlight">
          <span>01</span>
          <strong>7 Days</strong>
          <p>Eligible return &amp; exchange window</p>
        </div>

        <div className="returns-highlight">
          <span>02</span>
          <strong>48 Hours</strong>
          <p>To report damaged or incorrect items</p>
        </div>

        <div className="returns-highlight">
          <span>03</span>
          <strong>Worldwide</strong>
          <p>Returns &amp; exchanges for eligible orders</p>
        </div>
      </section>

      {/* POLICY SECTIONS */}
      <section className="returns-policies">

        {/* 01 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">01</div>

          <div className="returns-policy-content">
            <span>ELIGIBILITY</span>
            <h3>Returns &amp; Exchanges</h3>

            <p>
              We accept eligible return or exchange requests within{" "}
              <strong>7 days of delivery</strong>.
            </p>

            <p>To be eligible, the item must:</p>

            <ul>
              <li>Be unused, unworn and in its original condition.</li>
              <li>
                Be returned with all original tags, packaging and accessories.
              </li>
              <li>
                Not show signs of wear, alteration, washing, damage or misuse.
              </li>
              <li>Be accompanied by the original order number.</li>
            </ul>
          </div>
        </article>

        {/* 02 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">02</div>

          <div className="returns-policy-content">
            <span>YOUR ORDER</span>
            <h3>Damaged or Incorrect Items</h3>

            <p>
              If your order arrives damaged, defective or different from the
              item you ordered, please contact us within{" "}
              <strong>48 hours of delivery</strong>.
            </p>

            <p>
              For verification, we may request clear photographs and/or an
              unboxing video showing the condition of the package and item.
            </p>

            <p>
              Once the issue has been reviewed and approved, F&amp;A Collective
              may offer an appropriate resolution, which may include a
              replacement, exchange or refund, subject to the circumstances
              and applicable requirements.
            </p>
          </div>
        </article>

        {/* 03 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">03</div>

          <div className="returns-policy-content">
            <span>JEWELLERY</span>
            <h3>Jewellery &amp; Hygiene</h3>

            <p>
              Due to the delicate nature and hygiene considerations of
              jewellery, jewellery items must be returned in their original,
              unused condition.
            </p>

            <p>
              Earrings and other jewellery items that have been worn are
              generally not eligible for return or exchange, except where the
              item is defective, damaged upon delivery, or incorrectly
              supplied.
            </p>

            <div className="returns-note">
              <strong>Please note</strong>
              <p>
                We recommend inspecting your jewellery carefully upon delivery
                before wearing it.
              </p>
            </div>
          </div>
        </article>

        {/* 04 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">04</div>

          <div className="returns-policy-content">
            <span>FASHION</span>
            <h3>Garments &amp; Accessories</h3>

            <p>
              Garments and eligible accessories may be considered for exchange
              within 7 days of delivery, provided they are:
            </p>

            <ul>
              <li>Unworn and unused.</li>
              <li>Unwashed.</li>
              <li>Free from perfume, makeup, stains or other marks.</li>
              <li>In their original condition.</li>
              <li>Returned with original tags and packaging.</li>
            </ul>

            <p>
              Items that have been altered, washed, worn or damaged after
              delivery may not be eligible for exchange.
            </p>
          </div>
        </article>

        {/* 05 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">05</div>

          <div className="returns-policy-content">
            <span>PLEASE NOTE</span>
            <h3>Non-Returnable Items</h3>

            <ul>
              <li>Items that have been worn, used or altered.</li>
              <li>Earrings or jewellery that have been worn.</li>
              <li>Personalised or customised items.</li>
              <li>Items specifically marked as Final Sale.</li>
              <li>
                Sale or promotional items, unless they arrive damaged,
                defective or incorrect.
              </li>
              <li>
                Items returned without their original packaging, tags or
                required accessories.
              </li>
            </ul>

            <p className="returns-small-note">
              Nothing in this section limits any rights that may apply under
              applicable consumer-protection laws.
            </p>
          </div>
        </article>

        {/* 06 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">06</div>

          <div className="returns-policy-content">
            <span>YOUR CHOICE</span>
            <h3>Change of Mind</h3>

            <p>
              If you change your mind after placing an order, please contact us
              as soon as possible.
            </p>

            <p>
              Once an order has been processed or dispatched, cancellation may
              no longer be possible. If an eligible item has already been
              delivered, any return or exchange request will be reviewed
              according to the conditions outlined in this policy.
            </p>
          </div>
        </article>

        {/* 07 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">07</div>

          <div className="returns-policy-content">
            <span>THE PROCESS</span>
            <h3>How to Request an Exchange</h3>

            <div className="returns-process">

              <div className="returns-process-step">
                <span>01</span>
                <div>
                  <strong>Contact Us</strong>
                  <p>
                    Send us your order number and reason for the exchange.
                  </p>
                </div>
              </div>

              <div className="returns-process-step">
                <span>02</span>
                <div>
                  <strong>Share Details</strong>
                  <p>
                    Provide photographs or other information if requested.
                  </p>
                </div>
              </div>

              <div className="returns-process-step">
                <span>03</span>
                <div>
                  <strong>Receive Approval</strong>
                  <p>
                    Wait for our team to confirm the return instructions.
                  </p>
                </div>
              </div>

              <div className="returns-process-step">
                <span>04</span>
                <div>
                  <strong>Inspection</strong>
                  <p>
                    Once received, the item will be inspected before approval.
                  </p>
                </div>
              </div>

            </div>

            <div className="returns-warning">
              <strong>Please do not send an item back without approval.</strong>
              <span>
                Contact our team first so we can provide the correct return
                instructions.
              </span>
            </div>
          </div>
        </article>

        {/* 08 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">08</div>

          <div className="returns-policy-content">
            <span>SHIPPING</span>
            <h3>Return &amp; Exchange Shipping</h3>

            <p>
              If an item received is damaged, defective or incorrect due to an
              error on our part, F&amp;A Collective will review the case and
              provide an appropriate resolution.
            </p>

            <p>
              For customer-requested exchanges, such as size, preference or
              change of mind, return shipping and any applicable re-shipping
              costs may be the customer's responsibility.
            </p>

            <p>
              International customers are responsible for any customs duties,
              import taxes or other charges imposed by their destination
              country, where applicable.
            </p>
          </div>
        </article>

        {/* 09 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">09</div>

          <div className="returns-policy-content">
            <span>WORLDWIDE</span>
            <h3>International Returns</h3>

            <p>
              F&amp;A Collective ships worldwide. International returns may
              involve additional delivery time, shipping costs and customs
              considerations.
            </p>

            <p>
              Customers sending an eligible return from outside the UAE are
              responsible for ensuring that the package is shipped securely and
              reaches us in acceptable condition.
            </p>

            <p>
              Any customs duties, import taxes or charges imposed by the
              destination or return country may apply separately and are not
              automatically refundable by F&amp;A Collective.
            </p>
          </div>
        </article>

        {/* 10 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">10</div>

          <div className="returns-policy-content">
            <span>REFUNDS</span>
            <h3>Refunds</h3>

            <p>
              Where a refund is approved, it will generally be processed to the
              original payment method, subject to the applicable payment
              provider's processing time.
            </p>

            <p>
              Depending on the payment method and destination country, it may
              take additional time for the refunded amount to appear in the
              customer's account.
            </p>

            <p>
              Shipping charges may be non-refundable where permitted and
              depending on the circumstances of the return.
            </p>
          </div>
        </article>

        {/* 11 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">11</div>

          <div className="returns-policy-content">
            <span>INSPECTION</span>
            <h3>Return Inspection</h3>

            <p>
              All returned items are subject to inspection before an exchange
              or refund is approved.
            </p>

            <p>
              If an item is returned in a condition that does not meet the
              requirements of this policy, we may decline the return or
              exchange.
            </p>
          </div>
        </article>

        {/* 12 */}
        <article className="returns-policy-row">
          <div className="returns-policy-number">12</div>

          <div className="returns-policy-content">
            <span>BEFORE DISPATCH</span>
            <h3>Order Cancellation</h3>

            <p>
              If you wish to cancel an order, please contact us as soon as
              possible after placing your order.
            </p>

            <p>
              We will make reasonable efforts to accommodate cancellation
              requests before an order is processed or dispatched. Once an
              order has been dispatched, cancellation may no longer be
              possible.
            </p>
          </div>
        </article>

      </section>

      {/* FAQ */}
      <section className="returns-faq">
        <div className="returns-faq-heading">
          <span className="returns-section-label">GOOD TO KNOW</span>

          <h2>
            Frequently Asked
            <br />
            <em>Questions.</em>
          </h2>
        </div>

        <div className="returns-faq-list">
          {faqItems.map((item, index) => (
            <div
              className={`returns-faq-item ${
                openFaq === index ? "is-open" : ""
              }`}
              key={item.question}
            >
              <button
                type="button"
                className="returns-faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                <span>{item.question}</span>

                <span className="returns-faq-icon">
                  {openFaq === index ? "−" : "+"}
                </span>
              </button>

              <div className="returns-faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="returns-contact">
        <div className="returns-contact-inner">
          <span className="returns-section-label">NEED ASSISTANCE?</span>

          <h2>
            We are here
            <br />
            <em>to help.</em>
          </h2>

          <p>
            Have a question about your return or exchange? Our team is happy
            to assist you.
          </p>

          <a href="/contact" className="returns-contact-button">
            Contact F&amp;A Collective
            <span>→</span>
          </a>
        </div>
      </section>

      {/* FOOTNOTE */}
      <section className="returns-footnote">
        <p>
          F&amp;A Collective reserves the right to update this Returns &amp;
          Exchanges Policy when necessary. Any updated version will be
          published on our website.
        </p>

        <span>F&amp;A COLLECTIVE · FASHION · JEWELLERY · ACCESSORIES</span>
      </section>

    </main>
  );
}

export default ReturnsExchanges;