import { useEffect, useState } from "react";
import httpClient from "../../services/httpClient";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await httpClient.get("/api/orders/all");
            setOrders(res.data.orders);
        } catch (err) {
            console.error("Failed to fetch orders", err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, deliveryStatus, paymentStatus) => {
        try {
            const payload = {};
            if (deliveryStatus) payload.status = deliveryStatus;
            if (paymentStatus) payload.paymentStatus = paymentStatus;

            await httpClient.put(`/api/orders/${orderId}/status`, payload);

            setOrders((prev) =>
                prev.map((order) => {
                    if (order._id === orderId) {
                        return {
                            ...order,
                            ...(deliveryStatus && { deliveryStatus }),
                            ...(paymentStatus && { paymentStatus }),
                        };
                    }
                    return order;
                })
            );
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading orders...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-heading">Orders</h2>
                <span className="text-sm text-subtle">{orders.length} total orders</span>
            </div>

            <div className="grid gap-4">
                {orders.map((order) => (
                    <Card key={order._id} className="p-6 border border-primary/10">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <div>
                                <p className="text-sm font-medium text-primary">#{order._id.slice(-6)}</p>
                                <p className="text-sm text-subtle">
                                    {new Date(order.createdAt).toLocaleDateString()} at{" "}
                                    {new Date(order.createdAt).toLocaleTimeString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <select
                                    value={order.paymentStatus}
                                    onChange={(e) => handleStatusUpdate(order._id, null, e.target.value)}
                                    className={`text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20 ${order.paymentStatus === "paid"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                        }`}
                                >
                                    {["pending", "paid"].map((status) => (
                                        <option key={status} value={status}>
                                            {status === "paid" ? "Paid" : "Pending"}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={order.deliveryStatus}
                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                    className="text-sm border border-primary/20 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    {["Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            {order.products.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span className="text-heading">
                                        {item.productId?.name || "Unknown Product"} <span className="text-subtle">x{item.quantity}</span>
                                    </span>
                                    <span>₹{item.productId?.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-primary/5 flex flex-col md:flex-row justify-between gap-4 text-sm text-subtle">
                            <div>
                                <p className="font-medium text-heading mb-1">Customer</p>
                                <p>{order.user?.name}</p>
                                <p>{order.user?.email}</p>
                            </div>
                            <div>
                                <p className="font-medium text-heading mb-1">Shipping</p>
                                <p>{order.shippingAddress?.fullName}</p>
                                <p>{order.shippingAddress?.phoneNumber}</p>
                                <p>
                                    {order.shippingAddress?.houseNo}, {order.shippingAddress?.address}
                                </p>
                                <p>
                                    {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                                    {order.shippingAddress?.pincode}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-heading mb-1">Total</p>
                                <p className="text-lg font-semibold text-primary">₹{order.totalAmount}</p>
                                <p className="text-xs">{order.mode}</p>
                            </div>
                        </div>
                    </Card>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-12 text-subtle bg-muted rounded-3xl">
                        No orders found.
                    </div>
                )}
            </div>
        </div>
    );
}
