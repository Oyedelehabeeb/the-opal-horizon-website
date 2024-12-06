import Image from "next/image";
import about1 from "@/public/about-1.jpg";
import { getCabins } from "../_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "About",
};

// Incremental Static Regeneration
export const revalidate = 86400;

export default async function Page() {
  const cabins = await getCabins();
  const numberOfCabins = cabins?.length;

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-x-16 lg:gap-x-24 gap-y-12 md:gap-y-16 lg:gap-y-32 text-base sm:text-lg items-center">
        <div className="md:col-span-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
            Welcome to The Opal Suite
          </h1>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <p>
              Where nature&apos;s beauty and comfortable living blend
              seamlessly. Hidden away in the heart of the Italian Dolomites,
              this is your paradise away from home. But it&apos;s not just about
              the luxury cabins. It&apos;s about the experience of reconnecting
              with nature and enjoying simple pleasures with family.
            </p>
            <p>
              Our {numberOfCabins} luxury cabins provide a cozy base, but the
              real freedom and peace you&apos;ll find in the surrounding
              mountains. Wander through lush forests, breathe in the fresh air,
              and watch the stars twinkle above from the warmth of a campfire or
              your hot tub.
            </p>
            <p>
              This is where memorable moments are made, surrounded by
              nature&apos;s splendor. It&apos;s a place to slow down, relax, and
              feel the joy of being together in a beautiful setting.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 order-first md:order-none">
          <Image
            src={about1}
            alt="Family sitting around a fire pit in front of cabin"
            quality={80}
            placeholder="blur"
            className="w-full h-auto"
          />
        </div>

        <div className="aspect-square relative md:col-span-2 order-2">
          <Image
            src="/about-2.jpg"
            fill
            className="object-cover"
            alt="Family that manages The Opal Suite"
          />
        </div>

        <div className="md:col-span-3 order-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
            Managed by our family since 1962
          </h1>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <p>
              Since 1962, The Opal Suite has been a cherished family-run
              retreat. Started by our grandparents, this haven has been nurtured
              with love and care, passing down through our family as a testament
              to our dedication to creating a warm, welcoming environment.
            </p>
            <p>
              Over the years, we&apos;ve maintained the essence of The Opal
              Suite, blending the timeless beauty of the mountains with the
              personal touch only a family business can offer. Here, you&apos;re
              not just a guest; you&apos;re part of our extended family. So join
              us at The Opal Suite soon, where tradition meets tranquility, and
              every visit is like coming home.
            </p>

            <div>
              <Link
                href="/cabins"
                className="inline-block mt-4 bg-accent-500 px-6 sm:px-8 py-3 sm:py-5 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Explore our luxury cabins
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
