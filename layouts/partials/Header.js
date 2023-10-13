import React, { useState } from "react";
import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Link from "next/link";
import { useRouter } from "next/router";
import Social from "@layouts/components/Social";
import social from "@config/social.json"
import StripeBuyButton from "@layouts/components/StripeBuyButton"

const Header = () => {
  //router
  const router = useRouter();

  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  // logo source
  const { logo } = config.site;
  const { enable, label, link } = config.nav_button;

  return (
    <header className="header">

      <nav className="container navbar">

        {/* logo */}
        <div className="order-0">
          <Logo src={logo} />
        </div>

        {/* social icons */}
        <Social source={social} className="hidden md:block md:absolute header-social-icons top-16 left-16 " />


        {/* navbar toggler */}
        <button
          id="show-button"
          className="flex items-center order-2 cursor-pointer md:hidden md:order-1"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          ) : (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div
          id="nav-menu"
          className={`order-3 md:order-1 ${navOpen ? "max-h-[1000px]" : "max-h-0"
            }`}
        >
          <ul className="block w-full navbar-nav md:flex md:w-auto lg:space-x-2">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="relative nav-item nav-dropdown group">
                    <span className="inline-flex items-center nav-link">
                      {menu.name}
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="hidden nav-dropdown-list group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className="block nav-dropdown-link"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      onClick={() => setNavOpen(false)}
                      className={`nav-link block ${router.asPath === menu.url ? "nav-link-active" : ""
                        }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            <Social source={social} className="md:hidden header-social-icons py-[14px]" />
            {enable && (
              <li className="md:hidden">
                <Link
                  className="btn btn-primary z-0 py-[14px]"
                  href={link}
                  rel=""
                >
                  {label}
                </Link>
              </li>
            )}
          </ul>
        </div>
        {enable && (
          <div className="d-flex order-1 ml-auto hidden min-w-[200px] items-center justify-end md:ml-0 md:flex md:order-2">
            {/* <StripeBuyButton className="btn btn-primary z-0 py-[14px]" rel="external" /> */}
            <Link className="btn btn-primary z-0 py-[14px]" href={link} rel="">
              {label}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
