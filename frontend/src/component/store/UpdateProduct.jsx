// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateProduct = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     discount: "",
//     quantity: "",
//     supplier: "",
//     manufacturedDate: "",
//     expiryDate: "",
//     salesCount: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         console.log("productId", productId);
//         const res = await axios.get(
//           `http://localhost:3001/api/store/get_product/${productId}`
//         );
//         const productData = res.data;
//         console.log("productData", productData);

//         const formatDate = (date) => {
//           if (!date) return "";
//           return new Date(date).toISOString().split("T")[0];
//         };

//         setProduct({
//           ...productData,
//           manufacturedDate: formatDate(productData.manufacturedDate),
//           expiryDate: formatDate(productData.expiryDate),
//           supplier: productData.supplier?._id || "",
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("Failed to load product data");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const submitData = {
//         ...product,
//         manufacturedDate: product.manufacturedDate || undefined,
//         expiryDate: product.expiryDate || undefined,
//       };
//       await axios.put(
//         `http://localhost:3001/api/store/update_product/${productId}`,
//         submitData
//       );
//       alert("Product updated successfully!");
//       navigate("/products");
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setError("Failed to update product");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid py-4 bg-gradient bg-primary-subtle min-vh-100 d-flex justify-content-center align-items-center">
//         <div className="spinner-border text-dark" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container-fluid py-4 bg-gradient bg-primary-subtle min-vh-100">
//         <div className="alert alert-danger mt-4 mx-4" role="alert">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid py-4 bg-gradient bg-primary-subtle min-vh-100">
//       <h2 className="display-5 fw-bold text-dark mb-4">Update Product</h2>

//       <div className="card shadow border-0">
//         <div className="card-body bg-white rounded p-4">
//           <form onSubmit={handleSubmit}>
//             <div className="row g-4">
//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="name"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       !product.name ? "is-invalid" : ""
//                     }`}
//                     id="name"
//                     name="name"
//                     value={product.name}
//                     onChange={handleChange}
//                     required
//                   />
//                   {!product.name && (
//                     <div className="invalid-feedback">
//                       Product name is required
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="price"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Price (Rs.)
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     className={`form-control ${
//                       !product.price || product.price <= 0 ? "is-invalid" : ""
//                     }`}
//                     id="price"
//                     name="price"
//                     value={product.price}
//                     onChange={handleChange}
//                     required
//                     min="0"
//                   />
//                   {(!product.price || product.price <= 0) && (
//                     <div className="invalid-feedback">
//                       Price must be greater than zero
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="discount"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Discount (%)
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="discount"
//                     name="discount"
//                     value={product.discount}
//                     onChange={handleChange}
//                     min="0"
//                     max="100"
//                   />
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="quantity"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Quantity
//                   </label>
//                   <input
//                     type="number"
//                     className={`form-control ${
//                       !product.quantity || product.quantity <= 0
//                         ? "is-invalid"
//                         : ""
//                     }`}
//                     id="quantity"
//                     name="quantity"
//                     value={product.quantity}
//                     onChange={handleChange}
//                     required
//                     min="0"
//                   />
//                   {(!product.quantity || product.quantity <= 0) && (
//                     <div className="invalid-feedback">
//                       Quantity must be greater than zero
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="manufacturedDate"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Manufactured Date
//                   </label>
//                   <input
//                     type="date"
//                     className={`form-control ${
//                       !product.manufacturedDate ? "is-invalid" : ""
//                     }`}
//                     id="manufacturedDate"
//                     name="manufacturedDate"
//                     value={product.manufacturedDate}
//                     onChange={handleChange}
//                     required
//                   />
//                   {!product.manufacturedDate && (
//                     <div className="invalid-feedback">
//                       Manufactured Date is required
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="expiryDate"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Expiry Date
//                   </label>
//                   <input
//                     type="date"
//                     className={`form-control ${
//                       !product.expiryDate ||
//                       (product.manufacturedDate &&
//                         new Date(product.expiryDate) <=
//                           new Date(product.manufacturedDate))
//                         ? "is-invalid"
//                         : ""
//                     }`}
//                     id="expiryDate"
//                     name="expiryDate"
//                     value={product.expiryDate}
//                     onChange={handleChange}
//                     required
//                   />
//                   {!product.expiryDate ? (
//                     <div className="invalid-feedback">
//                       Expiry Date is required
//                     </div>
//                   ) : (
//                     product.manufacturedDate &&
//                     new Date(product.expiryDate) <=
//                       new Date(product.manufacturedDate) && (
//                       <div className="invalid-feedback">
//                         Expiry Date must be later than Manufactured Date
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 d-flex gap-3">
//               <button type="submit" className="btn btn-dark shadow-sm px-4">
//                 <i className="bi bi-check-circle me-2"></i>Update Product
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-dark shadow-sm px-4"
//                 onClick={() => navigate("/products")}
//               >
//                 <i className="bi bi-x-circle me-2"></i>Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;
