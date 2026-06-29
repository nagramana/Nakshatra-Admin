import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Returns from "./pages/Returns";
import Users from "./pages/Users";
import PaymentVerification from "./pages/PaymentVerification";
import Ads from "./pages/Ads";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem(
      "lastAdminPage",
      location.pathname
    );
  }, [location]);

  return null;
}

function RestorePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const lastPage =
      localStorage.getItem(
        "lastAdminPage"
      );

    if (
      lastPage &&
      window.location.pathname === "/"
    ) {
      navigate(lastPage);
    }
  }, [navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>

      <RouteTracker />
      <RestorePage />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/returns"
          element={<Returns />}
        />

        <Route
          path="/users"
          element={<Users />}
        />


        <Route
    path="/payment-verification"
    element={<PaymentVerification />}
/>

        <Route
          path="/ads"
          element={<Ads />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;