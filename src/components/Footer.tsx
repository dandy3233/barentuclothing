import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaTiktok, FaTelegramPlane } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold">BARENTU</h2>
            <p className="text-sm text-primary-foreground/80">
              Crafted with Identity.
              <br />
              Designed for the Bold.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>contact@barentuclothing.com</li>
              <li>Instagram: @barentuclothing</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-lg mb-4">Join the Barentu World</h3>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" size="sm">
                Join
              </Button>
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/barentu.clothing?igsh=aXpvaTE5MzQ1Z3Nw&utm_source=qr"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>

              {/* Tiktok */}
              <a
                href="https://www.tiktok.com/@barentu.clothing?_t=ZS-90UhVuGdVps&_r=1"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-transform hover:scale-110"
                aria-label="TikTok"
              >
                <FaTiktok size={20} />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/barentucollection"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-transform hover:scale-110"

                aria-label="Telegram"
              >
                <FaTelegramPlane size={20} />
              </a>

              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-transform hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>© 2025 BARENTU CLOTHING. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
