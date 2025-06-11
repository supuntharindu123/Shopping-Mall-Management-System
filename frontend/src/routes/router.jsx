import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../component/pages/home";

import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";


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

import EditParking from "../component/Parking/EditParking";

import ParkingList from "../component/Parking/ParkingList";
import ParkingHome from "../component/Parking/ParkingHome";

import FAQPage from "../component/pages/faq";
import SecurityLostFound from "../component/pages/security";
import RegisterPage from "../component/userprofile/register";
import AdminDashboards from "../component/userprofile/useradmin";
import Logout from "../component/userprofile/logout";
import WrappedPurchaseForm from "../component/packges/purchasepackage";
import AddParking from "../component/parking/adminparking/parkingadd";

import ParkingCategory from "../component/parking/adminparking/parkingcategory";
import AvailableSpots from "../component/parking/AvailableSpots";
import ReserveSpots from "../component/parking/ReserveSpots";
import ParkingDashboard from "../component/parking/ParkingDashboard";
import BookingPage from "../component/parking/BookingParking";

import Addshops from "../component/store/addshops";
import Adminshop from "../component/store/adminstore";
import AllShops from "../component/store/shops";
import Viewshop from "../component/store/viewshop";
import Adminviewshop from "../component/store/adminviewshop";
import Transaction from "../component/store/transaction";
import TransactionHistory from "../component/store/TransactionHistory";
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
    // {
    //   path: "/membership",
    //   element: <AdminDashboard />,
    // },
    {
      path: "/membershipdash",
      element: <Membershipdash />,
    },
    {
      path: "/membershipadmin",
      element: <MembershipAdmin />,

    },
    {
      path: "/membershippage",
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
      path: "/updatepackage/:id",
      element: <UpdateMembershipPackage />,
    },
    {
      path: "/addrewards",
      element: <AddRewardsForm />,
    },
    {
      path: "/updaterewards/:id",
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
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/stripe",
      element: <WrappedPurchaseForm />,
    },

    //parking
    {
      path: "/booking",
      element: <BookingPage />,
    },
    {
      path: "/parkingHome",
      element: <ParkingHome />,
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
      element: <AddParking />,
    },
    {
      path: "/parkingcategory",
      element: <ParkingCategory />,
    },
    {
      path: "/availableparkingspots",
      element: <AvailableSpots />,
    },
    {
      path: "/reserveparkingspots",
      element: <ReserveSpots />,
    },

    //store
    {
      path: "/adminshop",
      element: <Adminshop />,
    },
    {
      path: "/shopadd",
      element: <Addshops />,
    },
    {
      path: "/shops",
      element: <AllShops />,
    },
    {
      path: "/shop/:id",
      element: <Viewshop />,
    },
    {
      path: "/adminshop/:id",
      element: <Adminviewshop />,
    },
    {
      path: "/shop/:id/transactions",
      element: <Transaction />,
    },

    {
      path: "/parkingHome",
      element: <ParkingHome />,
    },
    {


      path: "/transactionhistory",
      element: <TransactionHistory />,

    },
    {

      path: "/membershippage",
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
      path: "/updatepackage/:id",
      element: <UpdateMembershipPackage />,
    },
    {
      path: "/addrewards",
      element: <AddRewardsForm />,
    },
    {
      path: "/updaterewards/:id",
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
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/stripe",
      element: <WrappedPurchaseForm />,
    },

    //parking
    {
      path: "/booking",
      element: <BookingPage />,
    },
    {
      path: "/parkingHome",
      element: <ParkingHome />,
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
      element: <AddParking />,
    },
    {
      path: "/parkingcategory",
      element: <ParkingCategory />,
    },
    {
      path: "/availableparkingspots",
      element: <AvailableSpots />,
    },
    {
      path: "/reserveparkingspots",
      element: <ReserveSpots />,
    },

    //store
    {
      path: "/adminshop",
      element: <Adminshop />,
    },
    {
      path: "/shopadd",
      element: <Addshops />,
    },
    {
      path: "/shops",
      element: <AllShops />,
    },
    {
      path: "/shop/:id",
      element: <Viewshop />,
    },
    {
      path: "/adminshop/:id",
      element: <Adminviewshop />,
    },
    {
      path: "/shop/:id/transactions",
      element: <Transaction />,
    },

    {
      path: "/parkingHome",
      element: <ParkingHome />,
    },
    {


      path: "/transactionhistory",
      element: <TransactionHistory />,
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
    } ,
    {
      path: "/parkingadd",
      element: <ParkingAdd />,
    } 
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