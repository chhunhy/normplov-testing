import React from "react";
import LoginComponent from "@/components/AuthComponents/LoginComponent";
import Image from "next/image";

export default function page() {
  return (
    // <section>
    //     <LoginPage/>
    // </section>
    <section className="w-full h-screen flex items-center justify-center ">
      <div className="h-screen bg-primary w-6/12 hidden lg:block">
        <div className="w-full h-auto bg-primary text-center   ">
          <div className="mt-[60px]">
          <h1 className="text-5xl  font-bold text-white">
            សូមស្វាគមន៍មកកាន់គេហទំព័រនាំផ្លូវ
          </h1>
          <p className="text-2xl font-normal pt-3 p-8 text-white">
            រកឃើញសក្តានុពលរបស់អ្នក និងស្វែងរកជំនាញឯកទេស
            នៅសាកលវិទ្យាល័យដែលស្របទៅនឹងចំណង់ចំណូលចិត្ត ចំណុចខ្លាំង
            និងគោលដៅអាជីពនាពេលអនាគតរបស់អ្នក។
          </p>
          </div>
        </div>
        <div className=" absolute h-3/4 mt-5  ">
          <div className="h-full   ">
            <Image
              src="/auth/login.png"
              width={1000}
              height={1000}
              alt="Login Image"
              className=" w-[730px] h-[700px] ml-[170px]"
            />
          </div>
        </div>
      </div>
      <div className="h-screen w-full md:w-3/5 lg:w-6/12 ">
        <LoginComponent />
      </div>
    </section>
  );
}
