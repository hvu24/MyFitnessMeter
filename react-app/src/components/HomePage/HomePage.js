import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css';
import image1 from './eating.png'
import image2 from './ready.png'
import image3 from './track.png'
import { useHistory } from "react-router-dom";

const images = [image1, image2, image3];

function HomePage() {

    let history = useHistory()

    return (
        <section className='hero-section'>
            <button className="try-button" onClick={() => history.push("/food/search")}>Try it out <i class="fa-solid fa-angles-right"></i></button>
            <Container className='animation-container'>
                <div>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="start-tracking-image"
                            style={{ animationDelay: `${index}s` }}
                        />
                    ))}
                </div>
                <div className='motivation-panel'>
                    <Carousel>
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
                </div>
            </Container>
        </section >
    );
}

export default HomePage
