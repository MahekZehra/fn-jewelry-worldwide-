import { useCallback, useState } from "react";

const AdminOrders = () => {
  const [secret, setSecret] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadOrders = useCallback(async (adminSecret = secret) => {
    setIsLoading(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin-orders", {
        headers: { "x-inventory-admin-secret": adminSecret },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to load orders.");
      }
      setOrders(Array.isArray(data.orders) ? data.orders : []);
      setIsAuthenticated(true);
    } catch (requestError) {
      setIsAuthenticated(false);
      setError(requestError.message || "Unable to load orders.");
    } finally {
      setIsLoading(false);
    }
  }, [secret]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (secret.trim()) await loadOrders(secret.trim());
  };

  const handleCancel = async (orderNumber) => {
    if (!window.confirm("Cancel order " + orderNumber + "? A paid Stripe order will be refunded to the original payment method.")) return;
    setActiveOrder(orderNumber);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/cancel-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-inventory-admin-secret": secret,
        },
        body: JSON.stringify({
          orderNumber,
          reason: "Cancelled by store administrator",
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to cancel this order.");
      }
      setNotice(data.message || "Order cancelled.");
      await loadOrders(secret);
    } catch (requestError) {
      setError(requestError.message || "Unable to cancel this order.");
    } finally {
      setActiveOrder("");
    }
  };

  const handleLogout = () => {
    setSecret("");
    setOrders([]);
    setIsAuthenticated(false);
    setError("");
    setNotice("");
  };

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B18A83]">F&A Collective</p>
            <h1 className="mt-2 font-serif text-3xl text-[#3E302D] sm:text-4xl">Order Management</h1>
            <p className="mt-2 text-sm text-[#907C76]">Private store administration · Cancel and review customer orders</p>
          </div>
          {isAuthenticated && (
            <div className="flex gap-2">
              <button type="button" onClick={() => loadOrders(secret)} disabled={isLoading} className="min-h-11 rounded-full border border-[#D8B9B5]/40 px-5 text-sm font-semibold text-[#4A3935] disabled:opacity-50">Refresh</button>
              <button type="button" onClick={handleLogout} className="min-h-11 rounded-full bg-[#4A3935] px-5 text-sm font-semibold text-white">Log out</button>
            </div>
          )}
        </header>

        {!isAuthenticated && (
          <form onSubmit={handleLogin} className="mt-8 max-w-xl rounded-2xl border border-[#D8B9B5]/25 bg-white p-6 shadow-sm">
            <label htmlFor="admin-secret" className="block text-sm font-semibold text-[#4A3935]">Admin access key</label>
            <input
              id="admin-secret"
              type="password"
              autoComplete="current-password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              placeholder="Enter the INVENTORY_ADMIN_SECRET from Vercel"
              className="mt-3 min-h-12 w-full rounded-xl border border-[#D8B9B5]/40 px-4 text-sm outline-none focus:border-[#A97972]"
              required
            />
            <button type="submit" disabled={isLoading || !secret.trim()} className="mt-4 min-h-12 w-full rounded-full bg-[#4A3935] px-6 text-sm font-semibold text-white disabled:opacity-50">
              {isLoading ? "Checking access..." : "Open Orders"}
            </button>
          </form>
        )}

        {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {notice && <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}

        {isAuthenticated && (
          <section className="mt-8 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-[#907C76]">{orders.length} most recent order(s)</p>
              <p className="text-xs text-[#A28E88]">New orders appear at the top</p>
            </div>
            {orders.length === 0 && (
              <div className="rounded-2xl bg-white p-8 text-center text-sm text-[#907C76]">No orders have been recorded yet.</div>
            )}
            {orders.map((order) => {
              const canCancel = ["confirmed", "processing"].includes(order.status);
              return (
                <article key={order.order_number} className="rounded-2xl border border-[#D8B9B5]/20 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A97972]">{order.order_number}</p>
                      <h2 className="mt-2 font-serif text-xl text-[#3E302D]">{order.customer_name}</h2>
                      <p className="mt-1 text-sm text-[#806D68]">{order.customer_email} · {order.customer_phone || "No phone"}</p>
                      <p className="mt-1 text-xs text-[#A28E88]">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#3E302D]">{order.currency || "AED"} {Number(order.total || 0).toFixed(2)}</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-[#806D68]">{order.payment_method} · {order.payment_status}</p>
                      <span className={"mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide " + (order.status === "cancelled" ? "bg-red-50 text-red-700" : "bg-[#F5ECE8] text-[#6B514B]")}>{order.status?.replaceAll("_", " ")}</span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 border-t border-black/[0.06] pt-4 text-sm sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A28E88]">Delivery</p>
                      <p className="mt-1 text-[#665955]">{order.customer_address || "—"}</p>
                      <p className="mt-1 text-[#665955]">{order.customer_city || ""}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A28E88]">Items</p>
                      {(Array.isArray(order.items) ? order.items : []).map((item, index) => (
                        <p key={item.productId || item.id || index} className="mt-1 text-[#665955]">{item.name} × {item.quantity || 1}</p>
                      ))}
                    </div>
                  </div>

                  {order.status === "cancelled" && (
                    <p className="mt-4 rounded-xl bg-red-50 p-3 text-xs leading-5 text-red-700">
                      Cancelled {order.cancelled_at ? "on " + formatDate(order.cancelled_at) : ""}. {order.refund_id ? "Stripe refund: " + order.refund_id : "No online refund was required."}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => handleCancel(order.order_number)}
                      disabled={!canCancel || activeOrder === order.order_number}
                      className="min-h-11 rounded-full border border-red-200 px-5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      {activeOrder === order.order_number ? "Cancelling..." : "Cancel Order"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default AdminOrders;
