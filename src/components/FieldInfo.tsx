export default function FieldInfo({ errors }: { errors: any[] }) {
  return (
    <>
      {errors.map((error, i) => (
        <div key={i} className="text-rose-600">
          {error?.message}
        </div>
      ))}
    </>
  )
}
