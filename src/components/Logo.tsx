interface LogoProps {
  size: string;
}

export default function Logo({ size }: LogoProps) {
  return (
    <span
      className="inline-block font-extrabold tracking-tighter text-violet-700 dark:text-violet-200"
      style={{
        fontSize: size,
      }}
    >
      Streaks<span className="text-violet-900 dark:text-violet-400">.fyi</span>
    </span>
  );
}
