import httpClient from "./httpClient";

export function placeCodOrder(payload) {
  return httpClient.post("/api/orders/cod", payload);
}

export function createRazorpayOrder(payload) {
  return httpClient.post("/api/orders/create-payment", payload);
}

export function verifyRazorpayPayment(payload) {
  return httpClient.post("/api/orders/verify-payment", payload);
}

export async function fetchOrders() {
  const response = await httpClient.get("/api/orders");
  return response.data?.orders ?? [];
}

