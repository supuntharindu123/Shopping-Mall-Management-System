import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

// Move this to your environment variables
const stripePromise = loadStripe(
  "sk_test_51RKqtYFSe7SjmdV5rogxv6r73wceB5gZfmp2OtRH1R7sjCpOj4JWpXKx2B8YAurNUm1yJTAbIDuXTopWT0CyaS4700UJ5z5v8v"
);

const PurchasePackageForm = ({ packageId, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe has not been initialized");
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

      const response = await fetch(
        "http://localhost:3001/api/purchasepackage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            packageId,
            paymentMethodId: paymentMethod.id,
          }),
        }
      );

      const result = await response.json();

      if (result.message === "Package purchased successfully") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Package purchased successfully",
        });
      } else {
        throw new Error(result.message || "Purchase failed");
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full bg-teal-900 text-white py-2 px-4 rounded-lg
            ${
              !stripe || isProcessing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-teal-700"
            }`}
        >
          {isProcessing ? "Processing..." : "Purchase Package"}
        </button>
      </form>
    </div>
  );
};

const WrappedPurchaseForm = () => (
  <Elements stripe={stripePromise}>
    <PurchasePackageForm />
  </Elements>
);

export default WrappedPurchaseForm;
