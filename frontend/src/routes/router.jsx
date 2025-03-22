import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../component/pages/home";
import MembershipPage from "../component/pages/membership";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";
import MembershipEnrollment from "../component/pages/test";
import SpendingGoals from "../component/pages/test";
import MobileHomeScreen from "../component/pages/test";
import ExclusiveOffers from "../component/pages/test";
import CustomerDashboard from "../component/pages/test";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/membership",
      element: <MembershipPage />,
    },
    {
      path: "/test",
      element: <CustomerDashboard />,
    },
  ];
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
