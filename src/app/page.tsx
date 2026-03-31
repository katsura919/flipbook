import FlipBook from "@/components/flipbook";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Flipbook Demo
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          This is a minimal sample to verify react-pageflip is working.
        </p>
      </div>
      <FlipBook />
    </main>
  );
}
