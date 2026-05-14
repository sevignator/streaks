interface PageTitleProps {
  text: string;
}

export default function PageTitle({ text }: PageTitleProps) {
  return <h1 className="mb-6 text-4xl font-black">{text}</h1>;
}
