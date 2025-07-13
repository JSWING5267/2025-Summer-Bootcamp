import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function BlogModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-80 max-w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
