const FooterLink = ({ href, children }) => {
  return (
    <li>
      <a
        href={href}
        className="text-gray-300 transition-colors hover:text-primary"
      >
        {children}
      </a>
    </li>
  );
};

export default FooterLink;
