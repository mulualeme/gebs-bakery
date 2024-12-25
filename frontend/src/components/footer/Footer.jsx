import { FaFacebook, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Croissant } from "lucide-react";
import FooterLink from "./FooterLink";
import FooterLinkGroup from "./FooterLinkGroup";
import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto">
        <div className="grid border-t border-gray-800 py-12 md:grid-cols-4 md:gap-8">
          {/* Brand and Social */}
          <div className="space-y-6 px-4">
            <a href="/" className="flex items-center gap-2">
              <Croissant className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold uppercase tracking-wider text-white">
                Gebs<span className="text-primary">Bakery</span>
              </span>
            </a>
            <p className="text-gray-300">
              Stay connected with us on social media for the latest updates and
              delicious treats. Follow us for fresh bakes and special offers!
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon
                href="https://maps.google.com"
                icon={FaMapMarkerAlt}
                label="Find us on Google Maps"
              />
              <SocialIcon
                href="https://instagram.com"
                icon={FaInstagram}
                label="Follow us on Instagram"
              />
              <SocialIcon
                href="https://facebook.com"
                icon={FaFacebook}
                label="Like us on Facebook"
              />
              <SocialIcon
                href="https://twitter.com"
                icon={FaXTwitter}
                label="Follow us on Twitter"
              />
            </div>
          </div>

          {/* Links Grid */}
          <div className="col-span-3 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FooterLinkGroup title="Important Links">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/menu">Menu</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/login">Login</FooterLink>
            </FooterLinkGroup>

            <FooterLinkGroup title="Company">
              <FooterLink href="/services">Our Services</FooterLink>
              <FooterLink href="/success-stories">Success Stories</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </FooterLinkGroup>

            <FooterLinkGroup title="Resources">
              <FooterLink href="/products">Our Products</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/catering">Catering</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Gebs Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
