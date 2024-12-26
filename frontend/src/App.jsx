import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Catering from "./pages/Catering";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Error404 from "./pages/Error404";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Feedback from "./pages/Feedback";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/catering" element={<Catering />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="/support" element={<Support />} />
                <Route
                  path="/feedback"
                  element={
                    <ProtectedRoute>
                      <Feedback />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-confirmation"
                  element={<OrderConfirmation />}
                />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </Provider>
  );
}
