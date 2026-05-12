interface PageTitleProps {
  text: string;
}

export default function PageTitle({ text }: PageTitleProps) {
  return <h1 className="text-4xl font-black mt-8 mb-6">{text}</h1>;
}
