// src/components/common/Toast.jsx
import React from 'react'
import { Flip, ToastContainer, toast } from 'react-toastify'

// Flexible toast dispatcher
export const showToast = (message, type = '.default') => {
    toast[type](message)
}

export default function Toast() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Flip}
        />
    )
}
