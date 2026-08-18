import { FiMessageCircle } from "react-icons/fi";

const WhatsAppButton = () => {
  // Dummy UAE WhatsApp number
  const WHATSAPP_NUMBER = "971501234567";

  const message = encodeURIComponent(
    "Hi FN Jewelry Worldwide! I would like to know more about your products."
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed
        bottom-5
        right-5
        z-[9990]
        flex
        h-14 
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-105
        hover:shadow-2xl
        active:scale-95
        sm:bottom-6
        sm:right-6
        sm:h-12
        sm:w-12
      "
    >
      <FiMessageCircle className="text-2xl sm:text-3xl" />

      {/* Online indicator */}
      <span
        className="
          absolute
          right-0
          top-0
          h-3
          w-3
          rounded-full
          border-2
          border-white
          bg-[#25D366]
          sm:h-3.5
          sm:w-3.5
        "
      />
    </a>
  );
};

export default WhatsAppButton;