// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link, useNavigate } from "react-router-dom";

// const Suppliers = () => {
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
//       }
//     };
//     fetchSuppliers();
//   }, []);

//   const handleDelete = async (supplierId) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to delete this supplier?"
//     );
//     if (!isConfirmed) return;

//     try {
//       const response = await axios.delete(
//         `http://localhost:3001/api/store/delete_supplier/${supplierId}`
//       );
//       if (response.status === 200) {
//         setSuppliers((prevSuppliers) =>
//           prevSuppliers.filter((supplier) => supplier._id !== supplierId)
//         );
//         alert("Supplier deleted successfully!");
//       } else {
//         throw new Error("Failed to delete supplier.");
//       }
//     } catch (error) {
//       console.error("Error deleting supplier:", error);
//       alert("There was an error deleting the supplier.");
//     }
//   };

//   const handleUpdate = (supplierId) => {
//     navigate(`/updateSupplier/${supplierId}`);
//   };

//   return (
//     <div className="container-fluid py-4 bg-gradient bg-primary-subtle min-vh-100">
//       <h2 className="display-5 fw-bold text-dark mb-4">Suppliers List</h2>

//       <div className="mb-4 d-flex gap-3">
//         <Link to="/addSupplier" className="btn btn-dark shadow-sm">
//           <i className="bi bi-plus-circle me-2"></i>Add New Supplier
//         </Link>
//       </div>

//       <div className="card shadow border-0">
//         <div className="card-body bg-white rounded">
//           <div className="table-responsive">
//             <table className="table table-hover align-middle w-100">
//               <thead className="table-dark text-white">
//                 <tr>
//                   <th className="px-3">Supplier ID</th>
//                   <th className="px-3">Name</th>
//                   <th className="px-3">Contact</th>
//                   <th className="px-3">Email</th>
//                   <th className="px-3">Address</th>
//                   <th className="px-3">Created Date</th>
//                   <th className="px-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {suppliers.length > 0 ? (
//                   suppliers.map((supplier) => (
//                     <tr key={supplier._id}>
//                       <td className="fw-medium text-dark px-3">
//                         {supplier.supplierId}
//                       </td>
//                       <td className="px-3">{supplier.name}</td>
//                       <td className="px-3">{supplier.contact}</td>
//                       <td className="px-3">{supplier.email}</td>
//                       <td className="px-3">{supplier.address}</td>
//                       <td className="px-3">
//                         {new Date(supplier.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-3">
//                         <div className="d-flex gap-2">
//                           <button
//                             className="btn btn-primary btn-sm shadow-sm"
//                             onClick={() => handleUpdate(supplier._id)}
//                           >
//                             <i className="bi bi-pencil-square me-1"></i>Update
//                           </button>
//                           <button
//                             className="btn btn-danger btn-sm shadow-sm"
//                             onClick={() => handleDelete(supplier._id)}
//                           >
//                             <i className="bi bi-trash me-1"></i>Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center text-muted py-4">
//                       No suppliers available.
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

// export default Suppliers;
