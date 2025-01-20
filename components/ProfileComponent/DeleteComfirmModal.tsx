'use client'
import React from "react";
import { useTranslations } from "next-intl";
type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}: DeleteConfirmationModalProps) => {
  const t= useTranslations();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-[10px] max-w-md">
        <h2 className="text-xl font-semibold text-textprimary mb-4">
          {t("TestHistoryUser.DeleteTestModal.heading")}
        </h2>
        <p className="text-gray-600 mb-6">
        {t("TestHistoryUser.DeleteTestModal.description")} <strong>{title}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            {t("TestHistoryUser.DeleteTestModal.cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
               {t("TestHistoryUser.DeleteTestModal.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
