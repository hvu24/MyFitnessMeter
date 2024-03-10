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
						{/* <Nav.Link href="#home"><NavLink exact to="/" className='link' ><i class="fa-solid fa-house"> Home</i></NavLink></Nav.Link> */}
						<Nav.Link href="#link"><NavLink exact to="/food/search" className='link' ><i class="fa-solid fa-magnifying-glass"> Food Search</i></NavLink></Nav.Link>
						<Nav.Link href="#link"><NavLink exact to="/food/diary" className='link' ><i class="fa-solid fa-apple-whole"> Food Diary</i></NavLink></Nav.Link>
						<Nav.Link href="#link"><NavLink exact to="/exercise/diary" className='link' ><i class="fa-solid fa-bicycle"> Exercise Diary</i></NavLink></Nav.Link>
						<Nav.Link href="#link"><NavLink exact to="/profile" className='link' ><i class="fa-solid fa-user-doctor"> Fitness Profile</i></NavLink></Nav.Link>
						{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown> */}
						{isLoaded && (
							<Nav.Link><ProfileButton user={sessionUser} /></Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		// <div className='nav-div'>
		// 	<NavLink exact to="/" className='link' ><i class="fa-solid fa-house"> Home</i></NavLink>
		// 	<NavLink exact to="/food/search" className='link' ><i class="fa-solid fa-magnifying-glass"> Food Search</i></NavLink>
		// 	<NavLink exact to="/food/diary" className='link' ><i class="fa-solid fa-apple-whole"> Food Diary</i></NavLink>
		// 	<NavLink exact to="/exercise/diary" className='link' ><i class="fa-solid fa-bicycle"> Exercise Diary</i></NavLink>
		// 	<NavLink exact to="/profile" className='link' ><i class="fa-solid fa-user-doctor"> Fitness Profile</i></NavLink>
		// 	{isLoaded && (
		// 		<ProfileButton user={sessionUser} />
		// 	)}
		// </div>
	);
}

export default Navigation;
