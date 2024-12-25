function Deals() {
  const products = [
    { name: "Multigrain", price: "$25", imgSrc: "path/to/multigrain.jpg" },
    { name: "Focaccia", price: "$20", imgSrc: "path/to/focaccia.jpg" },
    { name: "Brioche", price: "$35", imgSrc: "path/to/brioche.jpg" },
    { name: "Thermidor", price: "$25", imgSrc: "path/to/thermidor.jpg" },
    { name: "Linguine", price: "$20", imgSrc: "path/to/linguine.jpg" },
    { name: "Plantain", price: "$35", imgSrc: "path/to/plantain.jpg" },
  ];

  return (
    <section className="bg-gray-50 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Enjoy the Best Deal
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600">
          Bread is a bakery that specializes in handcrafted breads made with
          only the freshest and finest ingredients. Our mission is to bring the
          art of bread making back to its roots and to share our passion for
          bread with others.
        </p>
      </div>
      <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border bg-white p-4 shadow-md"
          >
            <img
              src={product.imgSrc}
              alt={product.name}
              className="mb-4 h-24 w-24 object-cover"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Bread is a bakery that specializes in handcrafted breads made with
              only the freshest and finest ingredients.
            </p>
            <p className="mt-3 text-lg font-bold text-gray-800">
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Deals;
