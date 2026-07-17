import { useEffect, useState } from "react";

export function FlashMessage({ message }) {
  const [visibleMessage, setVisibleMessage] = useState(message);

  useEffect(() => {
    setVisibleMessage(message);

    if (!message) return;

    const timer = setTimeout(() => {
      setVisibleMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!visibleMessage) return null;

  return (
    <div className="mb-6 rounded-2xl bg-green-100 px-5 py-4 text-green-700">
      {visibleMessage}
    </div>
  );
}