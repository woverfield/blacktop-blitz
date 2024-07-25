import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      {isOpen ? null : (
        <IoMenu
          className="text-white size-16 cursor-pointer"
          onClick={handleMenuToggle}
        />
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-75 z-40"
          onClick={handleMenuToggle}
        ></div>
      )}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 flex flex-col items-center bg-white z-50">
          <a href="/about" className="p-4">
            ABOUT
          </a>
          <a href="/feedback" className="p-4">
            FEEDBACK
          </a>
        </div>
      )}
    </div>
  );
}
