import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { id: "shop", label: "Shop", href: "/#products" },
  { id: "ethos", label: "Ethos", href: "#ethos" },
  { id: "login", label: "Login", href: "/login" },
  { id: "register", label: "Register", href: "/register" },
];

const socialLinks = [
  { id: "instagram", icon: FaInstagram, href: "#" },
  { id: "facebook", icon: FaFacebookF, href: "#" },
  { id: "twitter", icon: FaTwitter, href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-5 py-16 grid gap-12 lg:grid-cols-3">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-secondary">
            NutriGren
          </p>
          <h3 className="text-3xl font-display">
            Modern mithai jars, but make it functional.
          </h3>
          <p className="text-base text-background/80">
            Family-owned micro-bakery in Bengaluru. We only ship what we’d send
            to our own dinner table.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-4">Quick links</h4>
          <ul className="space-y-3 text-background/80">
            {quickLinks.map((link) => (
              <li key={link.id}>
                {link.href.startsWith("/") ? (
                  <Link className="hover:text-background" to={link.href}>
                    {link.label}
                  </Link>
                ) : (
                  <a className="hover:text-background" href={link.href}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <h4 className="text-xl font-semibold">Stay in touch</h4>
          <p className="text-background/80">
            Join the drop list for flavor restocks & weekend farmer’s market
            pop-ups.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 rounded-full px-5 py-3 text-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="bg-secondary text-secondary-foreground rounded-full px-6 py-3 font-semibold hover:bg-secondary/80 transition"
            >
              Notify me
            </button>
          </form>
          <div className="flex gap-4 text-xl">
            {socialLinks.map(({ id, icon: Icon }) => (
              <a
                key={id}
                href="#"
                className="w-10 h-10 rounded-full border border-background/40 flex items-center justify-center hover:bg-background hover:text-foreground transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-background/70">
        © {new Date().getFullYear()} NutriGren Collective. All slow baked.
      </div>
    </footer>
  );
}
