import Image from "next/image";

export function IntroSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">
            The Resort
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl text-forest font-light mb-8">
            Where the River Meets the Wild
          </h2>

          <div className="w-16 h-px bg-gold mb-8" />

          <p className="text-sand text-lg leading-relaxed mb-6">
            Perched on the banks of the Athi River in Thika East,
            Rocky River Resort offers an intimate escape where
            nature and comfort meet.
          </p>

          <p className="text-sand leading-relaxed">
            Wake to flowing water, relax beside the pool,
            dine overlooking the river and experience one
            of Kenya's hidden gems.
          </p>
        </div>

        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/images/river.jpg"
            alt="Rocky River"
            fill
            sizes="(max-width:768px)100vw,50vw"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}