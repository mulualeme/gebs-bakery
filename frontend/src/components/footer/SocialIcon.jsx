const SocialIcon = ({ href, icon: Icon, label }) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="text-gray-300 transition-colors hover:text-primary"
    >
      <Icon className="h-6 w-6" />
    </a>
  );
};

export default SocialIcon;
