// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/api/store/get_all_products"
//         );
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleDelete = async (productId) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to delete this product?"
//     );
//     if (!isConfirmed) return;

//     try {
//       await axios.delete(
//         `http://localhost:3001/api/store/delete_product/${productId}`
//       );
//       setProducts((prevProducts) =>
//         prevProducts.filter((product) => product._id !== productId)
//       );
//       alert("Product deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("There was an error deleting the product.");
//     }
//   };

//   const handleUpdate = (productId) => {
//     navigate(`/updateProduct/${productId}`);
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(
//       products.map((product) => ({
//         ProductID: product.productId,
//         Name: product.name,
//         Price: `Rs.${product.price}`,
//         Discount: `${product.discount}%`,
//         Quantity: product.quantity,
//         Supplier: product.supplier ? product.supplier.name : "N/A",
//         ManufacturedDate: new Date(
//           product.manufacturedDate
//         ).toLocaleDateString(),
//         ExpiryDate: new Date(product.expiryDate).toLocaleDateString(),
//         CreatedTime: new Date(product.createdAt).toLocaleDateString(),
//       }))
//     );
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Products");
//     XLSX.writeFile(wb, "Products_List.xlsx");
//   };

//   return (
//     <div className="container  bg-gradient bg-primary-subtle min-vh-100">
//       <h2 className="display-5 fw-bold text-dark mb-4">Products List</h2>

//       <div className="mb-4 d-flex gap-3">
//         <Link to="/addProduct" className="btn btn-dark shadow-sm">
//           <i className="bi bi-plus-circle me-2"></i>Add New Product
//         </Link>
//         <button
//           className="btn btn-dark text-white shadow-sm"
//           onClick={exportToExcel}
//         >
//           <i className="bi bi-file-earmark-excel me-2"></i>Export to Excel
//         </button>
//       </div>

//       <div className="card shadow border-0">
//         <div className="card-body bg-white rounded">
//           <div className="table-responsive">
//             <table className="table table-hover align-middle">
//               <thead className="bg-primary table-dark text-white">
//                 <tr>
//                   <th>Product ID</th>
//                   <th>Name</th>
//                   <th>Price</th>
//                   <th>Discount</th>
//                   <th>Quantity</th>
//                   <th>Supplier</th>
//                   <th>Manufactured Date</th>
//                   <th>Expiry Date</th>
//                   <th>Created Date</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.length > 0 ? (
//                   products.map((product) => (
//                     <tr key={product._id}>
//                       <td className="fw-medium text-dark">
//                         {product.productId}
//                       </td>
//                       <td>{product.name}</td>
//                       <td className="">Rs.{product.price}</td>
//                       <td className="">{product.discount}%</td>
//                       <td>{product.quantity}</td>
//                       <td>
//                         {product.supplier ? product.supplier.name : "N/A"}
//                       </td>
//                       <td>
//                         {new Date(
//                           product.manufacturedDate
//                         ).toLocaleDateString()}
//                       </td>
//                       <td>
//                         {new Date(product.expiryDate).toLocaleDateString()}
//                       </td>
//                       <td>
//                         {new Date(product.createdAt).toLocaleDateString()}
//                       </td>
//                       <td>
//                         <div className="d-flex gap-2">
//                           <button
//                             className="btn btn-primary btn-sm shadow-sm"
//                             onClick={() => handleUpdate(product._id)}
//                           >
//                             <i className="bi bi-pencil-square me-1"></i>Update
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm shadow-sm"
//                             onClick={() => handleDelete(product._id)}
//                           >
//                             <i className="bi bi-trash me-1"></i>Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="10" className="text-center text-muted py-4">
//                       No products available.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
