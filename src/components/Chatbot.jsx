import { useEffect, useMemo, useState } from "react";

import {
  FiMessageCircle,
  FiX,
  FiArrowLeft,
  FiArrowUpRight,
  FiMail,
} from "react-icons/fi";

const LOGO_SRC = "/logo/fa-logo.jpg";

const WHATSAPP_NUMBER = "923353149929";
const EMAIL = "info@amnafacollective.com";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("welcome");
  const [category, setCategory] = useState(null);

  /* =========================
     OPEN CHATBOT FROM WEBSITE
  ========================== */
  useEffect(() => {
    const openChatbotFromWebsite = () => {
      setOpen(true);
      setView("welcome");
      setCategory(null);
    };

    window.addEventListener(
      "open-fna-chatbot",
      openChatbotFromWebsite
    );

    return () => {
      window.removeEventListener(
        "open-fna-chatbot",
        openChatbotFromWebsite
      );
    };
  }, []);

  /* =========================
     WHATSAPP
  ========================== */
  const whatsapp = (customMessage) => {
    const message = encodeURIComponent(
      customMessage ||
        "Hi F&A Collective! I would like to enquire about your collection."
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================
     EMAIL
  ========================== */
  const email = (subjectText, bodyText) => {
    const subject = encodeURIComponent(
      subjectText || "F&A Collective — Customer Enquiry"
    );

    const body = encodeURIComponent(
      bodyText ||
        "Hello F&A Collective,\n\nI would like to enquire about your collection.\n\nThank you."
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================
     HOME
  ========================== */
  const home = () => {
    setView("welcome");
    setCategory(null);
  };

  /* =========================
     BASIC OPTIONS
  ========================== */
  const basicOptions = useMemo(
    () => [
      {
        id: "collection",
        title: "Explore Our Collection",
        text: "Discover our jewellery, fashion pieces and accessories.",
      },
      {
        id: "categories",
        title: "Shop Categories",
        text: "Find jewellery, garments and accessories by category.",
      },
      {
        id: "orders",
        title: "Orders & Enquiries",
        text: "Need help with an order or want to enquire about a piece?",
      },
      {
        id: "custom",
        title: "Custom & Special Orders",
        text: "Ask us about weddings, bulk orders and special occasions.",
      },
    ],
    []
  );

  /* =========================
     INFORMATION
  ========================== */
  const categoryContent = {
    collection: {
      title: "Our Collection",
      description:
        "F&A Collective brings together thoughtfully curated jewellery, fashion pieces and accessories designed for elegant and memorable moments.",
      points: [
        "Jewellery",
        "Fashion & garments",
        "Kundan clutches",
        "Statement and occasion pieces",
      ],
    },

    categories: {
      title: "Shop Categories",
      description:
        "You can explore our collection through the following categories:",
      points: [
        "Sets",
        "Designer Sets",
        "Necklaces",
        "Everyday Jewellery",
        "Earrings",
        "Traditional Sets",
        "Statement Jewellery",
        "Party Jewellery",
        "New Arrivals",
        "Lawn & Silk garments",
        "Kundan Clutches",
      ],
    },

    orders: {
      title: "Orders & Enquiries",
      description:
        "If you have a question about an order, product, availability or anything else, our team will be happy to assist you.",
      points: [
        "Product enquiries",
        "Order-related questions",
        "Availability enquiries",
        "General assistance",
      ],
    },

    custom: {
      title: "Special Orders",
      description:
        "We welcome custom, bulk and wedding-related enquiries. Tell us what you are looking for and our team can guide you further.",
      points: [
        "Wedding jewellery",
        "Bulk orders",
        "Special occasions",
        "Custom enquiries",
      ],
    },
  };

  return (
    <>
      {/* =========================
          FLOATING CHAT LAUNCHER
      ========================== */}
      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setView("welcome");
            setCategory(null);
          }}
          aria-label="Open F&A chatbot"
          className="fixed right-5 top-[92px] z-[9998] flex h-14 w-14 items-center justify-center rounded-full border border-[#E8D6D8] bg-white/95 text-[#A87585] shadow-[0_12px_35px_rgba(105,75,75,0.16)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_18px_40px_rgba(105,75,75,0.20)]"
        >
          <div className="relative flex items-center justify-center">
            <FiMessageCircle className="text-[23px]" />

            <span className="absolute -right-2 -top-2 text-[11px] text-[#B9788B]">
              ✦
            </span>

            <span className="absolute -bottom-2 -left-2 text-[8px] text-[#D8B7A8]">
              ✦
            </span>
          </div>
        </button>
      )}

      {/* =========================
          CHAT WINDOW
      ========================== */}
      {open && (
        <div className="fixed right-5 top-[92px] z-[9999] flex h-[min(650px,calc(100vh-120px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-[2rem] border border-[#E8D6D8] bg-[#FFFDFC] shadow-[0_25px_80px_rgba(75,45,55,0.20)]">
          {/* =========================
              HEADER
          ========================== */}
          <div className="relative shrink-0 overflow-hidden border-b border-[#EEDFE2] bg-gradient-to-br from-[#FFF8F8] via-[#FFFDFB] to-[#F8F1FA] px-5 py-4">
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F8DDE5]/50 blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">

                {/* FIXED LOGO */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E5CDD3] bg-white p-1 shadow-sm">
                  <img
                    src={LOGO_SRC}
                    alt="F&A Collective"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-lg font-semibold text-[#3B2930]">
                      F&A Collective
                    </h3>

                    <span className="text-[11px] text-[#B9788B]">
                      ✦
                    </span>
                  </div>

                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#A87585]">
                    Personal Concierge
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8D6D8] bg-white/80 text-[#806D66] transition hover:bg-white hover:text-[#A87585]"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* =========================
              CONTENT
          ========================== */}
          <div className="flex-1 overflow-y-auto px-5 py-5">

            {/* WELCOME */}
            {view === "welcome" && (
              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg">✨</span>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A87585]">
                      Welcome
                    </p>
                  </div>

                  <h2 className="font-serif text-[27px] leading-tight text-[#3B2930]">
                    How may we
                    <span className="block italic text-[#B9788B]">
                      assist you?
                    </span>
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#76636A]">
                    Welcome to F&A Collective. I can help you explore our
                    collection and answer basic questions.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setView("explore")}
                    className="group flex w-full items-center justify-between rounded-2xl border border-[#E8D6D8] bg-white p-4 text-left shadow-[0_8px_25px_rgba(105,75,75,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DDBCC5] hover:shadow-[0_12px_30px_rgba(105,75,75,0.09)]"
                  >
                    <div>
                      <p className="font-serif text-lg text-[#3B2930]">
                        Explore F&A
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#806D66]">
                        Explore our collection and website information.
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FDF1F4] text-[#A87585] transition group-hover:bg-[#F8DDE5]">
                      <FiArrowUpRight />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("advanced")}
                    className="group flex w-full items-center justify-between rounded-2xl border border-[#DED5E8] bg-white p-4 text-left shadow-[0_8px_25px_rgba(105,75,75,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CFC0DB] hover:shadow-[0_12px_30px_rgba(105,75,75,0.09)]"
                  >
                    <div>
                      <p className="font-serif text-lg text-[#3B2930]">
                        I Need Something Else
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#806D66]">
                        Need specific or advanced assistance?
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7F2FA] text-[#80658B] transition group-hover:bg-[#EDE4F2]">
                      <FiArrowUpRight />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* EXPLORE */}
            {view === "explore" && (
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={home}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8D6D8] bg-white text-[#806D66] transition hover:text-[#A87585]"
                  >
                    <FiArrowLeft />
                  </button>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A87585]">
                      Explore
                    </p>

                    <h2 className="font-serif text-2xl text-[#3B2930]">
                      What would you like to know?
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {basicOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCategory(item.id);
                        setView("answer");
                      }}
                      className="group w-full rounded-2xl border border-[#E8D6D8] bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DDBCC5] hover:shadow-[0_10px_25px_rgba(105,75,75,0.07)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-serif text-lg text-[#3B2930]">
                            {item.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-[#806D66]">
                            {item.text}
                          </p>
                        </div>

                        <FiArrowUpRight className="shrink-0 text-[#B9788B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ANSWER */}
            {view === "answer" &&
              category &&
              categoryContent[category] && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setView("explore")}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8D6D8] bg-white text-[#806D66] transition hover:text-[#A87585]"
                    >
                      <FiArrowLeft />
                    </button>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A87585]">
                      F&A Information
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-[#E8D6D8] bg-white p-5 shadow-[0_10px_30px_rgba(105,75,75,0.05)]">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FDF1F4] text-[#B9788B]">
                      <span className="text-lg">✦</span>
                    </div>

                    <h2 className="font-serif text-2xl text-[#3B2930]">
                      {categoryContent[category].title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#76636A]">
                      {categoryContent[category].description}
                    </p>

                    <div className="mt-5 space-y-2">
                      {categoryContent[category].points.map(
                        (point) => (
                          <div
                            key={point}
                            className="flex items-center gap-2 text-sm text-[#6F5A61]"
                          >
                            <span className="text-[#B9788B]">
                              ✦
                            </span>

                            <span>{point}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E6D9C9] bg-[#FCF5EA]/70 p-4">
                    <p className="text-sm leading-6 text-[#6F5A61]">
                      Need more specific information? Our team can
                      assist you directly.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          whatsapp(
                            "Hi F&A Collective! I need some assistance regarding your collection."
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#80658B] px-3 py-3 text-xs font-semibold text-white transition hover:bg-[#6F5679]"
                      >
                        <FiMessageCircle />
                        WhatsApp
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          email(
                            "F&A Collective — Customer Enquiry",
                            "Hello F&A Collective,\n\nI need some assistance regarding your collection.\n\nThank you."
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#B9788B] px-3 py-3 text-xs font-semibold text-white transition hover:bg-[#A9677A]"
                      >
                        <FiMail />
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              )}

            {/* ADVANCED */}
            {view === "advanced" && (
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={home}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8D6D8] bg-white text-[#806D66] transition hover:text-[#A87585]"
                  >
                    <FiArrowLeft />
                  </button>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A87585]">
                      Personal Assistance
                    </p>

                    <h2 className="font-serif text-2xl text-[#3B2930]">
                      Let’s connect
                    </h2>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[#E8D6D8] bg-white p-5 text-center shadow-[0_10px_30px_rgba(105,75,75,0.05)]">

                  {/* FIXED LOGO */}
                  <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#E5CDD3] bg-white p-1">
                    <img
                      src={LOGO_SRC}
                      alt="F&A Collective"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h3 className="mt-4 font-serif text-2xl text-[#3B2930]">
                    Something more specific?
                  </h3>

                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#76636A]">
                    If you need information that isn't available on
                    the website, our team will be happy to help you
                    personally.
                  </p>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        whatsapp(
                          "Hi F&A Collective! I need some assistance that I couldn't find on the website."
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#80658B] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(128,101,139,0.18)] transition hover:-translate-y-0.5 hover:bg-[#6F5679]"
                    >
                      <FiMessageCircle />
                      Chat on WhatsApp
                      <FiArrowUpRight className="text-xs" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        email(
                          "F&A Collective — Advanced Enquiry",
                          "Hello F&A Collective,\n\nI need some assistance that I couldn't find on the website.\n\nPlease assist me with my enquiry.\n\nThank you."
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E2CDD2] bg-[#FFF8F8] px-5 py-3.5 text-sm font-semibold text-[#9D687A] transition hover:-translate-y-0.5 hover:bg-[#FDF1F4]"
                    >
                      <FiMail />
                      Send Us an Email
                      <FiArrowUpRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =========================
              FOOTER
          ========================== */}
          <div className="shrink-0 border-t border-[#EEDFE2] bg-[#FFF9F7] px-5 py-3">
            <div className="flex items-center justify-center gap-1.5 text-center">
              <span className="text-[9px] text-[#B9788B]">
                ✦
              </span>

              <p className="text-[9px] uppercase tracking-[0.16em] text-[#A58B91]">
                F&A Collective · Crafted With Care
              </p>

              <span className="text-[9px] text-[#B9788B]">
                ✦
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;