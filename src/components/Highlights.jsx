import SectionHeading from "./common/SectionHeading";
import Card from "./common/Card";
import { PiLeaf, PiBowlFood, PiTruckLight } from "react-icons/pi";

const highlights = [
  {
    title: "Whole Ingredients",
    description: "Rolled oats, seeds, cold-pressed coconut oil & jaggery.",
    icon: PiLeaf,
  },
  {
    title: "Balanced Nutrition",
    description: "Each bite delivers plant protein, fiber, and clean carbs.",
    icon: PiBowlFood,
  },
  {
    title: "Fresh Batches",
    description: "Small-batch baking, plastic-free jars, doorstep delivery.",
    icon: PiTruckLight,
  },
];

export default function Highlights() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-20 space-y-10" id="ethos">
      <SectionHeading
        eyebrow="Why NutriGren"
        title="Mindfully baked for busy routines"
        description="We curated just five recipes so we can focus on freshness, traceability, and taste. Your pantry staple for cravings without compromise."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map(({ title, description, icon }) => {
          const IconComponent = icon;
          return (
            <Card
              key={title}
              className="p-6 md:p-8 bg-gradient-to-br from-card to-card/80 border border-primary/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <IconComponent className="text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-subtle">{description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

