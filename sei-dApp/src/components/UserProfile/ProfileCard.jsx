import React from 'react'
import profileImage from '../../assets/images/profileImage.jpg'
const ProfileCard = () => {
	return (
		<div className='max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
			<img
				className='w-full h-48 object-cover'
				src={profileImage}
				alt='Profile'
			/>
			<div className='p-4'>
				<h2 className='text-2xl font-bold text-gray-800'>John Doe</h2>
				<p className='text-gray-600'>Software Engineer</p>
				<div>
					<div>
						<h2 className='text-2xl font-bold text-gray-800'>
							Skills
						</h2>
						<p>Web Dev, ML, Ai</p>
					</div>
				</div>
				{/* <div className='mt-4'>
					<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
						Follow
					</button>
				</div> */}
			</div>
		</div>
	)
}

export default ProfileCard
