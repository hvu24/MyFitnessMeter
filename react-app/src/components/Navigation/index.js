import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className="no-bullet">
			<li>
				<NavLink exact to="/food/search" className='link' ><i class="fa-solid fa-house"> Home</i></NavLink>
			</li>
			<li>
				<NavLink exact to="/food/search" className='link' ><i class="fa-solid fa-magnifying-glass"> Food Search</i></NavLink>
			</li>
			<li>
				<NavLink exact to="/food/diary" className='link' ><i class="fa-solid fa-apple-whole"> Food Diary</i></NavLink>
			</li>
			{/* <li>
				<NavLink exact to="/exercise/search">Exercise Search</NavLink>
			</li> */}
			<li>
				<NavLink exact to="/exercise/diary" className='link' ><i class="fa-solid fa-bicycle"> Exercise Diary</i></NavLink>
			</li>
			<li>
				<NavLink exact to="/profile" className='link' ><i class="fa-solid fa-user-doctor"> Fitness Profile</i></NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
