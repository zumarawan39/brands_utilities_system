export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 dark:border-gray-900 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-foreground/70">© {new Date().getFullYear()} Brand Name. All rights reserved.</div>
        <div className="flex gap-4 text-sm">
          <a className="hover:underline" href="#privacy">Privacy</a>
          <a className="hover:underline" href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
