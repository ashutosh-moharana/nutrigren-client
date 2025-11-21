import httpClient from "./httpClient";

let cachedProducts = null;
let lastFetchedAt = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export async function getProducts({ force = false } = {}) {
  if (!force && cachedProducts && Date.now() - lastFetchedAt < CACHE_TTL) {
    return cachedProducts;
  }

  const response = await httpClient.get("/api/products");
  cachedProducts = response.data?.products || [];
  lastFetchedAt = Date.now();
  return cachedProducts;
}

export async function getProductById(productId) {
  if (!productId) {
    throw new Error("productId is required");
  }

  if (cachedProducts) {
    const cached = cachedProducts.find((product) => product._id === productId);
    if (cached) return cached;
  }

  const response = await httpClient.get(`/api/products/${productId}`);
  return response.data?.product;
}

