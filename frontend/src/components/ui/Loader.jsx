/**
 * Loader Component
 *
 * Props:
 * - size
 */

function Loader({ size = 10 }) {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-gray-300 border-t-black h-${size} w-${size}`}
    />
  );
}

export default Loader;