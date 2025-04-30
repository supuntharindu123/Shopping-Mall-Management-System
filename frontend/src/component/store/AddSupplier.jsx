// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// const AddSupplier = () => {
//   const navigate = useNavigate();
//   const [supplier, setSupplier] = useState({
//     name: "",
//     contact: "",
//     email: "",
//     address: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [contactError, setContactError] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [addressError, setAddressError] = useState("");

//   const handleChange = (e) => {
//     setSupplier({ ...supplier, [e.target.name]: e.target.value });
//     if (e.target.name === "contact") setContactError("");
//     if (e.target.name === "name") setNameError("");
//     if (e.target.name === "email") setEmailError("");
//     if (e.target.name === "address") setAddressError("");
//   };

//   const validateContact = (contact) => {
//     const contactRegex = /^\d{10}$/;
//     return contactRegex.test(contact);
//   };

//   const validateName = (name) => {
//     const nameRegex = /^[a-zA-Z\s]+$/;
//     return nameRegex.test(name);
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const validateAddress = (address) => {
//     return address.trim() !== "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setErrorMessage("");
//     setNameError("");
//     setContactError("");
//     setEmailError("");
//     setAddressError("");

//     if (!validateName(supplier.name)) {
//       setNameError("Name must only contain letters and spaces.");
//       return;
//     }
//     if (!validateContact(supplier.contact)) {
//       setContactError("Contact number must be exactly 10 digits.");
//       return;
//     }
//     if (!validateEmail(supplier.email)) {
//       setEmailError("Please enter a valid email address.");
//       return;
//     }
//     if (!validateAddress(supplier.address)) {
//       setAddressError("Address cannot be empty.");
//       return;
//     }
//     if (
//       !supplier.name ||
//       !supplier.contact ||
//       !supplier.email ||
//       !supplier.address
//     ) {
//       setErrorMessage("All fields are required.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/store/create_supplier",
//         supplier,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       alert("Supplier added successfully!");
//       navigate("/suppliers");
//     } catch (error) {
//       console.error(
//         "Error adding supplier:",
//         error.response?.data || error.message
//       );
//       if (
//         error.response?.data?.message?.includes("E11000 duplicate key error")
//       ) {
//         setErrorMessage("A supplier with this contact number already exists.");
//       } else {
//         setErrorMessage(
//           "Failed to add supplier: " +
//             (error.response?.data?.message || "Unknown error")
//         );
//       }
//     }
//   };

//   return (
//     <div className="container-fluid py-4 bg-gradient bg-primary-subtle min-vh-100">
//       <h2 className="display-5 fw-bold text-dark mb-4">Add New Supplier</h2>

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
//                     className={`form-control ${nameError ? "is-invalid" : ""}`}
//                     name="name"
//                     value={supplier.name}
//                     onChange={handleChange}
//                     required
//                   />
//                   {nameError && (
//                     <div className="invalid-feedback">{nameError}</div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="contact"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Contact
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       contactError ? "is-invalid" : ""
//                     }`}
//                     name="contact"
//                     value={supplier.contact}
//                     onChange={handleChange}
//                     required
//                     maxLength="10"
//                   />
//                   {contactError && (
//                     <div className="invalid-feedback">{contactError}</div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="email"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className={`form-control ${emailError ? "is-invalid" : ""}`}
//                     name="email"
//                     value={supplier.email}
//                     onChange={handleChange}
//                     required
//                   />
//                   {emailError && (
//                     <div className="invalid-feedback">{emailError}</div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label
//                     htmlFor="address"
//                     className="form-label fw-medium text-dark"
//                   >
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       addressError ? "is-invalid" : ""
//                     }`}
//                     name="address"
//                     value={supplier.address}
//                     onChange={handleChange}
//                     required
//                   />
//                   {addressError && (
//                     <div className="invalid-feedback">{addressError}</div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {errorMessage && (
//               <div className="alert alert-danger mt-4" role="alert">
//                 {errorMessage}
//               </div>
//             )}

//             <div className="mt-4">
//               <button type="submit" className="btn btn-dark shadow-sm px-4">
//                 <i className="bi bi-plus-circle me-2"></i>Add Supplier
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddSupplier;
