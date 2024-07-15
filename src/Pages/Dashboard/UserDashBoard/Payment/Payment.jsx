import { useParams } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);

const Payment = () => {
    const id = useParams();
    console.log(id)
    return (
        <div>
            <SectionTitle title='Payments'></SectionTitle>

            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;