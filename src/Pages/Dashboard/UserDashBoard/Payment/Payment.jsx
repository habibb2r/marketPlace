
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../../Hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);

const Payment = () => {
    const [cart, , refetch] = useCart();
    const totalPrice = cart.reduce((acc, item) => parseInt(acc) + parseInt(item.cartData.price), 0);
    return (
        <div>
            <SectionTitle title='Payments'></SectionTitle>

            <Elements stripe={stripePromise}>
                <CheckoutForm price={totalPrice} cart={cart} refetch={refetch}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;