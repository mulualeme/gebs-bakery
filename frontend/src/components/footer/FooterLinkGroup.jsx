const FooterLinkGroup = ({ title, children }) => {
  return (
    <div className="px-4 py-8">
      <h3 className="mb-5 text-xl font-bold text-white">{title}</h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
};

export default FooterLinkGroup;
