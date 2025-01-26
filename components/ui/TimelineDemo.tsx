import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { BorderBeam } from "./border-beam";

export function TimelineDemo() {
  const data = [
    {
      title: "ជំហានទី១",
      content: (
        <div>
          <p className="text-gray-600 dark:text-neutral-300 lg:text-xl md:text-xl text-md font-normal mb-8">
            អ្នកអាចធ្វើការចុះឈ្មោះដើម្បីចូលទៅប្រើប្រាស់ website របស់យើងដោយប្រើ{" "}
            <span className="text-primary bg-primary bg-opacity-5 rounded-[8px] px-2 py-1  ">
              អ៉ីម៉ែល
            </span>{" "}
            និង{" "}
            <span className="text-primary bg-primary bg-opacity-5 rounded-[8px] px-2 py-1">
              ពាក្យសម្ងាត់
            </span>{" "}
            ឬ អាចភា្ជប់ជានឹង គណនី{" "}
            <span className="text-secondary bg-secondary bg-opacity-5 rounded-[8px] px-2 py-0">
              Google
            </span>{" "}
            របស់លោកអ្នកតែម្តង។
          </p>
          <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-4">
            <div className="relative border-dashed border  border-slate-200 rounded-xl p-2.5">
              <Image
                src="/assets/login-home.gif"
                alt="login"
                width={1000}
                height={1000}
                className="rounded-xl object-fill h-auto  md:h-auto lg:h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            
          </div>
        </div>
      ),
    },
    {
      title: "ជំហានទី២",
      content: (
        <div>
          <p className="text-gray-600 dark:text-neutral-300 lg:text-xl md:text-xl text-md font-normal mb-8">
            ដើម្បីជ្រើសរើសប្រភេទតេស្ត អ្នកត្រូវធ្វើការចុច{" "}

            <span className="text-primary bg-primary bg-opacity-5 rounded-[8px] px-2 py-1">
              តេស្ត
            </span>{" "}
            នៅលើ Navbar 
          </p>
          
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 ">
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test1.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test2.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test3.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test4.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test5.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test6.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "ជំហានទី៣",
      content: (
        <div className="">
          <p className="text-gray-600 dark:text-neutral-300 lg:text-xl md:text-xl text-md font-normal mb-4">
            អ្នកនឹងទទួលបានលទ្ធផលសង្ខេបទៅតាមប្រភេទតេស្ត​​ ព្រមទាំងការណែនាំពីមុខវិជ្ជាសិក្សានិងការងារដែលសាកសម។
          </p>
        
          <div className="grid relative border-dashed border border-slate-200 grid-cols-1 gap-4 p-2.5 rounded-xl">
            <Image
              src="/home/test.gif"
              alt="hero template"
              width={1000}
              height={1000}
              className="rounded-xl object-fill  h-auto  md:h-auto lg:h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <BorderBeam
              anchor={20}
              colorFrom="#0BBB8A"
              colorTo="#FFA500"
              delay={10}
              borderWidth={1}
            />
            <BorderBeam
              anchor={20}
              colorFrom="#0BBB8A"
              colorTo="#FFA500"
              delay={10}
              borderWidth={1}
            />
            <BorderBeam
              anchor={20}
              colorFrom="#0BBB8A"
              colorTo="#FFA500"
              delay={10}
              borderWidth={1}
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full  ">
      <Timeline data={data} />
    </div>
  );
}
