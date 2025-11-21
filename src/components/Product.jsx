import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/products";
import Button from "./common/Button";
import SectionHeading from "./common/SectionHeading";
import Card from "./common/Card";
import { useAuth } from "../context/AuthContext";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const handleQuickBuy = (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/checkout/order-summary", {
      state: { product: { ...product, quantity: 1 } },
    });
  };


  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Unable to load our jars right now. Please refresh.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (error) {
    return (
      <section id="products" className="px-5 md:px-20 py-16">
        <div className="max-w-3xl mx-auto text-center bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="px-5 md:px-20 py-18 md:py-24 space-y-16 bg-gradient-to-b from-background to-muted/60"
    >
      <SectionHeading
        eyebrow="Curated collection"
        title="Four jars, endless pairing ideas"
        description="Our entire catalog fits onto one shelf. Enjoy rotating drops of cookies, seed clusters, millet granola, and matcha bites."
      />

      <div className="space-y-16">
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonProduct key={index} mirrored={index % 2 === 1} />
          ))}

        {!loading && products.length === 0 && (
          <div className="rounded-3xl border border-primary/15 bg-muted/60 p-10 text-center">
            <p className="text-lg font-semibold text-heading">
              We're baking fresh stock. Check back tomorrow!
            </p>
          </div>
        )}

        {!loading &&
          products.map((product, index) => (
            <article
              key={product._id || product.name}
              className={`flex flex-col gap-8 lg:gap-12 lg:flex-row items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
            >
              <Card className="flex-1 p-6 md:p-8 lg:p-10 bg-card/90 border border-primary/20">
                <div className="w-full aspect-square rounded-[30px] bg-primary/5 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-3/4 object-contain drop-shadow-2xl"
                  />
                </div>
              </Card>
              <div className="flex-1 space-y-5 text-center lg:text-left">
                <p className="text-sm uppercase tracking-[0.3em] text-primary/70">
                  Small batch #{index + 1}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-heading">
                  {product.name}
                </h3>
                <p className="text-lg text-subtle">{product.description}</p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-3xl font-semibold text-heading">
                    ₹{product.price}
                  </div>
                  <p className="text-sm text-subtle">
                    {Number(product.stock ?? 0) > 8
                      ? "In stock"
                      : `Only ${product.stock ?? 4} jars left`}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button onClick={() => navigate(`/product/${product._id}`)}>
                    View flavor story
                  </Button>
                  <Button variant="outline" onClick={() => handleQuickBuy(product)}>
                    Quick buy
                  </Button>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

function SkeletonProduct({ mirrored = false }) {
  return (
    <article
      className={`flex flex-col gap-8 lg:gap-12 lg:flex-row items-center ${mirrored ? "lg:flex-row-reverse" : ""
        } animate-pulse`}
    >
      <Card className="flex-1 p-6 md:p-8 lg:p-10 bg-card/40 border border-primary/10">
        <div className="w-full aspect-square rounded-[30px] bg-muted" />
      </Card>
      <div className="flex-1 space-y-4 w-full">
        <div className="h-4 bg-muted rounded-full w-40 mx-auto lg:mx-0" />
        <div className="h-10 bg-muted rounded-full w-3/4 mx-auto lg:mx-0" />
        <div className="h-16 bg-muted rounded-3xl" />
        <div className="h-10 bg-muted rounded-full w-32" />
      </div>
    </article>
  );
}
