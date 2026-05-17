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
      className="cursor-pointer rounded-md bg-(--clr-btn-primary) p-3 text-xl font-bold text-slate-50 mt-3"
      disabled={!canSubmit}
    >
      {isSubmitting ? "..." : label}
    </button>
  );
}
