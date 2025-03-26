import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../component/pages/home";
import MembershipPage from "../component/pages/membership";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";
import AdminDashboard from "../component/pages/membership";
import Membershipdash from "../component/pages/membershipdash";
import PaymentPage from "../component/pages/payement";
import ContactUs from "../component/pages/contact";
import UserProfile from "../component/userprofile/profile";
import MembershipPackages from "../component/packges/addpackage";
import UpdateMembershipPackage from "../component/packges/updatepackage";
import UpdateRewardsForm from "../component/rewards/updaterewards";
import AddRewardsForm from "../component/rewards/addrewards";
import LoginPage from "../component/userprofile/login";
import MembershipAdmin from "../component/admin/membershipadmin";
import AddTransaction from "../component/admin/addtransaction";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/contact",
      element: <ContactUs />,
    },
    {
      path: "/membership",
      element: <AdminDashboard />,
    },
    {
      path: "/membershipdash",
      element: <Membershipdash />,
    },
    {
      path: "/membershipadmin",
      element: <MembershipAdmin />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
    },
    {
      path: "/addpackage",
      element: <MembershipPackages />,
    },
    {
      path: "/updatepackage",
      element: <UpdateMembershipPackage />,
    },
    {
      path: "/addrewards",
      element: <AddRewardsForm />,
    },
    {
      path: "/updaterewards",
      element: <UpdateRewardsForm />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/addtransaction",
      element: <AddTransaction />,
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
