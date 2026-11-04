import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { LogoMark } from "./Logo";

const SOCIALS = [
  { href: "https://www.facebook.com", label: "Facebook", icon: <FaFacebookF /> },
  { href: "https://x.com", label: "X", icon: <FaXTwitter /> },
  { href: "https://www.instagram.com", label: "Instagram", icon: <FaInstagram /> },
  { href: "https://www.youtube.com", label: "YouTube", icon: <FaYoutube /> },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <LogoMark />
            <span className="logo-word">Pashe</span>
          </div>
          <p className="footer-text">
            Pashe means &ldquo;beside you&rdquo; in Bangla. It helps neighbours post, find and join
            community service events close to home.
          </p>
        </div>
        <div>
          <h2 className="footer-title">Explore</h2>
          <ul className="footer-list">
            <li><Link href="/events">Upcoming Events</Link></li>
            <li><Link href="/events/create">Create Event</Link></li>
            <li><Link href="/joined-events">Joined Events</Link></li>
            <li><Link href="/manage-events">Manage Events</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Contact</h2>
          <ul className="footer-list footer-contact">
            <li><LuMapPin aria-hidden="true" /> Mirpur, Dhaka, Bangladesh</li>
            <li><LuMail aria-hidden="true" /> <a href="mailto:hello@pashe.example">hello@pashe.example</a></li>
            <li><LuPhone aria-hidden="true" /> <a href="tel:+8801700000000">+880 1700 000000</a></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Follow us</h2>
          <div className="footer-social">
            {SOCIALS.map((social) => (
              <a aria-label={social.label} href={social.href} key={social.label} rel="noreferrer" target="_blank">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="container">&copy; {new Date().getFullYear()} Pashe. Built for neighbours who help.</p>
      </div>
    </footer>
  );
}
