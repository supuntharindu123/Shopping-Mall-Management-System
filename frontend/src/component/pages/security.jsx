import React, { useState } from "react";

const SecurityLostFound = () => {
  const [report, setReport] = useState({ name: "", contact: "", details: "" });
  const [lostItem, setLostItem] = useState({
    name: "",
    description: "",
    contact: "",
  });

  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert("Security report submitted successfully!");
  };

  const handleLostSubmit = (e) => {
    e.preventDefault();
    alert("Lost item inquiry submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-teal-900 text-center mb-6">
        Security & Lost & Found
      </h1>

      {/* Security Contact Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">
          Security Contact
        </h2>
        <p className="text-gray-700 mb-2">
          Emergency Hotline:{" "}
          <span className="text-teal-900 font-bold">+1 234 567 890</span>
        </p>
        <p className="text-gray-700 mb-2">
          Email:{" "}
          <span className="text-teal-900 font-bold">security@mall.com</span>
        </p>
        <p className="text-gray-700">
          Visit our security office on the ground floor.
        </p>
      </div>

      {/* Report an Incident */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">
          Report an Incident
        </h2>
        <form onSubmit={handleReportSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-lg mb-4"
            required
            value={report.name}
            onChange={(e) => setReport({ ...report, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Number"
            className="w-full p-2 border rounded-lg mb-4"
            required
            value={report.contact}
            onChange={(e) => setReport({ ...report, contact: e.target.value })}
          />
          <textarea
            placeholder="Incident Details"
            className="w-full p-2 border rounded-lg mb-4"
            required
            value={report.details}
            onChange={(e) => setReport({ ...report, details: e.target.value })}
          ></textarea>
          <button
            type="submit"
            className="bg-teal-900 text-white px-6 py-2 rounded-lg hover:bg-teal-800"
          >
            Submit Report
          </button>
        </form>
      </div>

      {/* Lost & Found */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">Lost & Found</h2>
        <form onSubmit={handleLostSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-lg mb-4"
            required
            value={lostItem.name}
            onChange={(e) => setLostItem({ ...lostItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Item Description"
            className="w-full p-2 border rounded-lg mb-4"
            required
            value={lostItem.description}
            onChange={(e) =>
              setLostItem({ ...lostItem, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Contact Number"
            className="w-full p-2 border rounded-lg mb-4"
            required
            value={lostItem.contact}
            onChange={(e) =>
              setLostItem({ ...lostItem, contact: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-teal-900 text-white px-6 py-2 rounded-lg hover:bg-teal-800"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurityLostFound;
