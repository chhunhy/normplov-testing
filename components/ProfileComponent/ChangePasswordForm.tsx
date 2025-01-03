'use client';
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Label from "../AuthComponents/LabelComponent";
import ErrorDynamic from "../AuthComponents/ErrorComponent";
import PasswordField from "../AuthComponents/PasswordField";
import Button from "../AuthComponents/ButtonComponentForAuth"; // Adjust the import path as needed
import { useChangePasswordMutation } from "@/redux/service/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type ValueTypes = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

const initialValues: ValueTypes = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

const strongPasswordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&*]).{8,}$");
const validationSchema = Yup.object().shape({
  old_password: Yup.string().required("required"),
  new_password: Yup.string()
    .min(8, "ពាក្យសម្ងាត់ថ្មីគឺខ្លីពេក, សូមបញ្ជូលអោយបាន 8 តួរ")
    .matches(
      strongPasswordRegex,
      "ពាក្យសម្ងាត់របស់អ្នកត្រូវតែមានអក្សរធំ អក្សរតូច និង​និមិត្តសញ្ញាពិសេស"
    )
    .required("ពាក្យសម្ងាត់ថ្មីត្រូវតែបញ្ជូល"),
  confirm_new_password: Yup.string()
    .oneOf(
      [Yup.ref("new_password")],
      "ពាក្យសម្ងាត់ថ្មីត្រូវតែដូចជាមួយការបញ្ជាក់ពាក្យសម្ងាត់"
    )
    .required("អ្នកត្រូវបញ្ជូលបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក"),
});

type ChangePasswordFormProps = {
  onClose: () => void; // Function to close the modal
};

const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  
  const handleChangePassword = async (values: ValueTypes) => {
    setIsLoading(true);
    try {
      const { old_password, new_password, confirm_new_password } = values;
      // Call the reset password API
      const response = await changePassword({
        old_password,
        new_password,
        confirm_new_password,
      }).unwrap();
      toast.success(response.message || "Change Password successfully!");
      console.log("Change Password Response:", response);
      // Optionally close the modal on success
      onClose();
    } catch (error) {
      console.error("Reset Password Error:", error);

      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        "data" in error
      ) {
        const typedError = error as {
          status: number;
          data: { detail?: string; message?: string };
        };
        toast.error(
          typedError.data?.detail || "Failed to reset password. Please try again."
        );
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full h-auto flex justify-center items-center">
      <div className="m-auto w-full">
        <div className="">
          <div className="mt-10 md:mt-11 xl:mt-10">
            <h1 className="text-3xl font-bold text-primary">ផ្លាស់ប្តូរពាក្យសម្ងាត់ថ្មី</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleChangePassword(values);
                setSubmitting(false); // Simulate a submission delay
              }}
            >
              {() => (
                <Form>
                  <div className="space-y-6 mt-10">
                    {/* Old Password */}
                    <div>
                      <Label htmlFor="old_password" text="ពាក្យសម្ងាត់ចាស់" required />
                      <PasswordField
                        name="old_password"
                        id="old_password"
                        placeholder="បញ្ចូលពាក្យសម្ងាត់ចាស់"
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="old_password" component="div" />
                    </div>
                    {/* New Password */}
                    <div>
                      <Label htmlFor="new_password" text="ពាក្យសម្ងាត់ថ្មី" required />
                      <PasswordField
                        name="new_password"
                        id="new_password"
                        placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="new_password" component="div" />
                    </div>
                    {/* Confirm Password */}
                    <div>
                      <Label
                        htmlFor="confirm_new_password"
                        text="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                        required
                      />
                      <PasswordField
                        name="confirm_new_password"
                        id="confirm_new_password"
                        placeholder="បញ្ចូលបញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                        className="custom-class mt-1"
                      />
                      <ErrorDynamic name="confirm_new_password" component="div" />
                    </div>
                  </div>
                  <div className="flex gap-5 mt-5 mb-10">
                    <div className="">
                      <Button
                        type="submit"
                        text="ផ្លាស់ប្តូរ"
                        isLoading={isLoading}
                        className="w-24 bg-primary hover:bg-primary text-white font-medium border-collapse"
                      />
                    </div>
                    <div className="">
                      <Button
                        type="button" // Ensure it doesn't submit the form
                        text="cancel"
                        onClick={onClose} // Call the onClose function to close the modal
                        className="w-24 bg-red-500 hover:bg-red-600 text-white font-medium border-collapse"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordForm;
