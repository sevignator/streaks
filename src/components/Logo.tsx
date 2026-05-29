interface LogoProps {
  size: string;
}

export default function Logo({ size }: LogoProps) {
  return (
    <span
      className="inline-block font-extrabold tracking-tighter text-(--clr-accent)"
      style={{
        fontSize: size,
      }}
    >
      Streaks
    </span>
  );
}
