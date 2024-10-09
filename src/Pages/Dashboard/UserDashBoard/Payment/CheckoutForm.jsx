import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useGetUserInfo from "../UserHooks/useGetUserInfo";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart, refetch, data, reset }) => {
  const [userInfo, , isLoading] = useGetUserInfo();
  if (isLoading) {
    <Loading></Loading>;
  }
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setError] = useState("");
  const [clientSecret, setclientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const navigate = useNavigate();
  const from = "/dashboard/payhistory";

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        // console.log(res.data.clientSecret);
        setclientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const today = new Date();

    const dateOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    
    const dateTimeString = today.toLocaleDateString('en-GB', dateOptions); // DD/MM/YYYY format
    const timeString = today.toLocaleTimeString('en-US', timeOptions); 

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("Error", error);
      setError(error.message);
    } else {
      // console.log('Payment Method', paymentMethod)
      setError("");
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userInfo?.name || "unknown",
            email: userInfo?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    // console.log(paymentIntent)
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      const traxID = paymentIntent.id;
      setTransactionId(traxID);

      const paymentSlip = {
        email: userInfo?.email,
        name: userInfo?.name,
        traxId: traxID,
        date: dateTimeString,
        time: timeString,
        quantity: cart.length,
        total_price: price,
        stall_id: cart[0].stall_id,
        cartItems: cart.map((item) => item._id),
        product_items: cart.map((item) => ({
          product_id: item.cartData.product_id,
          product_rating: false,
          rate_given: 3,
        })),
        itemNames: cart.map((item) => item.cartData.product_name),
        product_prices: cart.map((item) => item.cartData.price),
        payment_status: true,
        delivered: false,
        address: data.address,
        phone: data.phone,
        rating: false
      };

      axiosSecure.post("/payments", paymentSlip).then((res) => {
        if (res.data.result.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Payment Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          reset();
          navigate(from, { replace: true });
        }
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center text-center py-10">
      {transactionId && (
        <p className="font-mono text-success py-5 font-semibold">
          Transaction Completed. TrxID: {transactionId}
        </p>
      )}
      <form
        className=" px-4 md:px-10 w-[100%] md:w-[50%]"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                border: "2px solid red",
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
          {errorMessage && (
            <p className="font-mono text-red-700 py-5">{errorMessage}</p>
          )}
          <button
            className="btn btn-success mt-5 mx-auto"
            type="submit"
            disabled={!stripe || !clientSecret || processing || !data}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
