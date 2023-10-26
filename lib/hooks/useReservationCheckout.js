import { useState, useEffect } from "react";

export function useReservationCheckout() {
  const [isReservationCheckoutVisible, setIsReservationCheckoutVisible] = useState(false);

  const openReservationCheckout = () => {
    setIsReservationCheckoutVisible(true);
  };

  const closeReservationCheckout = () => {
    setIsReservationCheckoutVisible(false);
  };

  useEffect(() => {
    if (isReservationCheckoutVisible) {
      // Prevent scrolling when the modal is visible
      document.body.style.overflow = "hidden";
    } else {
      // Reset the body's overflow property
      document.body.style.overflow = "auto";
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isReservationCheckoutVisible]);

  return {
    isReservationCheckoutVisible,
    openReservationCheckout,
    closeReservationCheckout,
  };
}
