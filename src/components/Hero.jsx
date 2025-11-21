import { Link } from "react-router-dom";
import heroImage from "/cookies.png";
import Badge from "./common/Badge";
import Button from "./common/Button";

const stats = [
  { label: "Sugar swaps", value: "0 Refined" },
  { label: "Repeat buyers", value: "4K+" },
  { label: "Delivery cities", value: "32" },
];

export default function Hero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 px-5 md:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-green opacity-40 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <Badge>Handcrafted functional treats</Badge>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-heading">
            Minimal ingredients, maximal nourishment.
          </h1>
          <p className="text-lg md:text-xl text-subtle">
            We bake only four hero recipes, so every jar carries the same
            patience your nani would pour into her snack box—clean energy,
            mindful sweetness, nothing you can’t pronounce.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <Link to="/#products">
              <Button>Shop the set</Button>
            </Link>
            <Link to="#ethos">
              <Button variant="outline">Why only five?</Button>
            </Link>
          </div>
          <dl className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-left border-l border-primary/20 pl-4">
                <dt className="text-xs uppercase tracking-wide text-subtle">
                  {label}
                </dt>
                <dd className="text-2xl font-semibold text-heading">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex-1">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 blur-3xl bg-primary/30" />
            <img
              src={heroImage}
              alt="NutriGren assortment"
              className="relative w-full rounded-[32px] p-6 bg-card border border-white/70 shadow-soft"
            />
            <div className="absolute -bottom-8 -right-6 bg-card rounded-2xl px-4 py-3 shadow-xl border border-primary/20">
              <p className="text-xs uppercase tracking-wide text-subtle">
                Avg. delivery
              </p>
              <p className="text-lg font-semibold text-heading">2.5 days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
