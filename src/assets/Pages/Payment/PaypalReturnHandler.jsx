import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import { toast } from 'react-toastify';

const PaypalReturnHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    console.log("✅ PaypalReturnHandler mounted");

    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const payerId = query.get("PayerID");

    console.log("🔍 Token:", token, "PayerID:", payerId);

    if (!token || !payerId) {
      toast.error("Missing PayPal token or payerId.");
      navigate('/paymentfailed', { replace: true });
      return;
    }

    const confirmPayment = async () => {
      try {
        console.log("🚀 Sending token and payerId to backend...");
        const res = await api.post('/payment/confirm', { token, payerId });

        console.log("✅ Backend response:", res);

        const orderId = res.data?.data?.transactionId;
        const success = res.data?.data?.success;

        if (success && orderId) {
          console.log("✅ Payment successful → navigate to orderplaced");
          navigate('/orderplaced', { replace: true, state: { orderId } });
        } else {
          toast.error("Payment failed.");
          navigate('/paymentfailed', { replace: true });
        }
      } catch (err) {
        console.error("❌ Error confirming payment:", err.response?.data || err.message);
  toast.error("Payment verification failed.");
  navigate('/paymentfailed', { replace: true });
      }
    };

    if (!hasRun.current) {
      hasRun.current = true;
      confirmPayment();
    }
  }, [location, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg text-gray-700 animate-pulse">Verifying payment, please wait...</p>
    </div>
  );
};

export default PaypalReturnHandler;
