import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../component/pages/home";
import MembershipPage from "../component/pages/membership";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";


import AddParking from "../component/Parking/AddParking";
import EditParking from "../component/Parking/EditParking";
import ParkingDashboard from "../component/Parking/ParkingDashboard";
import ParkingList from "../component/Parking/ParkingList";
import ParkingHome from "../component/Parking/ParkingHome";
import ParkingAdd from "../component/Parking/adminparking/parkingadd";

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
