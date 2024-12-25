import { Story } from "../components/about/Story";
import { Team } from "../components/about/Team";

export function About() {
  return (
    <main className="pt-16">
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
            About Gebs Bakery
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-white/90">
            A family tradition of excellence in baking, serving our community
            with love and passion since 1950.
          </p>
        </div>
      </div>

      <Story />
      <Team />
    </main>
  );
}
export default About;
