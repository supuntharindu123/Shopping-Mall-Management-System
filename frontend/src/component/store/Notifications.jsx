// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Notifications = () => {
//   const [expiringProducts, setExpiringProducts] = useState([]);

//   useEffect(() => {
//     const fetchExpiringProducts = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/api/store/get_all_products"
//         );
//         const products = res.data;

//         const currentDate = new Date();
//         const tenDaysFromNow = new Date(currentDate);
//         tenDaysFromNow.setDate(currentDate.getDate() + 10);

//         const expiring = products.filter((product) => {
//           const expiryDate = new Date(product.expiryDate);
//           return expiryDate >= currentDate && expiryDate <= tenDaysFromNow;
//         });

//         setExpiringProducts(expiring);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchExpiringProducts();
//   }, []);

//   return (
//     <div className="container-fluid py-4 bg-gradient bg-primary-subtle min-vh-100">
//       <h2 className="display-5 fw-bold text-dark mb-4">
//         Expiring Products (Next 10 Days)
//       </h2>

//       <div className="card shadow border-0">
//         <div className="card-body bg-white rounded">
//           {expiringProducts.length === 0 ? (
//             <p className="text-muted py-4">
//               No products are expiring within the next 10 days.
//             </p>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-hover align-middle w-100">
//                 <thead className="table-dark text-white">
//                   <tr>
//                     <th className="px-3">Product Name</th>
//                     <th className="px-3">Product ID</th>
//                     <th className="px-3">Expiry Date</th>
//                     <th className="px-3">Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {expiringProducts.map((product) => (
//                     <tr key={product._id}>
//                       <td className="px-3">{product.name}</td>
//                       <td className="fw-medium text-dark px-3">
//                         {product.productId}
//                       </td>
//                       <td className="px-3">
//                         {new Date(product.expiryDate).toLocaleDateString()}
//                       </td>
//                       <td className="px-3">Rs.{product.price}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notifications;
