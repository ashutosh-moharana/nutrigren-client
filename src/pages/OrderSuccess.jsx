import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import BackButton from "../components/common/BackButton";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order, address, paymentMethod } = location.state || {};

  useEffect(() => {
    if (!order) {
      navigate("/orders", { replace: true });
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  const shipping = order.shippingAddress || address;

  return (
    <div className="min-h-screen bg-background px-5 py-24">
      <BackButton />
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          ✓
        </div>
        <div>
          <h1 className="text-4xl font-semibold text-heading mb-3">
            Order confirmed!
          </h1>
          <p className="text-subtle">
            We’ve sent a confirmation email. Expect dispatch updates within 24
            hours.
          </p>
        </div>

        <Card className="p-6 text-left space-y-5">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-subtle">
                Order id
              </p>
              <p className="text-2xl font-semibold text-heading">
                #{order._id.slice(-6)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-subtle">
                Payment
              </p>
              <p className="text-2xl font-semibold text-heading">
                ₹{order.totalAmount}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-subtle mb-2">
              Shipping to
            </p>
            <p className="text-heading">
              {shipping?.fullName}
              <br />
              {shipping?.houseNo}, {shipping?.address}
              {shipping?.landmark ? `, ${shipping.landmark}` : ""}
              <br />
              {shipping?.city}, {shipping?.state} {shipping?.pincode}
              <br />
              {shipping?.phoneNumber}
            </p>
          </div>
          <div className="text-sm text-subtle">
            Payment mode:{" "}
            <span className="font-semibold text-heading">
              {paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay"}
            </span>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => navigate("/orders")}>View orders</Button>
          <Button variant="outline" onClick={() => navigate("/#products")}>
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
