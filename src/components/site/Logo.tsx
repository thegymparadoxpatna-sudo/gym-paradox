import { Link } from "@tanstack/react-router";

type LogoProps = {
  size?: number;
  className?: string;
  linked?: boolean;
};

export function Logo({ size = 40, className = "", linked = true }: LogoProps) {
  const img = (
    <img
      src="/logo.png"
      alt="The Gym Paradox"
      width={size}
      height={size}
      style={{ height: size, width: size }}
      className={`block object-contain transition-opacity duration-300 hover:opacity-85 ${className}`}
    />
  );
  if (!linked) return img;
  return (
    <Link to="/" aria-label="The Gym Paradox — Home" className="inline-flex items-center pr-2">
      {img}
    </Link>
  );
}
