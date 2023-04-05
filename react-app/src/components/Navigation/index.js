import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				<NavLink exact to="/food/search">Food Search</NavLink>
			</li>
			<li>
				<NavLink exact to="/food/diary">Food Diary</NavLink>
			</li>
			<li>
				<NavLink exact to="/exercise/search">Exercise Search</NavLink>
			</li>
			<li>
				<NavLink exact to="/exercise/diary">Exercise Diary</NavLink>
			</li>
			<li>
				<NavLink exact to="/profile">Profile</NavLink>
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
