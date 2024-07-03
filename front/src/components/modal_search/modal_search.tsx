import React, { useEffect, useRef } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 pt-20">
      <div ref={modalRef} className="backdrop-filter backdrop-blur bg-opacity-70 bg-white mt-16 p-4 rounded-lg shadow-sm relative w-11/12 md:w-2/3 lg:w-1/2 max-h-3/4">
        <button
          onClick={onClose}
          className="absolute top-2 right-8 text-black bg-transparent rounded-full p-1 focus:outline-none"
        >
          <AiOutlineCloseCircle className="w-9 h-9 text-gray-500 hover:text-gray-600" />
        </button>
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
