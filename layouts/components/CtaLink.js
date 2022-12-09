import Image from "next/image";
import Link from "next/link";

const CtaLink = ({ children, href = "#" }) => {
  return (
    <Link
      className="cta-link inline-flex items-center text-primary"
      href={href}
    >
      {children}
      <Image
        className="ml-1"
        src="/svgs/arrow-right.svg"
        width={18}
        height={14}
        alt="arrow"
      />
    </Link>
  );
};

export default CtaLink;
