import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css';
import image1 from './eating.png'
import image2 from './ready.png'
import image3 from './track.png'
// import { ReactComponent as MyButton } from './arrow.svg'
import { useHistory } from "react-router-dom";

const images = [image1, image2, image3];

function HomePage() {

    let history = useHistory()

    return (
        <div className='home-page-background'>
            {/* <div className='home-page-background-img'> */}
            <button className="button" onClick={() => history.push("/food/search")}>Try it out <i class="fa-solid fa-angles-right"></i></button>
            <div className="image-container">

                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="image"
                        style={{ animationDelay: `${index}s` }}
                    />
                ))}
                <Container className='home-page-container' style={{}}>
                    <Carousel style={{ zIndex: '0', position: 'relative' }}>
                    <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://wallpaperaccess.com/full/3278152.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
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
                    </Carousel>
                    <div className='background'>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default HomePage
