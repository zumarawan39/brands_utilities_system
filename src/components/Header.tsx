import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-foreground/10 flex items-center justify-center">
            <Image src="/file.svg" alt="logo" width={20} height={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Brand Name</h1>
            <p className="text-xs text-foreground/60">Tagline goes here</p>
          </div>
        </div>
        <nav className="hidden sm:flex gap-6 items-center">
          <a className="text-sm hover:underline" href="#about">
            About
          </a>
          <a className="text-sm hover:underline" href="#services">
            Services
          </a>
          <a className="text-sm hover:underline" href="#contact">
            Contact
          </a>
          <a className="ml-2 px-3 py-1 rounded-full bg-foreground text-background text-sm" href="#">
            Get started
          </a>
        </nav>
      </div>
    </header>
  );
}
