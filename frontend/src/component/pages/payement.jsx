import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Mall from "../../assets/Mall01.jpg";
import MallImg from "../../assets/Mall02.jpg";
import MallImgs from "../../assets/Mall03.jpg";
import Logo from "../../assets/CA01.jpg";
import { FiCheck, FiAward, FiShoppingBag } from "react-icons/fi";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const stripePromise = loadStripe("your_publishable_key");

const images = [Mall, MallImg, MallImgs];

const MembershipPage = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pkg = await axios.get("http://localhost:3001/api/packages");
        setPackages(pkg.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setCurrentStep(2);
  };

  const handleBackToPackages = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slideshow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-96 overflow-hidden"
      >
        <motion.img
          key={index}
          src={images[index]}
          alt="Slideshow"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="flex justify-center mb-6">
              <img src={Logo} alt="logo" width={120} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Crystal Arcade Membership
            </h1>
            <p className="text-xl md:text-2xl">
              Unlock exclusive benefits and rewards tailored to your shopping
              style
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Step Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div
              className={`flex flex-col items-center ${
                currentStep >= 1 ? "text-teal-900" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-teal-900 text-white" : "bg-gray-200"
                }`}
              >
                {currentStep > 1 ? <FiCheck size={20} /> : 1}
              </div>
              <span className="mt-2">Choose Package</span>
            </div>
            <div
              className={`w-16 md:w-32 h-1 mx-2 ${
                currentStep >= 2 ? "bg-teal-900" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex flex-col items-center ${
                currentStep >= 2 ? "text-teal-900" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-teal-900 text-white" : "bg-gray-200"
                }`}
              >
                {currentStep > 2 ? <FiCheck size={20} /> : 2}
              </div>
              <span className="mt-2">Payment</span>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <PackageSelection
            packages={packages}
            onSelect={handlePackageSelect}
          />
        )}

        {currentStep === 2 && selectedPackage && (
          <PaymentForm
            package={selectedPackage}
            onBack={handleBackToPackages}
          />
        )}
      </div>
    </div>
  );
};

const PackageSelection = ({ packages, onSelect }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 text-teal-900">
        Choose Your Membership
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-teal-900 text-white p-4">
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className="text-teal-100">${pkg.price}/month</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="inline-block bg-teal-100 text-teal-900 px-2 py-1 rounded-full text-xs font-semibold">
                  {pkg.category === "All" ? "All Categories" : pkg.category}
                </span>
                <span className="ml-2 inline-block bg-yellow-100 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                  {pkg.pointsPerDollar} Points
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                {pkg.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-teal-900 mt-1 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className=" p-3 text-sm pt-0">{pkg.description}</div>
              <button
                onClick={() => onSelect(pkg)}
                className="w-full bg-teal-900 hover:bg-teal-800 text-white py-2 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <FiShoppingBag className="mr-2" />
                Select Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentForm = ({ package: pkg, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    if (!stripe || !elements) {
      setError("Payment processing not available");
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw new Error(error.message);
      }

      const response = await axios.post(
        "http://localhost:3001/api/purchasepackage",
        {
          userId: localStorage.getItem("userId"), // Get from your auth context
          packageId: pkg._id,
          paymentMethodId: paymentMethod.id,
        }
      );

      if (response.data.message === "Package purchased successfully") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Package purchased successfully",
        });
        // Redirect or update UI as needed
      }
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: err.message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-teal-900 text-white p-4">
          <h3 className="text-xl font-bold">Complete Your Membership</h3>
          <p className="text-teal-100">Selected: {pkg.name} Package</p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-bold text-lg text-teal-900">{pkg.name}</h4>
              <p className="text-gray-600">${pkg.monthlyCost}/month</p>
            </div>
            <button
              onClick={onBack}
              className="text-teal-900 hover:text-teal-700"
            >
              Change Package
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Package Price:</span>
                <span className="font-medium">${pkg.monthlyCost}/month</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg text-teal-900">
                <span>Total Due Today:</span>
                <span>${pkg.monthlyCost}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className={`w-full bg-teal-900 text-white py-3 rounded-lg font-medium
                ${
                  !stripe || isProcessing
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-teal-800"
                }`}
            >
              {isProcessing ? "Processing..." : "Complete Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function WrappedMembershipPage() {
  return (
    <Elements stripe={stripePromise}>
      <MembershipPage />
    </Elements>
  );
}
