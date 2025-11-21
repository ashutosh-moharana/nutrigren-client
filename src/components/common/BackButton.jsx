import { useLocation, useNavigate } from "react-router-dom";

export default function BackButton({
  fallback = "/",
  warnOnPaths = ["/checkout"],
  confirmMessage = "Leaving checkout will cancel your order. Do you still want to go back?",
  useHistoryFirst = false,
  className = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldWarn = warnOnPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const handleBack = () => {
    if (shouldWarn) {
      const shouldLeave = window.confirm(confirmMessage);
      if (!shouldLeave) return;
      navigate(fallback, { replace: false });
      return;
    }

    if (useHistoryFirst && window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallback, { replace: false });
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${className}`}
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  );
}