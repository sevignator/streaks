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
      className="bg-violet-600 rounded-md p-3 text-xl text-slate-50 font-bold cursor-pointer"
      disabled={!canSubmit}
    >
      {isSubmitting ? '...' : label}
    </button>
  );
}
