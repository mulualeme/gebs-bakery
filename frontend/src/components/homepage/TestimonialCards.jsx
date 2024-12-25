const TestimonialCard = ({ name, occupation, content, image, rating }) => {
  return (
    <div className="mx-4 flex flex-col gap-4 rounded-xl bg-primary/10 p-8 shadow-lg">
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{occupation}</p>
        </div>
      </div>
      <p className="text-gray-600">{content}</p>
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
