import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "/logo2.png";
import Button from "./common/Button";


const links = [
  { label: "Shop", href: "/#products" },
  { label: "Ethos", href: "/#ethos" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const avatarSrc =
    user?.picture?.replace?.("s96-c", "s80-c") ||
    `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
      user?.name || "Guest"
    )}`;

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <nav className="max-w-6xl mx-auto rounded-full border border-white/60 bg-white/80 backdrop-blur-2xl px-5 sm:px-8 py-3 flex items-center justify-between shadow-soft">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="NutriGren" className="w-12" />
          <span className="hidden sm:inline text-lg font-semibold text-heading">
            NutriGren
          </span>
        </Link>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-subtle">
          {links.map((link) => (
            <li key={link.label}>
              <Link className="hover:text-heading transition" to={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li>
                <Link className="hover:text-heading transition" to="/orders">
                  Orders
                </Link>
              </li>
              <li>
                <Link className="hover:text-heading transition" to="/admin">
                  Admin
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}
              onFocus={() => setProfileMenuOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setProfileMenuOpen(false);
                }
              }}
            >
              <button
                className="w-11 h-11 rounded-full border-2 border-primary overflow-hidden"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={profileMenuOpen}
              >
                <img src={avatarSrc} alt={user.name} className="w-full h-full object-cover" />
              </button>
              <div
                className={`absolute  top-full bg-card border border-primary/15 rounded-2xl shadow-soft min-w-[200px] transition-all duration-150 ${profileMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
                  }`}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-muted rounded-t-2xl"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 hover:bg-muted border-t border-primary/10"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Order history
                </Link>
                <Link
                  to="/admin"
                  className="block px-4 py-3 hover:bg-muted border-t border-primary/10"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-muted rounded-b-2xl border-t border-primary/10"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="text-sm">Create account</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <div
        className={`md:hidden mt-3 rounded-3xl border border-primary/20 bg-white/95 backdrop-blur-xl shadow-soft px-5 py-4 space-y-4 ${menuOpen ? "block" : "hidden"}`}
      >
        <ul className="space-y-3 text-sm font-medium text-subtle">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="block py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li>
                <Link
                  to="/orders"
                  className="block py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="block py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="flex flex-col gap-2">
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Profile
                </Button>
              </Link>
              <Button className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <Button className="w-full">Create account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
