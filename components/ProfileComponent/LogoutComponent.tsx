import React from "react";
import Button from "../AuthComponents/ButtonComponentForAuth";


type LogoutComponentProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutComponent: React.FC<LogoutComponentProps> = ({ onClose, onConfirm }) => {
  return (
    <section className="w-1/2 lg:w-2/6  bg-white  rounded-xl">
      <div className="p-6">
        {/* <button className="text-3xl"><IoMdClose /></button> */}
        <h1 className="text-2xl lg:text-2xl text-primary font-bold ">បញ្ចាក់ការចាកចេញ</h1>
        <p className="text-lg pt-3 text-textprimary">តើអ្នកពិតជាចង់ចាកចេញមែនទេ?</p>
        <div className="flex  gap-5 mt-5 flex-row-reverse ">
          <Button
            type="button"
            text="ចាកចេញ"
            onClick={onConfirm} // Confirm the logout
            className=" bg-primary hover:bg-primary-dark text-white font-medium border-collapse"
          />
            <Button
              type="button"
              text="មិនចាកចេញ" // Use the close icon for the button
              onClick={onClose} // Close the modal
              className=" border  text-red-500 font-medium border-collapse flex items-center justify-center" // Center the icon
            />
        </div>
      </div>
      
    </section>
  );
};

export default LogoutComponent;