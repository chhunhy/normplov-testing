import React from "react";
import NavbarPage from "../../../components/Navbar/NavbarPage";
import FooterPage from "../../../components/Footer/FooterPage";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <NavbarPage />

      {/* Background Image Section */}
      <div className="w-full lg:h-screen md:h-[610px] h-screen flex justify-center items-center bg-cover bg-center" 
           style={{ backgroundImage: 'url(/assets/Stars.svg)'}}>
        <div className="flex justify-between items-start bg-opacity-50  p-8 rounded-lg">
          <div className=" hidden lg:w-[600px]  lg:h-[600px] md:w-[400px] md:h-[400px] w-[200px] h-[200px] lg:flex md:flex items-center">
            <Image
              src="/assets/404 Error-bro.png"
              alt="Error-bro"
              width={200}
              height={200}
              className="lg:w-[500px] lg:h-[500px] md:w-[300px] md:h-[300px]"
            />
          </div>
          <div className="space-y-4 text-white lg:ml-0 md:ml-10 ml-2 lg:mt-20 md:mt-20 mt-3">
            <div className="lg:text-6xl md:text-4xl text-2xl text-red-600">រកមិនឃើញទំព័រ</div>
            <div className="lg:text-2xl md:text-2xl text-lg  text-textprimary">
              សុំទោស! សូមចូលទៅកាន់គេហទំព័រដើមដើម្បីទទួលបាន កន្លែងដែលអ្នកចង់ទៅ។
            </div>
            <Link
              href="/"
              className="flex items-center bg-primary rounded-xl w-40 justify-center h-12"
            >
              <BiArrowBack className="text-xl text-white" />
              <div className="py-2 px-2 text-lg md:text-xl lg:text-xl font-medium text-white">
                ទៅទំព័រដើម
              </div>
            </Link>
          </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default NotFound;