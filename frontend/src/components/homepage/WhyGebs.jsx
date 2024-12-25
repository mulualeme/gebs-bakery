function WhyGebs() {
  const items = [
    {
      icon: "👜",
      title: "Easy to order",
      description:
        "Ordering your favorite fresh bread has never been easier. With just a few clicks, your cravings are satisfied!",
    },
    {
      icon: "🚚",
      title: "Fastest Delivery",
      description:
        "We ensure your bread reaches you as fresh as it left the oven, with speedy delivery right to your doorstep.",
    },
    {
      icon: "😍",
      title: "Pure Taste",
      description:
        "Experience the authentic flavors of hand-crafted bread made from the finest ingredients.",
    },
  ];

  return (
    <section className="relative py-24">
      <img
        src="src/assets/wheat.svg"
        alt="Wheat decoration"
        className="absolute left-0 top-0 hidden h-32 w-32 -translate-x-8 -translate-y-4 transform lg:block"
      />
      <div className="container mx-auto px-6 pb-20">
        <h2 className="mb-16 text-center font-libre text-5xl font-bold text-primary">
          Why Gebs?
        </h2>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          {items.map((item, index) => (
            <article
              key={index}
              className="group w-full max-w-sm rounded-lg border border-gray-100 bg-white p-8 text-center shadow-lg transition-all hover:border-primary hover:shadow-xl"
            >
              <div className="flex justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-gray-100 text-4xl text-gray-700"
                  aria-label={`Icon for ${item.title}`}
                >
                  {item.icon}
                </div>
              </div>
              <h3 className="mt-4 font-OutFit text-xl font-bold text-primary">
                {item.title}
              </h3>
              <p className="mt-2 font-poppins text-gray-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyGebs;
