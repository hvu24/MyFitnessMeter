import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css';

function HomePage() {
    return (
        <div className='home-page-background'>
            <div className='home-page-background-img'>
                {/* <img className='background-image' src="./Black\ and\ Blue\ Simple\ Woman\ Barbell\ Workout\ Background.png" alt="Image"></img> */}
                <Container className='home-page-container' style={{}}>
                    <Carousel style={{ zIndex: '0', position: 'relative' }}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://wallpaperaccess.com/full/1189562.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://wallpaperaccess.com/full/5184563.jpg"
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://wallpaperaccess.com/full/749812.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://wallpaperaccess.com/full/3278152.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <div className='background'>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default HomePage
