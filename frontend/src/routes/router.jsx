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

//parking

import AddParking from "../component/Parking/AddParking";
import EditParking from "../component/Parking/EditParking";
import ParkingDashboard from "../component/Parking/ParkingDashboard";
import ParkingList from "../component/Parking/ParkingList";
import ParkingHome from "../component/Parking/ParkingHome";
import ParkingAdd from "../component/Parking/adminparking/parkingadd";
import FAQPage from "../component/pages/faq";
import SecurityLostFound from "../component/pages/security";
import RegisterPage from "../component/userprofile/register";
import AdminDashboards from "../component/userprofile/useradmin";
// import Dashboard from "../component/store/Dashboard";
// import Products from "../component/store/Products";
// import AddProduct from "../component/store/AddProduct";
// import Suppliers from "../component/store/Supplier";
// import UpdateProduct from "../component/store/UpdateProduct";
// import AddSupplier from "../component/store/AddSupplier";
// import UpdateSupplier from "../component/store/UpdateSupplier";
// import Notifications from "../component/store/Notifications";

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
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/addtransaction",
      element: <AddTransaction />,
    },
    {
      path: "/faq",
      element: <FAQPage />,
    },
    {
      path: "/security",
      element: <SecurityLostFound />,
    },
    {
      path: "/admin",
      element: <AdminDashboards />,
    },

    //parking
    {
      path: "/parkingHome",
      element: <ParkingHome />,
    },
    {
      path: "/addparking",
      element: <AddParking />,
    },
    {
      path: "/editparking",
      element: <EditParking />,
    },
    {
      path: "/parkingdashboard",
      element: <ParkingDashboard />,
    },
    {
      path: "/parknglist",
      element: <ParkingList />,
    },
    {
      path: "/parkingadd",
      element: <ParkingAdd />,
    },

    //store
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    // },
    // {
    //   path: "/products",
    //   element: <Products />,
    // },
    // {
    //   path: "/addProduct",
    //   element: <AddProduct />,
    // },
    // {
    //   path: "/updateProduct/:productId",
    //   element: <UpdateProduct />,
    // },
    // {
    //   path: "/addSupplier",
    //   element: <AddSupplier />,
    // },
    // {
    //   path: "/updateSupplier/:supplierId",
    //   element: <UpdateSupplier />,
    // },
    // {
    //   path: "/notifications",
    //   element: <Notifications />,
    // },
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
