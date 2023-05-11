import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css';

function HomePage() {
    return (
        <Container style={{ height: '1732px', backgroundColor: 'black', zIndex: '-1', position: 'static' }}>
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
    );
}

export default HomePage
