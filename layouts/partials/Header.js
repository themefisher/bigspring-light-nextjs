import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
// import "/node_modules/flag-icons/css/flag-icons.min.css";
// import { Fragment } from 'react'
// import { Menu, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Header = () => {
  //router
  const router = useRouter();

  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  // show/hide header
  const [isShow, setIsShow] = useState(false)

  // logo source
  const { logo } = config.site;
  const { enable, label, link, scroll_id } = config.nav_button;

  let lastScrollTop = 0;
  const handleScroll = () => {
    let clientHeight = document.documentElement.clientHeight // 可視區域高度
    let scrollTop = document.documentElement.scrollTop; // 滾動條滾動高度
    let scrollHeight = document.documentElement.scrollHeight; // 滾動內容高度
    // console.log("scrollTop", scrollTop, 'lastScrollY', lastScrollTop, 'clientHeight', clientHeight, 'scrollHeight', scrollHeight);
    if (scrollTop < 77 ) return;
    
    if (scrollTop > lastScrollTop) {
      setIsShow(true)
      setNavOpen(false)
    } else {
      setIsShow(false)
      setNavOpen(false)
    }
    lastScrollTop = document.documentElement.scrollTop
    // 判斷是否滾動到底部
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("滾動到底部");
    }
  }

  useEffect(() => {
    // 監聽
    window.addEventListener('scroll', handleScroll)
    // 清除
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      console.warn("Element with ID '" + id + "' not found.");
    }
  };

  return (
    <header className={`header show ${isShow && 'hide'}`}>
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Logo src={logo} />
        </div>

        {/* navbar toggler */}
        <button
          id="show-button"
          className="order-2 flex cursor-pointer items-center md:hidden md:order-1"
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
          className={`order-3 md:order-1 flex overflow-hidden md:overflow-visible ${
            navOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <ul className="navbar-nav block w-full md:flex md:w-auto lg:space-x-2">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                <li className="nav-item">
                  <button
                    href={menu.url}
                    onClick={() => scrollTo(menu.id)}
                    // className={`nav-link block ${
                    //   router.asPath === menu.url ? "nav-link-active" : ""
                    // }`}
                    className={`nav-link block`}
                  >
                    {menu.name}
                  </button>
                </li>
                {/* {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className="nav-dropdown-link block"
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
                      className={`nav-link block ${
                        router.asPath === menu.url ? "nav-link-active" : ""
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )} */}
              </React.Fragment>
            ))}
            {enable && (
              <li className="md:hidden">
                <button
                  className="btn btn-primary z-0 py-[14px]"
                  href={link}
                  rel=""
                  onClick={() => scrollTo(scroll_id)}
                >
                  {label}
                </button>
              </li>
            )}
          </ul>
          {/* <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Options
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        // className={classNames(
                        //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        //   'block px-4 py-2 text-sm'
                        // )}
                      >
                        Account settings
                        <span class="fi fi-gr fis"></span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        // className={classNames(
                        //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        //   'block px-4 py-2 text-sm'
                        // )}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        // className={classNames(
                        //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        //   'block px-4 py-2 text-sm'
                        // )}
                      >
                        License
                      </a>
                    )}
                  </Menu.Item>
                  <form method="POST" action="#">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          // className={classNames(
                          //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          //   'block w-full px-4 py-2 text-left text-sm'
                          // )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu> */}

          {enable && (
            <div className="d-flex order-1 ml-auto hidden min-w-[200px] items-center justify-end md:ml-0 md:flex md:order-2">
              <button className="btn btn-primary z-0 py-[14px]"
                href={link}
                rel=""
                onClick={() => scrollTo(scroll_id)}
              >
                {label}
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
