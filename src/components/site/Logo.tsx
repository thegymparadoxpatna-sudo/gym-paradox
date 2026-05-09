import { Link } from "@tanstack/react-router";

type LogoProps = {
  size?: number;
  className?: string;
  linked?: boolean;
  withText?: boolean;
  textClassName?: string;
};

export function Logo({ size, className = "", linked = true, withText = false, textClassName = "" }: LogoProps) {
  const sizeStyle = size ? { height: size, width: size } : undefined;
  const img = (
    <img
      src="/logo.png"
      alt="The Gym Paradox"
      width={size ?? 40}
      height={size ?? 40}
      style={sizeStyle}
      className={`block object-contain transition-opacity duration-300 hover:opacity-85 ${className}`}
    />
  );
  const content = withText ? (
    <span className="inline-flex items-center gap-3">
      {img}
      <span className={`font-display tracking-tight leading-none ${textClassName}`}>
        The Gym Paradox
      </span>
    </span>
  ) : img;
  if (!linked) return content;
  return (
    <Link to="/" aria-label="The Gym Paradox — Home" className="inline-flex items-center pr-2">
      {content}
    </Link>
  );
}
