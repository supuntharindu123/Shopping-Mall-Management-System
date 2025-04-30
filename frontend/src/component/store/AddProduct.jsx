// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const [productData, setProductData] = useState({
//     name: "",
//     price: "",
//     discount: 0,
//     quantity: "",
//     supplier: "",
//     manufacturedDate: "",
//     expiryDate: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [suppliers, setSuppliers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/api/store/get_all_suppliers"
//         );
//         setSuppliers(res.data);
//       } catch (error) {
//         console.error("Error fetching suppliers:", error);
//         alert("There was an error fetching suppliers.");
//       }
//     };

//     fetchSuppliers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!productData.name) newErrors.name = "Product name is required";
//     if (!productData.price || productData.price <= 0)
//       newErrors.price = "Price must be greater than zero";
//     if (!productData.quantity || productData.quantity <= 0)
//       newErrors.quantity = "Quantity must be greater than zero";
//     if (!productData.supplier) newErrors.supplier = "Supplier is required";
//     if (!productData.manufacturedDate)
//       newErrors.manufacturedDate = "Manufactured Date is required";
//     if (!productData.expiryDate)
//       newErrors.expiryDate = "Expiry Date is required";
//     else if (
//       new Date(productData.expiryDate) <= new Date(productData.manufacturedDate)
//     ) {
//       newErrors.expiryDate = "Expiry Date must be later than Manufactured Date";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/store/create_product",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(productData),
//         }
//       );

//       const responseBody = await response.text();
//       console.log("Response status:", response.status);
//       console.log("Response body:", responseBody);

//       if (response.ok) {
//         const data = JSON.parse(responseBody);
//         alert("Product added successfully!");
//         console.log("Product added:", data);
//         navigate("/products");
//       } else {
//         throw new Error("Failed to add product");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("There was an error adding the product.");
//     }
//   };

//   return (
//     <div className="container-fluid py-4 bg-gradient bg-primary-subtle min-vh-100">
//       <h2 className="display-5 fw-bold text-dark mb-4">Add New Product</h2>

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
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={productData.name}
//                     onChange={handleInputChange}
//                     className={`form-control ${
//                       errors.name ? "is-invalid" : ""
//                     }`}
//                     required
//                   />
//                   {errors.name && (
//                     <div className="invalid-feedback">{errors.name}</div>
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
//                     id="price"
//                     name="price"
//                     value={productData.price}
//                     onChange={handleInputChange}
//                     className={`form-control ${
//                       errors.price ? "is-invalid" : ""
//                     }`}
//                     required
//                     min="0"
//                     step="0.01"
//                   />
//                   {errors.price && (
//                     <div className="invalid-feedback">{errors.price}</div>
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
//                     id="discount"
//                     name="discount"
//                     value={productData.discount}
//                     onChange={handleInputChange}
//                     className="form-control"
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
//                     id="quantity"
//                     name="quantity"
//                     value={productData.quantity}
//                     onChange={handleInputChange}
//                     className={`form-control ${
//                       errors.quantity ? "is-invalid" : ""
//                     }`}
//                     required
//                     min="0"
//                   />
//                   {errors.quantity && (
//                     <div className="invalid-feedback">{errors.quantity}</div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="supplier"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Supplier
//                   </label>
//                   <select
//                     id="supplier"
//                     name="supplier"
//                     value={productData.supplier}
//                     onChange={handleInputChange}
//                     className={`form-control ${
//                       errors.supplier ? "is-invalid" : ""
//                     }`}
//                     required
//                   >
//                     <option value="">Select a supplier</option>
//                     {suppliers.map((supplier) => (
//                       <option key={supplier._id} value={supplier._id}>
//                         {supplier.name}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.supplier && (
//                     <div className="invalid-feedback">{errors.supplier}</div>
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
//                     id="manufacturedDate"
//                     name="manufacturedDate"
//                     value={productData.manufacturedDate}
//                     onChange={handleInputChange}
//                     className={`form-control ${
//                       errors.manufacturedDate ? "is-invalid" : ""
//                     }`}
//                     required
//                   />
//                   {errors.manufacturedDate && (
//                     <div className="invalid-feedback">
//                       {errors.manufacturedDate}
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
//                     id="expiryDate"
//                     name="expiryDate"
//                     value={productData.expiryDate}
//                     onChange={handleInputChange}
//                     className={`form-control ${
//                       errors.expiryDate ? "is-invalid" : ""
//                     }`}
//                     required
//                   />
//                   {errors.expiryDate && (
//                     <div className="invalid-feedback">{errors.expiryDate}</div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4">
//               <button type="submit" className="btn btn-dark shadow-sm px-4">
//                 <i className="bi bi-plus-circle me-2"></i>Add Product
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
