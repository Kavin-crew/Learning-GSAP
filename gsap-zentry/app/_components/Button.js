export default function Button({ id, title, LeftIcon, containerClass }) {
  return (
    <button
      id={id}
      className={`group relative w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {LeftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {title}
      </span>
    </button>
  );
}
