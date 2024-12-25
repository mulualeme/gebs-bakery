// eslint-disable-next-line react/prop-types
function SocialMediaButton({ icon: Icon, label }) {
  return (
    <button
      className="rounded-full border-2 border-primary p-2 text-2xl text-primary duration-200 hover:bg-primary hover:text-white"
      aria-label={label}
    >
      <Icon />
    </button>
  );
}

export default SocialMediaButton;
