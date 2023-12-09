import { useCart } from "../../contexts/CartContext";
import { useModal } from "../../contexts/modalContext";

export function CartModal({ id }: { id: string }) {
  const { deleteItem } = useCart();
  const { closeModal } = useModal();
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-orange-900  border p-16">
        <div className="text-center text-xl font-bold p-5 custom-text texr-white">
          האם אתה בטוח שאתה רוצה למחוק?
        </div>
        <div className="flex justify-center gap-20">
          <button onClick={() => deleteItem(id)} className="text-white">
            כן
          </button>

          <button onClick={() => closeModal()} className="text-white">
            לא
          </button>
        </div>
      </div>
    </div>
  );
}
