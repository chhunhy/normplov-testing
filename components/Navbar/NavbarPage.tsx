"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname ,useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useGetUserQuery } from "@/redux/service/user";
import { useParams } from "next/navigation"; 
import {useTranslations} from 'next-intl';

interface NavbarTranslationKeys {
  navLinks: {
    home: string;
    test: string;
    university: string;
    jobs: string;
    privacyPolicy: string;
    aboutUs: string;
  };
  buttons: {
    signIn: string;
    khmerLanguage: string;
    englishLanguage: string;
  };
}

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & string];

function getRandomColor(username: string) {
  // Generate a random color based on the username
  const colors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-amber-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-rose-500",
  ];
  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
}


export default function NavbarPage() {
  const router = useRouter();  // Using Next.js router
  const pathname = usePathname();
  //const { i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // Fetch user data
  const { data:user} = useGetUserQuery();
  console.log("user data",user)
  const userData=user?.payload
  const avatarUrl = userData?.avatar
  ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}`
  : null;
  
  const { locale } = useParams();
  const currentLocale = locale || 'en'; // Default to 'en' if locale is not defined
  const t = useTranslations<NestedKeyOf<NavbarTranslationKeys>>();
// Handle language change by modifying the URL
const handleLanguageChange = (lang: string) => {
  // Redirect to the same page with the new locale
  router.push(`/${lang}${pathname.replace(`/${locale}`, '')}`);
};

const navLinks = [
  { href: "/", label: t("Navbar.navLinks.home") },
  { href: "/test", label: t("Navbar.navLinks.test") },
  { href: "/university", label: t("Navbar.navLinks.university") },
  { href: "/jobs", label: t("Navbar.navLinks.jobs") },
  { href: "/privacy-policy", label: t("Navbar.navLinks.privacyPolicy") },
  { href: "/about-us", label: t("Navbar.navLinks.aboutUs") },
];

  // If `locale` is not available, you can set a default value
  return (
    <div className="w-full bg-slate-50">
      <header className="flex items-center justify-between py-4 px-4 md:px-6 lg:px-8  mx-auto">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Logo */}
            <Link
              href="/"
              className="text-lg lg:text-xl text-green-700 font-bold"
            >
             <Image
                src="/assets/logo.jpg"
                alt="Logo"
                width={200}
                height={200}
                className="object-contain lg:w-[50px] md:w-[50px] w-[40px]  "
              />
            </Link>
          

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`text-base lg:text-lg ${
                  pathname === link.href
                    ? "text-green-700 font-bold  border-green-700"
                    : "text-gray-800 hover:text-green-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Language Selector and Sign-in */}
        <div className="hidden md:block lg:flex items-center space-x-6">
          {/* LanguageSelector hidden on md (iPad) */}
          <LanguageSelector handleLanguageChange={handleLanguageChange} />
          {/* Sign in button */}
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="border-2 border-primary bg-[#fdfdfd] rounded-full p-1">
              <Link href="/profile-quiz-history">
              {
                avatarUrl ?(
                  <Image
                  src={avatarUrl  || "/auth/personplaceholder.png"} 
                  alt="User Avatar"
                  width={2000}
                  height={2000}
                  className="w-[35px] h-[35px] object-cover rounded-full"
                />
                ):(
                  <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${getRandomColor(
                        userData?.username || "U"
                      )}`}
                    >
                      {userData?.username.charAt(0).toUpperCase() || "U"}
                    </div>
                )
              }
                  {/* <Image
                    src={avatarUrl || "/default-avatar.png"} // Fallback to default avatar if null
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-12 h-12 object-cover rounded-full"
                  /> */}
              </Link>
              </div>
              
             
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
            >
              {t("Navbar.buttons.signIn")}
            </Link>
          )}
          {/* <Link
            href="/login"
            className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
          >
            Sign in
          </Link> */}
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="w-full md:hidden px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${currentLocale}${link.href}`}
                className={`text-base ${
                  pathname === link.href
                    ? "text-green-700 font-bold"
                    : "text-gray-800 hover:text-green-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <LanguageSelector handleLanguageChange={handleLanguageChange} />
            {user ? (
            <div className="flex items-center space-x-4">
              <div className="border-2 border-primary bg-[#fdfdfd] rounded-full p-1">
              <Link href="/profile-quiz-history">
                  <Image
                    src={avatarUrl || "/auth/personplaceholder.png"} // Fallback to default avatar if null
                    alt="User Avatar"
                    width={2000}
                    height={2000}
                    className="w-[35px] h-[35px] object-cover rounded-full"
                  />
              </Link>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
            >
              {t("buttons.signIn")}
            </Link>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

function LanguageSelector({
  handleLanguageChange,

}: {
  handleLanguageChange: (lang: string) => void;

}) {
  const t = useTranslations<NestedKeyOf<NavbarTranslationKeys>>();
  return (
    <div className="flex items-center space-x-4">
      <button onClick={() => handleLanguageChange("km")}>
        <LanguageOption flag="/assets/khmer-flag.png" label={t("Navbar.buttons.khmerLanguage")}/>
      </button>
      <div className="h-6 border-l border-slate-400"></div>
      <button onClick={() => handleLanguageChange("en")}>
        <LanguageOption flag="/assets/english-flag.png" label={t("Navbar.buttons.englishLanguage")}  />
      </button>
    </div>
  );
}

function LanguageOption({ flag, label }: { flag: string; label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={flag}
        alt={`${label} flag`}
        width={24}
        height={24}
        className="w-6 h-6 object-cover rounded-full"
      />
      <span className="text-base lg:text-lg text-gray-800">{label}</span>
    </div>
  );
}