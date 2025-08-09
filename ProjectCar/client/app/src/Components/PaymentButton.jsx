import React, { useState } from "react";
import { getTheBookingAndPaymentStatus } from "../Services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentButton = ({ amount, booking }) => {
    // Dynamically load Razorpay SDK if not loaded yet
    const navigate = useNavigate();
    const loadRazorpayScript = () =>
        new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    const handlePayment = async () => {
        const res = await loadRazorpayScript();

        if (!res) {
            alert("Failed to load Razorpay SDK");
            return;
        }

        console.log(booking, "booking data is ");
        // console.log("data for backend",body.paymentDto);

        // Create order on backend
        const response = await fetch("http://localhost:8080/api/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });
        const orderData = await response.json();

        if (!orderData.id) {
            alert("Server error: Could not create order");
            return;
        }

        // Open Razorpay payment popup with order info
        const options = {
            key: "rzp_test_ZwE6SwAVPaxRo9", // Razorpay Test Key ID
            amount: orderData.amount,
            currency: orderData.currency,
            order_id: orderData.id,
            name: "Drivana App",
            description: "Drivana Payment",
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

                    if (result && result.status === 200) {
                        toast.success(result.data || "Booking confirmed!");
                        sessionStorage.setItem("paymentDone", "true"); 
                        navigate("/user-booking", { replace: true });  

                    } else {
                        toast.error("Payment verification failed. If booking isn't confirmed, refund will be initiated.");
                    }
                } catch (error) {
                    console.error("Verification error:", error);
                    toast.error("Server error during payment verification. Please check your booking status.");
                }


            },
            prefill: {
                name: "Sanket Padul",
                email: "sanket@example.com",
                contact: "9000000000",
            },
            theme: {
                color: "#3399cc",
            },
        };


        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <button onClick={handlePayment} className="btn btn-success">
            Pay ₹{amount}
        </button>
    );
};

export default PaymentButton;
