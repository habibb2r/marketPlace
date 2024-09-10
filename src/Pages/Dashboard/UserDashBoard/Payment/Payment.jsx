
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
    const [addressData, setAddressData] = useState()
    const totalPrice = cart.reduce((acc, item) => parseInt(acc) + parseInt(item.cartData.price), 0);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        setAddressData(data)
    }
    console.log(errors);

    return (
        <div>
            <SectionTitle title='Payments'></SectionTitle>
            <form className="flex flex-col items-center justify-center gap-3 pt-5" onSubmit={handleSubmit(onSubmit)}>
                {
                    errors?.address?.type == 'required' ? <p className="text-error font-mono">Must need a Address</p>: ''
                }
            <textarea
  className="textarea textarea-bordered textarea-lg w-[300px] md:w-[450px] h-[150px]  textarea-primary"
  placeholder="Must need a phone and address"
  {...register("address", { required: true })}
>
  {"Phone:\nAddress:"}
</textarea>

            <button className={`btn ${addressData? 'btn-success': 'btn-error'}`} type="submit">Save</button>
            </form>
            <p className="text-primary text-center py-3">Trial Card Number: <CopyText text={'4242 4242 4242 4242'}></CopyText> Year Sould be more than 24 and CVC, Postal Code : Any digits</p>
            
            <Elements stripe={stripePromise}>
                <CheckoutForm price={totalPrice} cart={cart} refetch={refetch} addressData={addressData} reset={reset}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;