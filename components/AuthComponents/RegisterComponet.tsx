'use client';
import React, { useState,useEffect } from "react";
import { useAppDispatch } from '@/redux/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Form} from 'formik';
import { IoCloseSharp } from 'react-icons/io5';
import Label from './LabelComponent';
import DynamicField from './AuthField';
import ErrorDynamic from './ErrorComponent';
import PasswordField from './PasswordField';
import Link from 'next/link';
import Button from './ButtonComponentForAuth';
import { useRegisterMutation } from '@/redux/service/auth';
import { setEmail } from "@/redux/feature/verify/verifySlice";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import CustomCheckbox from "./CustomCheckBox";

type ValueTypes = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  terms: boolean; // New field for terms and conditions
};

const initialValues: ValueTypes = {
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  terms: false,
};

const strongPasswordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&*]).{8,}$");
const validationSchema = Yup.object().shape({
  username: Yup.string().max(60, "ឈ្មោះរបស់អ្នកវែងពេក too long").required("អ្នកត្រូវបញ្ជូលឈ្មោះរបស់អ្នក"),
  email: Yup.string().email('អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ').required('អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក'),
  password: Yup.string()
    .min(8, "ពាក្យសម្ងាត់ខ្លីពេក, ពាក្យសម្ងាត់យ៉ាងតិច 8 តួរ")
    .matches(strongPasswordRegex, "ពាក្យសម្ងាត់របស់អ្នកត្រូវតែមានអក្សរធំ អក្សរតូច និង​និមិត្តសញ្ញាពិសេស")
    .required("ពាក្យសម្ងាត់ត្រូវតែបញ្ជូល"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "ពាក្យសម្ងាត់ត្រូវតែដូចជាមួយការបញ្ជាក់ពាក្យសម្ងាត់")
    .required("អ្នកត្រូវបញ្ជូលបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក"),
  terms: Yup.bool().oneOf([true], "អ្នកត្រូវតែគោរពតាមគោលការណ៏"), // Validation for terms
});

const RegisterComponent = () => {
  const [currentLocale, setCurrentLocale] = useState<string>('km');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();
  const router = useRouter();
  useEffect(() => {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setCurrentLocale(savedLanguage);
      }
    }, []);
  const handleSubmit = async (values: ValueTypes) => {
    setIsLoading(true);
    try {
      const { username, email, password, confirm_password } = values;
      const response = await register({ data: { username, email, password, confirm_password } }).unwrap();
      // console.log("Registration Response:", response);

      // Dispatch email to Redux and show a success message
      dispatch(setEmail(email));
      toast.success(response.message || "Registered Successfully!", { autoClose: 2000 });

      // Redirect to OTP verification page
      setTimeout(() => {
        router.push(`/${currentLocale}/verify-code-register`);
        // router.push("/verify-code-register");
      });
    } catch (error: unknown) {
      // console.error("Error during registration:", error);

      // Handle API errors
      if (error && typeof error === 'object' && 'status' in error && 'data' in error) {
        const typedError = error as { status: number; data: { detail?: string; message?: string } };
        if (typedError.status === 400 && typedError.data.detail === "Email already registered.") {
          toast.error("This email is already registered. Please use a different email or login.");
        } else if (typedError.data?.message) {
          toast.error(typedError.data.message);
        } else {
          toast.error("An error occurred during registration. Please try again.");
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    const clientId = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`
    // const clientId = "584934236339-5bjir3arta5iumk19q9j2vuaejp0b9bl.apps.googleusercontent.com";
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const scope = 'email profile';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(scope)}`;

    window.location.href = googleAuthUrl;
  };
  const handleClose = () => {
    router.push("/"); // Redirect to the referrer
  };
  return (
    <section
    className=" w-full  md:p-20 lg:bg-primary/20  lg:p-12"
    // style={{
    //   backgroundImage: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
    // }}
  >
    <div className=" w-full bg-transparent bg-white m-auto md:mt-24 lg:mt-0 rounded-xl">
      {/* <div className="flex flex-row-reverse mx-4 flex-end right-0 top-0">
        <div className="flex flex-end w-1/2 justify-between items-center">

                  <Link href="/">
                    <Image
                      src="/assets/logo.jpg"
                      width={1000}
                      height={1000}
                      alt="Logo Image"
                      className="h-16 w-16 ml-10"
                    />
                  </Link>

          <button
            className="text-2xl text-gray-500 hover:text-gray-700"
            onClick={() => console.log("Close button clicked")}
          >
            <IoCloseSharp />
          </button>
        </div>
      </div> */}
      <div className="lg:flex justify-between ">
        <div className="hidden md:flex lg:block  w-full pb-8 lg:w-7/12 lg:pb-8 bg-primary/80 md:rounded-xl lg:rounded-none lg:rounded-l-xl">
          <div className="text-center pt-10">
            <h1 className="text-4xl text-white font-bold pb-4">
              សូមស្វាគមន៍មកកាន់គេហទំព័រនាំផ្លូវ
            </h1>
            <p className="text-white md:pt-5 lg:pt-0 md:px-20 lg:px-14 pb-8 text-lg">
              រកឃើញសក្តានុពលរបស់អ្នក និងស្វែងរកជំនាញឯកទេស
              នៅសាកលវិទ្យាល័យដែលស្របទៅនឹងចំណង់ចំណូលចិត្ត ចំណុចខ្លាំង
              និងគោលដៅអាជីពនាពេលអនាគតរបស់អ្នក។
            </p>
          </div>
          <div className="md:hidden lg:block ">
            <Image
              src="/auth/login.png"
              width={1000}
              height={1000}
              alt="Login Image"
              className="max-w-xl mt-14 mx-auto "
            />
          </div>
        </div>
        <div className="w-full  lg:w-1/2 flex mx-auto">
          <div className=" w-full  mx-auto">
          <div className="flex flex-row-reverse ">
                <button
                  className="text-2xl text-gray-500 hover:text-gray-700 px-3 pt-3"
                     onClick={handleClose}
                    aria-label="Close login page"
                >
                  <IoCloseSharp />
                </button>
              </div>
            <div className="lg:px-12 lg:py-6 h-full">
              

            <div className="h-fit mt-10 md:mt-11 xl:mt-0 mx-6">
            <h1 className="text-4xl font-bold text-primary">បង្កើតគណនីថ្មី</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                if (!values.terms) {
                  toast.error("You must accept the terms and conditions");
                  setSubmitting(false);
                  return;
                }
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="space-y-3 md:space-y-3 mt-3">
                    <div>
                      <Label htmlFor="username" text="ឈ្មោះ" required />
                      <DynamicField
                        type="text"
                        name="username"
                        id="username"
                        placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                      />
                      <ErrorDynamic name="username" component="div" />
                    </div>
                    <div>
                      <Label htmlFor="email" text="អ៉ីម៉ែល" required />
                      <DynamicField
                        type="text"
                        name="email"
                        id="email"
                        placeholder="បញ្ចូលអ៉ីម៉ែលរបស់អ្នក"
                      />
                      <ErrorDynamic name="email" component="div" />
                    </div>
                    <div>
                      <Label htmlFor="password" text="ពាក្យសម្ងាត់" required />
                      <PasswordField
                        name="password"
                        id="password"
                        placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="password" component="div" />
                    </div>
                    <div>
                      <Label htmlFor="confirm_password" text="បញ្ជាក់ពាក្យសម្ងាត់" required />
                      <PasswordField
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="បញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក"
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="confirm_password" component="div" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                  <CustomCheckbox
                    id="terms"
                    name="terms"
 
                    />
                    {/* <Field type="checkbox" id="terms" name="terms" /> */}
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-textprimary"
                    >
                     ខ្ញុំបានអាននិងយល់ព្រមលើ <Link 
                      href={`/${currentLocale}/privacy-policy`}
                    //  href="/privacy-policy"  
                      target="_blank" 
              rel="noopener noreferrer"  className="text-primary pl-2"> គោលការណ៍ឯកជនភាព</Link>
                    </label>
                    
                  </div>
                  {errors.terms && touched.terms && (
                      //  <ErrorDynamic name={errors.terms} component="div" />
                      <div className="text-red-500 text-sm pt-1">{errors.terms}</div>
                    )}
                  <div className="mt-6">
                    <Button
                      type="submit"
                      text="បង្កើតគណនី"
                      isLoading={isLoading}
                      className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
                    />
                  </div>
                  
                             {/* OR Divider */}
                             <div className="flex items-center justify-center space-x-3 mt-3">
                                 <span className="w-1/2 border-b border-gray-300"></span>
                                 <span className="text-sm text-gray-500">ឬ</span>
                                 <span className="w-1/2 border-b border-gray-300"></span>
                            </div>
                            {/* Google Button */}
                            <div className="mt-4">
                        {/* <LoginWithGoogle /> */}
                      </div>                       <div className="mt-4 text-center">
                          <Button
                            type="button"
                            text="ភ្ជាប់ជាមួយ Google"
                            onClick={handleGoogleLogin}
                            icon={
                              <Image
                                src="/assets/google.png"
                                width={1000}
                                height={1000}
                                alt="Google icon"
                                className="w-5 h-5"
                              />
                            }
                            className=" w-full border-2 border-primary  text-textprimary "
                          />
                        </div>
                             {/* Don't have accoun? Register */}
                             <div className='mt-4 text-center text-textprimary '>
                                 <span>មានគណនីរួចហើយ?<Link 
                                  href={`/${currentLocale}/login`}
                                //  href="/login" 
                                 className='text-primary hover:underline hover:font-semibold pl-1.5'>ចូលគណនី</Link></span>
                             </div>
                </Form>
              )}
            </Formik>
            <ToastContainer />
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>




    // <section className="w-full h-screen flex justify-center items-center">
    //   <div className="w-[90%] h-[97%] sm:w-[75%] sm:h-[97%] md:w-[95%] md:h-[98%] xl:w-[85%] xl:h-[98%] m-auto">
    //     <div className="px-6 sm:px-8 md:px-6 xl:px-10">
    //       <div className="flex justify-between items-center ">
    //         <Link href="/">
    //           <Image src="/assets/logo.jpg"
    //                   width={200} height={200}
    //                     alt="Logo Image"
    //                     className="w-[70px] h-[70px" />
    //         </Link>
    //         <div>
    //           <button
    //             className="text-2xl text-gray-500 hover:text-gray-700"
    //             onClick={() => console.log('Close button clicked')}
    //           >
    //             <IoCloseSharp />
    //           </button>
    //         </div>
    //       </div>
          
    //     </div>
    //   </div>
    // </section>
  );
};

export default RegisterComponent;
