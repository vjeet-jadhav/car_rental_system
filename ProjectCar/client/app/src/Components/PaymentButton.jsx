import React, { useContext, useState } from "react";
import { getTheBookingAndPaymentStatus } from "../Services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../App";

const PaymentButton = ({ amt, booking }) => {
    // Dynamically load Razorpay SDK if not loaded yet
    const navigate = useNavigate();
    const{user,setUser}=useContext(AuthContext)
    console.log(user);
    const loadRazorpayScript = () =>
        new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });



    // PROCESS FOR HANDLING THE PAYMENT
    const handlePayment = async () => {
        const res = await loadRazorpayScript();

        if (!res) {
            alert("Failed to load Razorpay SDK");
            return;
        }

        console.log(booking, "booking data is ");

        // generating amount for razorpay
        const start = new Date(amt.startTrip);
        const end = new Date(amt.endTrip);
        const diffMs = end - start;
        const totalHours = Math.ceil(diffMs / (1000 * 60 * 60));

        // Calculate amounts
        const amountBeforeDiscount = totalHours * amt.rate;

        const amount = amountBeforeDiscount;

        console.log("Calculating amount for razorpay",amount);
        // CREATE THE ORDER FIRST
        const response = await fetch("http://localhost:8080/api/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });
        const orderData = await response.json();
        console.log("Order created from razorpay", orderData);

        if (!orderData.id) {
            alert("Server error: Could not create order");
            return;
        }

        // OPEN RAZORPAY PAYMENT POPUP
        const options = {
            key: "rzp_test_ZwE6SwAVPaxRo9", // Razorpay Test Key ID
            amount: orderData.amount,
            currency: orderData.currency,
            order_id: orderData.id,
            name: "Drivana App",
            description: "Drivana Payment",
            // CALLBACK FUNCTION WHEN PAYMENT IS SUCCESSFULL
            handler: async function (response) {
                console.log("Payment ID:", response.razorpay_payment_id);
                console.log("Order ID:", response.razorpay_order_id);
                console.log("Signature:", response.razorpay_signature);
                // TODO: Send this data to backend for payment verification
                console.log("booking data", booking);
                const object = {
                    "paymentVerify": {
                        "razorpayOrderId": response.razorpay_order_id,
                        "razorpayPaymentId": response.razorpay_payment_id,
                        "razorpaySignature": response.razorpay_signature
                    },
                    "bookingDto": booking
                }

                console.log("Sending data for verification to backend", object);
                try {
                    const result = await getTheBookingAndPaymentStatus(object);
                    console.log("Verification result:", result);

                    if (result && result.status == 200) {
                        toast.success("Booking confirmed!");
                        sessionStorage.setItem("paymentDone", "true");
                        navigate("/user-booking", { replace: true });

                    } else {
                        toast.error("Payment verification failed. Booking isn't confirmed, Money will be refunded");
                    }
                } catch (error) {
                    console.error("Verification error:", error);
                    toast.error("Server error during payment verification. Please check your booking status.");
                }
                // console.log("Call back to razorpay, hii i am calling when success");

            },
            prefill: {
                name: user.fname,
                email: user.sub,
                
            },
            theme: {
                color: "#3399cc",
            },
        };


        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <button onClick={handlePayment} className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
            Pay 
        </button>
    );
};

export default PaymentButton;
