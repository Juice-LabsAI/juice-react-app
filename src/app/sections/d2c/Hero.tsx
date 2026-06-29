import { motion, useReducedMotion } from "motion/react";
import products from "../../../imports/d2c/hero-products-card.png";
import woman from "../../../imports/d2c/hero-woman-card.png";

/* D2C hero (Figma 624:305036). The headline runs large on the left; on desktop
   its last line ("launch toolkit") deliberately overlaps the product card and
   the founder portrait. The card is right-aligned, the orange "Moxie" pill
   bleeds off the right edge of the screen, and the portrait tucks into the gap
   between the headline and the card. Everything stacks on mobile. */
export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-[120px] pb-10 sm:pt-[140px] lg:pb-8">
      <div className="container-juice">
        <div className="relative lg:min-h-[500px]">
          {/* Headline + subtitle (on top of the imagery) */}
          <div className="relative z-10">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[clamp(2.75rem,8.6vw,8rem)] font-extrabold leading-[0.92] text-[#444]"
            >
              The Complete
              <br />
              D2C brand
              <br />
              launch toolkit
            </motion.h1>
            <p className="mt-8 font-body text-[clamp(1.5rem,3vw,2.75rem)] font-medium leading-[1.05] text-[#444]">
              Everything for D2C brands
              <br />
              within one workspace
            </p>
          </div>

          {/* Product image cluster */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ transformOrigin: "center" }}
            className="relative mx-auto mt-14 w-full max-w-[440px] sm:max-w-[520px] lg:absolute lg:right-0 lg:top-[6px] lg:z-[1] lg:mt-0 lg:w-[min(44vw,600px)] lg:max-w-none"
          >
            <div className="relative aspect-[606/489] w-full overflow-hidden rounded-xl bg-[#f3f3f3]">
              <img
                src={products}
                alt="Moxie haircare range on a teal tiled surface"
                className="size-full select-none object-cover"
                draggable={false}
              />
            </div>

            {/* Moxie pill — bleeds off the right edge of the screen */}
            <div className="absolute -top-4 right-3 flex items-center justify-center rounded-full border-2 border-white bg-[#f78146] px-7 py-3 shadow-md sm:px-[42px] sm:py-[18px] lg:right-[-72px] lg:top-[60px]">
              <span className="font-body text-[clamp(1.5rem,2.6vw,2.5rem)] font-normal leading-[0.9] text-white">
                Moxie
              </span>
            </div>

            {/* Founder portrait — tucks into the gap, overlapped by "toolkit" */}
            <div className="absolute -bottom-6 -left-2 h-[150px] w-[180px] overflow-hidden rounded-xl border-2 border-white bg-[#e9e6f2] shadow-lg sm:-left-4 lg:bottom-0 lg:left-[-118px] lg:h-[174px] lg:w-[208px]">
              <img
                src={woman}
                alt="Founder waving"
                className="size-full select-none object-cover object-center"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
