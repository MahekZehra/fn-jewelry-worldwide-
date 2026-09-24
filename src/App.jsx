import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import OurStory from "./components/OurStory";
import FeaturedProducts from "./components/FeaturedProducts";
import Exhibitions from "./components/Exhibitions";
import KnowYourStones from "./components/KnowYourStones";
import WorldwideDelivery from "./components/WorldwideDelivery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ReturnsExchanges from "./pages/ReturnsExchanges";


/* =====================================================
   HOME PAGE
===================================================== */

function Home() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* CATEGORIES */}
      <CategorySection />

      {/* OUR STORY */}
      <OurStory />

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts />

      {/* OUR EXHIBITIONS */}
      <Exhibitions />

      {/* KNOW YOUR STONES */}
      <KnowYourStones />

      {/* WORLDWIDE DELIVERY */}
      <WorldwideDelivery />

      {/* CONTACT INFORMATION */}
      <Contact />

      {/* FOOTER */}
      <Footer />
    </>
  );
}


/* =====================================================
   MAIN APP
===================================================== */

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* SHOP */}
        <Route
          path="/shop"
          element={<Shop />}
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ORDER CONFIRMATION */}
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />

        {/* RETURNS & EXCHANGES */}
        <Route
          path="/returns-exchanges"
          element={<ReturnsExchanges />}
        />

      </Routes>

      {/* FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton />

    </BrowserRouter>
  );
}

export default App;