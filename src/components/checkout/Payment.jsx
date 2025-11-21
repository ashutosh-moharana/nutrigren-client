import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutProvider";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";
import {
  placeCodOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../services/orders";
import { loadRazorpayScript } from "../../utils/razorpay";

export default function Payment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    product,
    address,
    resetCheckout,
  } = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) {
      navigate("/checkout/address");
    }
  }, [address, navigate]);

  if (!product || !address) {
    return null;
  }

  const quantity = product.quantity || 1;
  const total = Number(product.price) * Number(quantity);

  const payload = {
    products: [
      {
        productId: product._id,
        quantity,
      },
    ],
    totalAmount: total,
    address,
    mode: paymentMethod === "cod" ? "Cash On Delivery" : "Razorpay",
  };

  const handleCodOrder = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await placeCodOrder(payload);
      const savedAddress = { ...address };
      resetCheckout();
      navigate("/order-success", {
        state: {
          order: response.data.order,
          address: savedAddress,
          paymentMethod: "cod",
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place COD order.");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    setError(null);
    setLoading(true);
    try {
      await loadRazorpayScript();
      if (typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay SDK unavailable");
      }
      const { data } = await createRazorpayOrder(payload);
      if (data.demo) {
        setError(
          "Add Razorpay test keys in the server .env file to enable online payments."
        );
        setLoading(false);
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "NutriGren",
        description: product.name,
        order_id: data.razorpayOrderId,
        prefill: {
          name: address.fullName,
          email: user?.email || "ashu@nutrigren.co",
          contact: address.phoneNumber,
        },
        notes: {
          address: `${address.houseNo}, ${address.city}`,
        },
        theme: { color: "#1d8a52" },
        handler: async (response) => {
          try {
            const verifyRes = await verifyRazorpayPayment({
              ...response,
              orderId: data.orderId,
            });

            // Save address before any state changes
            const savedAddress = { ...address };

            // Navigate immediately without resetting
            navigate("/order-success", {
              state: {
                order: verifyRes.data.order,
                address: savedAddress,
                paymentMethod: "razorpay",
              },
              replace: true,
            });

            // Reset checkout after navigation
            setTimeout(() => resetCheckout(), 100);
          } catch (verificationError) {
            setError(
              verificationError.response?.data?.message ||
              "Payment verification failed."
            );
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to initiate Razorpay payment."
      );
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "cod") {
      handleCodOrder();
    } else {
      handleRazorpayPayment();
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-primary/10 p-5 bg-muted">
        <h2 className="text-xl font-semibold text-heading mb-4">
          Choose payment method
        </h2>
        <div className="space-y-3">
          {["razorpay", "cod"].map((method) => (
            <label
              key={method}
              className="flex items-center justify-between rounded-2xl border border-primary/15 bg-white px-4 py-3 cursor-pointer"
            >
              <div>
                <p className="font-semibold text-heading capitalize">
                  {method === "razorpay" ? "Razorpay" : "Cash on Delivery"}
                </p>
                <p className="text-xs text-subtle">
                  {method === "razorpay"
                    ? "Instant UPI / Card / Netbanking"
                    : "Pay when the jar arrives"}
                </p>
              </div>
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-primary/10 p-5 bg-card">
        <div className="flex justify-between text-subtle">
          <span>Items ({quantity})</span>
          <span>
            ₹{product.price} × {quantity}
          </span>
        </div>
        <div className="flex justify-between text-subtle">
          <span>Delivery</span>
          <span className="text-emerald-600">Free</span>
        </div>
        <div className="border-t border-primary/10 pt-3 mt-3 flex justify-between font-semibold text-heading text-xl">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/checkout/address")}>
          Back
        </Button>
        <Button onClick={handlePayment} disabled={loading}>
          {loading
            ? "Processing..."
            : paymentMethod === "cod"
              ? "Place order"
              : "Pay now"}
        </Button>
      </div>
    </div>
  );
}