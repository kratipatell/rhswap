"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <span
        aria-hidden
        className="inline-block h-10 w-10 rounded-[14px] bg-volt shadow-[0_0_32px_rgba(204,255,0,0.4)]"
      />
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-volt">
        Something went wrong
      </p>
      <h1 className="mt-3 max-w-md text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        The app hit an unexpected error
      </h1>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zinc-400">
        Please try again. If the problem persists, reload the page or come back
        in a few minutes.
      </p>
      {error?.digest ? (
        <p className="mt-2 text-xs text-zinc-600">Error ref: {error.digest}</p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-volt px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
      >
        Try again
      </button>
    </div>
  );
}
