const team = [
  {
    name: "Sarah Geb",
    role: "Master Baker & Owner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    bio: "Third-generation baker carrying on the family tradition.",
  },
  {
    name: "Michael Chen",
    role: "Head Pastry Chef",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    bio: "Trained in Paris, specializing in French pastries.",
  },
  {
    name: "Emma Rodriguez",
    role: "Artisan Bread Baker",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    bio: "Expert in sourdough and traditional bread making.",
  },
];

export function Team() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-gray-900">
            Meet Our Team
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Our talented team of bakers and pastry chefs brings together decades
            of experience and a shared passion for creating exceptional baked
            goods.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-1 text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="mb-4 font-medium text-rose-500">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
