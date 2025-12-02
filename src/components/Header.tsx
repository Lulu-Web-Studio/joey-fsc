"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {ChevronDown, Mail, MapPin, Menu, Phone, X} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {FunctionComponent, useEffect, useState, useRef} from "react";
import Button from "./Button";
import {usePathname} from "next/navigation";
import {config} from "@/config";
import {SERVICES} from "@/config/services";

interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
  subItems?: {name: string; href: string}[];
}

// Auto-generate services submenu from config
const servicesSubItems = Object.entries(SERVICES).map(([slug, data]) => ({
  name: data.name,
  href: `/service/${slug}`,
}));

const menuItems: MenuItem[] = [
  {
    name: "For Patients",
    href: "",
    subItems: [
      {name: "What to Expect", href: "/for-patients/what-to-expect"},
      {name: "Pre Op", href: "/for-patients/pre-op"},
      {name: "Post Op", href: "/for-patients/post-op"},
    ],
  },
  {
    name: "Services",
    href: "/services",
    subItems: servicesSubItems, // ✅ Auto-generated from SERVICES config
  },

  {
    name: "About",
    href: "/about",
    subItems: [
      {name: "Meet the Doctors", href: "/about/meet-the-doctors"},
      {name: "Meet the Team", href: "/about/meet-the-team"},
      {name: "About FSC", href: "/about"},
    ],
  },
  // {
  //   name: "Learn",
  //   href: "",
  //   subItems: [
  //     {name: "Articles", href: "/articles"},
  //     {name: "FAQ", href: "/faq"},
  //   ],
  // },
  {name: "Contact", href: "/contact"},
  {name: "Referral Form", href: "/referral-form.pdf"},
];

export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.values(dropdownRefs.current).every(
        ref => ref && !ref.contains(event.target as Node)
      );

      if (clickedOutside) {
        setOpenDesktopMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDesktopMenu = (name: string) => {
    setOpenDesktopMenu(openDesktopMenu === name ? null : name);
  };

  const toggleMobileSubMenu = (name: string) => {
    setOpenMobileMenu(openMobileMenu === name ? null : name);
  };

  // Reset mobile menu state when sheet closes
  useEffect(() => {
    if (!isSheetOpen) {
      setOpenMobileMenu(null);
    }
  }, [isSheetOpen]);

  return (
    <nav className="z-50">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center">
        {menuItems.map((item) => (
          <div
            key={item.href}
            className={cn(
              "ml-4 md:ml-8",
              item.subItems && "relative"
            )}
            ref={(el) => {
              if (item.subItems) {
                dropdownRefs.current[item.name] = el;
              }
            }}
          >
            {item.subItems ? (
              <button
                onClick={() => toggleDesktopMenu(item.name)}
                className={cn(
                  "hover:text-primary text-bold-22 font-semibold flex items-center transition-colors duration-200",
                  pathname === item.href && "font-semibold",
                  "focus:outline-none focus:text-primary"
                )}
              >
                {item.name}
                <ChevronDown
                  className={cn(
                    "ml-1 h-4 w-4 transition-transform duration-200",
                    openDesktopMenu === item.name && "rotate-180"
                  )}
                />
              </button>
            ) : (
              <a
                href={item.href}
                target={item.openInNewTab ? "_blank" : "_self"}
                className={cn(
                  "hover:text-primary text-bold-22 font-semibold transition-colors duration-200",
                  pathname === item.href && "font-semibold"
                )}
              >
                {item.name}
              </a>
            )}

            {item.subItems && (
              <div className={cn(
                "absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg py-3 px-2 border border-gray-100",
                "transform transition-all duration-200 origin-top z-50",
                // Two-column grid for services menu
                item.name === "Services" ? "grid grid-cols-2 gap-1 min-w-[500px]" : "min-w-48",
                openDesktopMenu === item.name
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}>
                {item.subItems.map((subItem, idx) => (
                  <div
                    className="hover:bg-primary-teal m-1 rounded-md transition-colors duration-300 ease-in-out"
                    key={idx}
                  >
                    <a
                      href={subItem.href}
                      className={cn(
                        "block px-4 py-2 text-md font-medium text-black hover:text-white transition-colors duration-150",
                        pathname === subItem.href && "font-semibold"
                      )}
                      onClick={() => setOpenDesktopMenu(null)}
                    >
                      {subItem.name}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
              aria-label="Open menu"
            >
              <Menu size="24" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-background [&>button]:hidden text-black border-none shadow-2xl w-full max-w-full overflow-y-auto"
          >
            <SheetHeader className="text-left border-b border-white/20 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Menu</h2>
                <button
                  onClick={() => setIsSheetOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-md transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X size="20" />
                </button>
              </div>
            </SheetHeader>

            <SheetDescription asChild>
              <nav className="space-y-2 text-black">
                {menuItems.map((item, idx) => (
                  <div key={idx}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleMobileSubMenu(item.name)}
                          className={cn(
                            "flex items-center justify-between w-full py-3 px-4 rounded-lg text-lg transition-all duration-200",
                            "hover:bg-white/20",
                            openMobileMenu === item.name && "bg-white/20"
                          )}
                        >
                          <span className="font-semibold">{item.name}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              openMobileMenu === item.name && "rotate-180"
                            )}
                          />
                        </button>

                        <div className={cn(
                          "overflow-auto transition-all duration-300 ease-in-out",
                          openMobileMenu === item.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}>
                          <div className="pl-6 pt-2 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={cn(
                                  "block py-2 px-4 rounded-md text-base transition-all duration-200",
                                  "hover:bg-white/10 hover:translate-x-1",
                                  pathname === subItem.href && "font-bold text-primary-teal bg-white/10"
                                )}
                                onClick={() => {
                                  setOpenMobileMenu(null);
                                  setIsSheetOpen(false);
                                }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        target={item.openInNewTab ? "_blank" : "_self"}
                        className={cn(
                          "block py-3 px-4 rounded-lg text-lg transition-all duration-200 font-semibold",
                          "hover:bg-white/20 hover:translate-x-2",
                          pathname === item.href && "font-bold bg-white/20"
                        )}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Call to Action Button in Mobile */}
                <div className="pt-6 mt-6 border-t border-white/20">
                  <Link
                    href="/contact"
                    className="block py-4 px-6 bg-primary-teal rounded-lg text-lg font-semibold transition-all duration-200 text-white text-center hover:bg-gray-100 hover:scale-105 shadow-lg"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Schedule Today
                  </Link>
                </div>




                <div className="pt-8 mt-8 border-t border-white/20">
                  <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:(203) 261-7800"
                      className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    >
                      <Phone className="text-primaryCyan" size="18" />
                      <span>{config.officePhone}</span>
                    </a>
                    <a
                      href={`mailto:${config.officeEmail}`}
                      className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    >
                      <Mail className="text-primaryOrange" size="18" />
                      <span>{config.officeEmail}</span>
                    </a>
                    <div className="flex items-center space-x-3 py-2 px-4">
                      <MapPin className="text-red-700" size="18" />
                      <span>Trumbull, CT</span>
                    </div>
                  </div>
                </div>

              </nav>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const Header: FunctionComponent = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={cn(
        "fixed top-0 left-0 w-full flex items-center justify-between px-8 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-md bg-background/70 shadow-lg" : "bg-transparent"
      )}
    >
      <Link href="/" className="transform hover:scale-105 transition-transform duration-200">
        <Image
          src="/images/Group.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-24 h-24 md:w-32 md:h-32 py-0"
          priority
        />
      </Link>
      <Navigation />
      <div className="hidden md:flex items-center">
        <Button text={"Schedule Today"} href="/contact" />
      </div>
    </section>
  );
};