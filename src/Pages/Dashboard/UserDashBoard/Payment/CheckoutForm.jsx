import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements()
    const [errorMessage, setError] = useState('')

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('Error', error)
            setError(error.message)
        }else{
            console.log('Payment Method', paymentMethod)
            setError('')
        }
    }
  return (
    <div className="flex justify-center items-center text-center py-10">
        <form className="px-10 w-[50%]" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
                border: '2px solid red',
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex flex-col justify-center items-center gap-5">
      {
        errorMessage && <p className="font-mono text-red-700 py-5">{errorMessage}</p>
      }
      <button className="btn btn-success mt-5 mx-auto" type="submit" disabled={!stripe}>
        Pay
      </button>
      </div>
    </form>
    </div>
  );
};

export default CheckoutForm;
