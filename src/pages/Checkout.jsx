            import { FiShield, FiTruck } from "react-icons/fi";

            const Checkout = ({
              currencySymbols = { GBP: "£" },
              currency = "GBP",
              cartTotal = 0,
              formatPrice = (price) => Number(price).toFixed(2),
            }) => (
              <main>
                <div>
                  <aside>
                    <div
              className="
                my-6
                border-t
                border-[#C9A66B]/20
              "
            />
            {/* VAT NOTE */}
            <p
              className="
                mb-5
                text-[10px]
                tracking-wide
                text-[#907C76]
              "
            >
              All prices include VAT.
            </p>
            {/* SUBTOTAL */}
            <div className="flex justify-between text-sm">
              <span className="text-[#907C76]">
                Subtotal
              </span>
              <span className="font-medium text-[#4A3935]">
                {currencySymbols[currency]}{" "}
                {formatPrice(cartTotal)}
              </span>
            </div>
            {/* DELIVERY */}
            <>
              <div className="mt-3 flex justify-between gap-4 text-sm">
                <span className="text-[#907C76]">
                  Delivery
                </span>
                <span className="text-right text-xs text-[#A28E88]">
                  Calculated at checkout
                </span>
              </div>
              <div
                className="
                  my-6
                  border-t
                  border-[#C9A66B]/20
                "
              />
            </>
            {/* TOTAL */}
            <div className="flex justify-between">
              <span className="font-semibold text-[#4A3935]">
                Total
              </span>
              <span
                className="
                  text-lg
                  font-semibold
                  text-[#4A3935]
                "
              >
                {currencySymbols[currency]}{" "}
                {formatPrice(cartTotal)}
              </span>
            </div>
            {/* =================================================
                TRUST
            ================================================= */}
            <div className="mt-6 space-y-3">
              <div
                className="
                  flex gap-3
                  rounded-xl
                  border
                  border-[#D8B9B5]/15
                  bg-[#FFF9F7]
                  p-3
                "
              >
                <FiTruck
                  className="
                    mt-0.5
                    shrink-0
                    text-[#B18A83]
                  "
                />
                <div>
                  <p className="text-xs font-semibold text-[#4A3935]">
                    Delivery Available
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#A28E88]">
                    Our team will contact you to confirm delivery.
                  </p>
                </div>
              </div>
              <div
                className="
                  flex gap-3
                  rounded-xl
                  border
                  border-[#D8B9B5]/15
                  bg-[#FFF9F7]
                  p-3
                "
              >
                <FiShield
                  className="
                    mt-0.5
                    shrink-0
                    text-[#B18A83]
                  "
                />
                <div>
                  <p className="text-xs font-semibold text-[#4A3935]">
                    Secure Checkout
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#A28E88]">
                    Your order details are handled securely.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
    </main>
  );
export default Checkout;