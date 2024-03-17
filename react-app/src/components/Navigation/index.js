import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	let location = useLocation();
	const isActive = location.pathname === '/';

	return (
		<Navbar bg="secondary" expand="lg">
			<Container>
				<Navbar.Brand as={NavLink} to="/" style={{ color: 'blue' }} className={isActive ? 'active-brand-link' : 'brand-link'}>MyFitnessMeter</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#link"><NavLink exact to="/food/search" className='link' ><i class="fa-solid fa-magnifying-glass"> Food Search</i></NavLink></Nav.Link>
						<Nav.Link href="#link"><NavLink exact to="/food/diary" className='link' ><i class="fa-solid fa-apple-whole"> Food Diary</i></NavLink></Nav.Link>
						<Nav.Link href="#link"><NavLink exact to="/exercise/diary" className='link' ><i class="fa-solid fa-bicycle"> Exercise Diary</i></NavLink></Nav.Link>
						<Nav.Link href="#link"><NavLink exact to="/profile" className='link' ><i class="fa-solid fa-user-doctor"> Fitness Profile</i></NavLink></Nav.Link>
						{isLoaded && (
							<Nav.Link><ProfileButton user={sessionUser} /></Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
