import Spinner from "#/components/Spinner";

interface SubmitButtonProps {
  label: string;
  canSubmit: boolean;
  isSubmitting: boolean;
}

export default function SubmitButton({
  label,
  canSubmit,
  isSubmitting,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="mt-3 grid h-12 cursor-pointer place-items-center rounded-md bg-(--clr-btn-primary) p-0 text-xl font-bold text-slate-50"
      disabled={!canSubmit}
    >
      {isSubmitting ? <Spinner /> : label}
    </button>
  );
}
