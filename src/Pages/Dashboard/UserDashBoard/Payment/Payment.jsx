import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../../Hooks/useCart";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CopyText from "../../../Shared/CopyText/CopyText";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);

const Payment = () => {
  const [cart, , refetch] = useCart();
  const [addressData, setAddressData] = useState();
  const totalPrice = cart.reduce(
    (acc, item) => parseInt(acc) + parseInt(item.cartData.price),
    0
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    setAddressData(data);
  };
  console.log(errors);

  return (
    <div>
      <SectionTitle title="Payments"></SectionTitle>
      <form
        className="flex flex-col items-center justify-center gap-3 pt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(errors?.address?.type || errors?.phone?.type) == "required" ? (
          <p className="text-error font-mono">Must need Phone & Address</p>
        ) : (
          ""
        )}
        <div className="flex items-center gap-5">
        <div className="flex flex-col items-center gap-3">
        <input
          type="text"
          placeholder="Enter Phone"
          className="input input-bordered input-primary w-full max-w-xs" {...register("phone", { required: true })}
        />
        <textarea
          className="textarea textarea-bordered textarea-lg w-full h-[100px]  textarea-primary"
          placeholder="Enter Address"
          {...register("address", { required: true })}
        >
        </textarea>
        </div>

        <button
          className={`btn ${addressData ? "btn-success" : "btn-error"}`}
          type="submit"
        >
          Save
        </button>
        </div>
      </form>
      <p className="text-primary text-center py-3">
        Trial Card Number: <CopyText text={"4242 4242 4242 4242"}></CopyText>{" "}
        Year Sould be more than 24 and CVC, Postal Code : Any digits
      </p>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          price={totalPrice}
          cart={cart}
          refetch={refetch}
          data={addressData}
          reset={reset}
        ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
