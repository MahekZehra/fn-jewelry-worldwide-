import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import OurStory from "./components/OurStory";
import FeaturedProducts from "./components/FeaturedProducts";
import KnowYourStones from "./components/KnowYourStones";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import WorldwideDelivery from "./components/WorldwideDelivery";

function Home() {
  return (
    <>
      <Hero />

      <CategorySection />

      <OurStory />

      <FeaturedProducts />

      <KnowYourStones />

      <WorldwideDelivery />

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />
      </Routes>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;