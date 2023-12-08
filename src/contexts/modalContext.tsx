import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { createPortal } from "react-dom";

type ModalContextType = {
  modalChildren?: ReactNode;
  openModal: (newChildren: ReactNode) => void;
  closeModal: () => void;
};

type CustomModalProps = {
  children: ReactNode;
  closeModal: () => void;
};

const ModalContext = createContext({} as ModalContextType);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modalChildren, setModalChildren] = useState<ReactNode | null>(null);

  function openModal(newChildren: ReactNode) {
    setModalChildren(newChildren);
  }

  function closeModal() {
    setModalChildren(null);
  }
  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalChildren }}>
      {children}
    </ModalContext.Provider>
  );
}

export function CustomModal({ closeModal, children }: CustomModalProps) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [closeModal]);

  return createPortal(
    <div className="fixed bg-[rgba(0,0,0,0.5)] top-0 bottom-0 left-0 right-0 z-30 flex justify-center items-center">
      <div className="bg-dark p-5 rounded-lg w-96 relative">
        <button
          onClick={closeModal}
          className="absolute left-24 top-72 text-white"
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-container")!
  );
}
