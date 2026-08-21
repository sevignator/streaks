import clsx from 'clsx';

import Spinner from '#/components/Spinner';

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
      className="btn"
      data-btn-type="primary"
      disabled={!canSubmit}
    >
      <div className={clsx(isSubmitting ? 'invisible' : 'visible')}>
        {label}
      </div>
      <div className={clsx(isSubmitting ? 'visible' : 'invisible')}>
        <Spinner />
      </div>
    </button>
  );
}
