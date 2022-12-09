import Link from "next/link"

const Button = ({ href, type, rel, children }) => {
  return (
    <Link href={href} target="_blank" rel={`noopener noreferrer ${rel?(rel==="follow"?"":rel):"nofollow"}`} className={`btn mb-4 me-4 ${type === "outline"? "btn-outline-primary" : "btn-primary"}`}>
      {children}
    </Link>
  )
}

export default Button
