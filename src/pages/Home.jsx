import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Highlights from "../components/Highlights";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16 space-y-16 md:space-y-20">
        <Hero />
        <Highlights />
        <Product />
      </main>
      <Footer />
    </div>
  );
}
