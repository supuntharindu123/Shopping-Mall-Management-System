// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const [mostSellingProducts, setMostSellingProducts] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalSuppliers, setTotalSuppliers] = useState(0);
//   const [barChartData, setBarChartData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const [productsRes, suppliersRes, sellingRes] = await Promise.all([
//           axios.get("http://localhost:3001/api/store/get_all_products"),
//           axios.get("http://localhost:3001/api/store/get_all_suppliers"),
//           axios.get(
//             "http://localhost:3001/api/sellingHistory/get-all-selling-history"
//           ),
//         ]);

//         setTotalProducts(productsRes.data.length);
//         setTotalSuppliers(suppliersRes.data.length);

//         const salesMap = sellingRes.data.reduce((acc, sale) => {
//           acc[sale.productId] = (acc[sale.productId] || 0) + sale.quantity;
//           return acc;
//         }, {});

//         const sortedSales = Object.entries(salesMap)
//           .map(([productId, salesCount]) => ({ productId, salesCount }))
//           .sort((a, b) => b.salesCount - a.salesCount);

//         const topProducts = sortedSales.slice(0, 5);
//         setMostSellingProducts(topProducts);

//         setBarChartData({
//           labels: sortedSales.map((item) => `Prod ${item.productId}`),
//           datasets: [
//             {
//               label: "Units Sold",
//               data: sortedSales.map((item) => item.salesCount),
//               backgroundColor: "rgba(52, 152, 219, 0.7)",
//               borderColor: "rgb(52, 152, 219)",
//               borderWidth: 1,
//               borderRadius: 4,
//               hoverBackgroundColor: "rgba(52, 152, 219, 0.9)",
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: "Sales Performance",
//         color: "#2c3e50",
//         font: { size: 18 },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Units Sold",
//           color: "#7f8c8d",
//         },
//         grid: { color: "rgba(149, 165, 166, 0.2)" },
//       },
//       x: {
//         title: {
//           display: true,
//           text: "Product ID",
//           color: "#7f8c8d",
//         },
//       },
//     },
//   };

//   return (
//     <div className="container-fluid py-4 bg-gradient bg-primary-subtle min-vh-100">
//       <h1 className="display-5 fw-bold text-dark mb-4">Analytics Dashboard</h1>

//       {isLoading ? (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{ height: "50vh" }}
//         >
//           <div
//             className="spinner-border text-warning"
//             style={{ width: "3rem", height: "3rem" }}
//             role="status"
//           >
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         <div className="row g-4">
//           {/* Chart Section */}
//           <div className="col-lg-8">
//             <div className="card shadow border-0 h-100">
//               <div className="card-body bg-white rounded">
//                 <h2 className="card-title h4 fw-semibold mb-4 text-primary">
//                   Sales Overview
//                 </h2>
//                 <div style={{ height: "400px" }}>
//                   {barChartData && (
//                     <Bar data={barChartData} options={chartOptions} />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Top Products Section */}
//           <div className="col-lg-4">
//             <div className="card shadow border-0 h-100">
//               <div className="card-body bg-white rounded">
//                 <h2 className="card-title h4 fw-semibold mb-4 text-warning">
//                   Top Performers
//                 </h2>
//                 <div className="list-group list-group-flush">
//                   {mostSellingProducts.map((product, index) => (
//                     <div
//                       key={product.productId}
//                       className="list-group-item d-flex align-items-center justify-content-between py-3 bg-light border-bottom"
//                     >
//                       <div className="d-flex align-items-center gap-3">
//                         <span className="badge bg-success rounded-pill w-8 h-8 d-flex align-items-center justify-content-center">
//                           #{index + 1}
//                         </span>
//                         <span className="text-dark">
//                           Prod {product.productId}
//                         </span>
//                       </div>
//                       <span className="badge bg-info text-dark">
//                         {product.salesCount} units
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="col-lg-12">
//             <div className="row g-4">
//               <div className="col-md-6">
//                 <div className="card shadow border-0 bg-info text-white">
//                   <div className="card-body">
//                     <h3 className="card-title h5 fw-semibold">
//                       Total Products
//                     </h3>
//                     <p className="display-4 fw-bold mb-0">{totalProducts}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="card shadow border-0 bg-success text-white">
//                   <div className="card-body">
//                     <h3 className="card-title h5 fw-semibold">
//                       Total Suppliers
//                     </h3>
//                     <p className="display-4 fw-bold mb-0">{totalSuppliers}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
