const CateringHero = () => {
  return (
    <div className="relative flex h-[400px] items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
          Catering Services
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-white/90">
          Elevate your events with our artisanal baked goods and personalized
          service.
        </p>
      </div>
    </div>
  );
};

export default CateringHero;
