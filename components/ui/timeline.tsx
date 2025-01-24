"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import BoxReveal from "./box-reveal";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white  dark:bg-neutral-950  md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-8 md:px-0 lg:px-4 ">
        <BoxReveal boxColor={"#0BBB8A"} duration={1} >
          <div className="text-2xl mt-1 font-semibold md:text-3xl lg:text-4xl  mb-4 text-textprimary dark:text-white max-w-4xl">
            ដំណើរការរបស់<span className="text-primary">នាំផ្លូវ</span>
          </div>
        </BoxReveal>
        <BoxReveal boxColor={"#0BBB8A"} duration={1}>
        <p className="text-gray-600 dark:text-neutral-300 lg:text-xl md:text-xl text-md max-w-4xl">
          ការជ្រើសរើសអាជីពការងារត្រឹមត្រូវអាចជាបញ្ហាប្រឈមប៉ុន្តែការយល់ដឹងពីខ្លួនអ្នកគឺជាជំហានដំបូងឆ្ពោះទៅរកការស្វែងរកអាជីពដែលសាកសមនឹងអ្នក។
          ដើម្បីទទួលបាននូវការធ្វើតេស្ត
          សូមលោកអ្នកអនុវត្តន៍ជំហានទាំងបួនដូចខាងក្រោម ៖
        </p>
        </BoxReveal>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto  pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start  pt-10 md:pt-20 md:gap-10 "
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs md:max-w-xs lg:max-w-sm md:w-auto">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-gray-500 dark:text-gray-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-500 dark:text-gray-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8  left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[70%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-primary via-secondary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
