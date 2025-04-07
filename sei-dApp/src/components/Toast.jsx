import React from 'react'

export default function Toast() {
	return (
		<div>
			<ToastContainer
				position='top-center'
				autoClose={2000}
				limit={2}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
				transition={Flip}
			/>
		</div>
	)
}
