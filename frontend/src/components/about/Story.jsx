import { Clock, Heart, Leaf } from "lucide-react";

const values = [
  {
    icon: Clock,
    title: "Time-Honored Traditions",
    description:
      "Every recipe has been perfected through generations of baking expertise.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "We pour our passion into every creation that leaves our kitchen.",
  },
  {
    icon: Leaf,
    title: "Quality Ingredients",
    description:
      "We source the finest local and organic ingredients for our products.",
  },
];

export function Story() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-gray-900">
            Our Story
          </h2>
          <p className="text-lg text-gray-600">
            Since 1950, Gebs Bakery has been crafting delicious baked goods
            using time-honored recipes and the finest ingredients. What started
            as a small family bakery has grown into a beloved local institution,
            while maintaining the same dedication to quality and service that
            we&apos;ve had since day one.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <img
              src={`${import.meta.env.VITE_API_URL}/assets/baker.jpg`}
              alt="Our bakery"
              className="scale-75 rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900">
              A Family Tradition
            </h3>
            <p className="text-gray-600">
              Our story begins with Grandpa Geb, who brought his family&apos;s
              cherished recipes from the old country. His passion for baking and
              commitment to quality laid the foundation for what Geb&apos;s
              Bakery is today.
            </p>
            <p className="text-gray-600">
              Today, the third generation of our family continues this legacy,
              blending traditional techniques with modern innovations to create
              exceptional baked goods that bring joy to our community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
