export function FlashMessage({ message }) {
  if (!message) return null;

  return (
    <div className="mb-6 rounded-2xl bg-green-100 px-5 py-4 text-green-700">
      {message}
    </div>
  );
}