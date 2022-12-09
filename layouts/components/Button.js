import Link from "next/link";

const Button = ({ className, children, href, rel }) => {
  return (
    <Link className={className} href={href} rel={rel}>
      {children}
    </Link>
  );
};

export default Button;
