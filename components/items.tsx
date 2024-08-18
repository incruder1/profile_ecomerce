"use client";
import { ItemsProps } from "@/types/index";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; // Import the context
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Items = ({ item }: ItemsProps) => {
  const { cart, addToCart, updateQuantity } = useCart(); // Destructure the necessary functions and state from context
  const quantity = cart[item.id] || 0; // Get the quantity of the item in the cart
  const router = useRouter(); 
  const handleAddToCart = () => {
    addToCart(item.id);
  };

  const handleIncreaseQuantity = () => {
    if(quantity >= 20)
    {
      toast.error("Sorry ! only 20 is allowed at a time", {
        position: "top-center",
        duration: 500
      }

      );
      return;
    }
    updateQuantity(item.id, quantity + 1);

  };

  const handleDecreaseQuantity = () => {
    if (quantity >= 1) {
      updateQuantity(item.id, quantity - 1);
    }
  };

  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-neutral-50 px-10 py-6 shadow-sm border boder-2 justify-items-center">
      <Link href={`/products/${item.id}`} className="w-full">
        <Image
          src={item.image}
          alt={item.title}
          width={50}
          height={50}
          className="h-[100px] w-full flex justify-items-center object-contain"
        />
        <p className="base-semibold mt-4">{item.title.length>30?item.title.slice(0, 30)+"...":item.title}</p>
        <p className="h3-bold m-2">{`$${item.price}`}</p>
      </Link>

      {quantity == 0 ? (
        <button
          onClick={handleAddToCart}
          className="my-4 py-2 w-full mx-2 bg-red-400 text-white hover:bg-red-600"
        >
          Add To Cart
        </button>
      ) : (
        <div className="flex items-center my-4 w-full">
          <button
            onClick={handleDecreaseQuantity}
            className="px-4 py-2 bg-red-500 text-white rounded-l"
          >
            -
          </button>
          <span className="px-4 py-2 bg-gray-200">{quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="px-4 py-2 bg-green-500 text-white rounded-r"
          >
            +
          </button>
          <button
            onClick={()=>{
              router.push("/checkout");
            }}
            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};
