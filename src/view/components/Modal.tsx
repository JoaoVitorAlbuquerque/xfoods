import { useEffect } from "react";
// import { Order } from "../../types/Order";
// import { Button } from "./Button";
import closeIcon from '../components/icons/close-icon.svg';

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  // order: Order | null;
  title?: React.ReactNode;
  onClose(): void;
}

export function Modal({
  children,
  visible,
  // order,
  title,
  onClose,
}: ModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-white min-w-[480px] rounded-lg p-8 transition-all">
      <header className="flex items-center justify-between mb-8">
          <strong className="text-2xl font-bold text-gray-500">
            {title}
          </strong>

          <button
            type="button"
            className="flex"
            onClick={onClose}
          >
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        {children}
    </div>
  );
}
