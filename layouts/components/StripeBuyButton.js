

import React from 'react'

function StripeBuyButton() {
  return (
    <stripe-buy-button
      buy-button-id="buy_btn_1O0bSjL677QhnBEOnoQC3U3G"
      publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
    />
  )
}

export default StripeBuyButton
