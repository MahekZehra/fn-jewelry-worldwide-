import { useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiShoppingBag,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const orderNumber = `FN-${Date.now().toString().slice(-6)}`;

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-24">

      <div className="mx-auto max-w-3xl">

        {/* Success Area */}
        <div className="text-center">

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black shadow-lg sm:h-24 sm:w-24">

            <FiCheck className="text-3xl text-white sm:text-4xl" />

          </div>

          {/* Small Label */}
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 sm:text-xs">
            Order Confirmed
          </p>

          {/* Heading */}
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
            Thank You For Your Order
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black/50 sm:text-base">
            Your order has been successfully placed. Our team will contact
            you shortly to confirm your order and delivery details.
          </p>

        </div>


        {/* Order Details Card */}
        <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] p-6 sm:p-8">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/40">
                Order Number
              </p>

              <p className="mt-2 text-sm font-semibold tracking-wide sm:text-base">
                {orderNumber}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF8F5]">
              <FiShoppingBag className="text-lg" />
            </div>

          </div>


          {/* Order Information */}
          <div className="space-y-5 p-6 sm:p-8">

            {/* Payment */}
            <div className="flex items-center justify-between gap-6">

              <span className="text-sm text-black/45">
                Payment Method
              </span>

              <span className="text-right text-sm font-medium">
                Cash on Delivery
              </span>

            </div>


            {/* Status */}
            <div className="flex items-center justify-between gap-6">

              <span className="text-sm text-black/45">
                Order Status
              </span>

              <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Confirmed
              </span>

            </div>


            {/* Delivery */}
            <div className="flex items-center justify-between gap-6">

              <span className="text-sm text-black/45">
                Delivery
              </span>

              <span className="text-right text-sm font-medium">
                Available
              </span>

            </div>

          </div>

        </div>


        {/* What's Next */}
        <div className="mt-5 rounded-[1.5rem] border border-black/[0.07] bg-white p-6 sm:p-7">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5]">
              <FiCheck className="text-sm" />
            </div>

            <div>

              <p className="text-sm font-semibold">
                What happens next?
              </p>

              <p className="mt-2 text-sm leading-6 text-black/50">
                Our team will contact you to confirm your order before it
                is dispatched. Please keep your phone available for
                confirmation.
              </p>

            </div>

          </div>

        </div>


        {/* Buttons */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="group flex h-13 min-h-[52px] items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/80"
          >
            Continue Shopping

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>


          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex h-13 min-h-[52px] items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            <FiHome className="text-sm" />

            Back to Home

          </button>

        </div>


        {/* Footer Note */}
        <p className="mt-8 text-center text-[11px] leading-5 text-black/35">
          Thank you for choosing FN Jewelry Worldwide.
        </p>

      </div>

    </main>
  );
};

export default OrderConfirmation;