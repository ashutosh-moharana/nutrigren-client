import { Routes, Route } from "react-router-dom";
import { CheckoutProvider } from "../context/CheckoutProvider";
import OrderSummary from "../components/checkout/OrderSummary";
import AddressForm from "../components/checkout/AddressForm";
import Payment from "../components/checkout/Payment";
import BackButton from "../components/common/BackButton";
import Card from "../components/common/Card";

export default function Checkout() {
    return (
        <CheckoutProvider>
            <div className="min-h-screen bg-background px-5 py-24 flex justify-center">
                <div className="w-full max-w-3xl space-y-6">
                    <BackButton />
                    <Card className="p-6 md:p-8">
                        <Routes>
                            <Route path="/" element={<OrderSummary />} />
                            <Route path="order-summary" element={<OrderSummary />} />
                            <Route path="address" element={<AddressForm />} />
                            <Route path="payment" element={<Payment />} />
                        </Routes>
                    </Card>
                </div>
            </div>
        </CheckoutProvider>
    );
}
