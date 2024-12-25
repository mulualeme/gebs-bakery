const SocialMediaButton = ({ icon: Icon, label }) => {
  return (
    <button
      aria-label={label}
      className="rounded-full bg-gray-100 p-3 text-gray-600 transition-all hover:bg-primary hover:text-white"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};

export default SocialMediaButton;
