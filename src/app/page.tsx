import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="grid gap-8 items-center md:grid-cols-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional, responsive layout</h2>
          <p className="text-foreground/70 mb-6">
            This starter provides a clean, responsive structure so you can focus on
            adding your brand styles and content. It includes a header, footer, and a
            flexible container.
          </p>
          <div className="flex gap-3">
            <a className="px-4 py-2 rounded-md bg-foreground text-background font-medium" href="#contact">
              Get in touch
            </a>
            <a className="px-4 py-2 rounded-md border border-gray-200" href="#about">
              Learn more
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image src="/next.svg" alt="decor" width={300} height={80} />
        </div>
      </section>

      <section id="services" className="mt-16 grid gap-8 sm:grid-cols-3">
        {[
          { title: "Design", desc: "Clean UI and branding guidance." },
          { title: "Development", desc: "Modern stack - accessible and fast." },
          { title: "Delivery", desc: "Ready for production deployment." },
        ].map((s) => (
          <div key={s.title} className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-foreground/70">{s.desc}</p>
          </div>
        ))}
      </section>

      <section id="contact" className="mt-16">
        <div className="rounded-lg border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="font-semibold">Ready to start your project?</h4>
            <p className="text-sm text-foreground/70">Send a message and we'll get back within 24 hours.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <a className="px-4 py-2 rounded-md bg-foreground text-background" href="#">
              Contact us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
