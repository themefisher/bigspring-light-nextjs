import config from "@config/config.json";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { base_url, logo, logo_width, logo_height, logo_text, title } =
    config.site;

  return (
    <Link
      href={base_url}
      className="navbar-brand block py-1"
      style={{
        height: logo_height.replace("px", "") + "px",
        width: logo_width.replace("px", "") + "px",
        display: "flex",
      }}
    >
      {src || logo ? (
        <Image
          width={logo_width.replace("px", "") * 2}
          height={logo_height.replace("px", "") * 2}
          src={src ? src : logo}
          alt={title}
          priority
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
