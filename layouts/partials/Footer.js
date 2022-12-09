import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import Button from "@layouts/components/Button";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;
  const { footer } = menu;
  return (
    <footer className="section bg-theme-light pb-0">
      <div className="container">
        {/* footer menu */}
        <div className="row">
          {footer.map((col) => {
            return (
              <div className="mb-12 sm:col-6 lg:col-3" key={col.name}>
                <h4>{col.name}</h4>
                <ul className="mt-6">
                  {col?.menu.map((item) => (
                    <li className="mb-1" key={item.text}>
                      <Button href={item.url} rel="">
                        {item.text}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {/* social icons */}
          <div className="md-12 sm:col-6 lg:col-3">
            <Link href="/">
              <Image
                src={config.site.logo}
                width={config.site.logo_width}
                height={config.site.logo_height}
                alt=""
              />
            </Link>
            <p className="mt-3 mb-6">
              Lorem ipsum dolor sit amet, consectetur elit. Consjat tristique
              eget amet, tempus eu at cttur.
            </p>
            <Social source={social} className="social-icons mb-8" />
          </div>
        </div>
        {/* copyright */}
        <div className="border-t border-gray-300 py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
