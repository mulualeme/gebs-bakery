import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    occupation: "Food Enthusiast",
    content:
      "The bread from Gebs bakery is always fresh and delicious. My family loves the pastries, and the custom cakes are perfect for our celebrations!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Smith",
    occupation: "Professional Chef",
    content:
      "As a chef, I appreciate the quality and consistency of Gebs' products. Their artisanal breads are simply outstanding.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Williams",
    occupation: "Restaurant Owner",
    content:
      "We've been sourcing our bread from Gebs for years. Their reliability and quality are unmatched in the industry.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "David Brown",
    occupation: "Food Blogger",
    content:
      "Gebs consistently delivers the best baked goods in town. Their attention to detail and commitment to quality is evident in every bite.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
  },
];

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all hover:bg-primary/10 focus:outline-none md:-right-6"
  >
    <ChevronRight className="h-6 w-6 text-primary" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all hover:bg-primary/10 focus:outline-none md:-left-6"
  >
    <ChevronLeft className="h-6 w-6 text-primary" />
  </button>
);

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Quote className="h-6 w-6 text-white" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-primary">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Our bakery clients love our fresh bread, buttery pastries, and
            custom cakes that add a little sweetness to their special moments!
          </p>
        </div>

        <div className="relative mt-12 px-6">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-2">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
