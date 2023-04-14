import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer>
            <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'grey' }}>
                <a href='https://www.linkedin.com/in/anthony-v-67a490214/' className='footer-link' ><i class="fa-brands fa-linkedin"></i></a>
                <a href='https://github.com/hvu24' className='footer-link' ><i class="fa-brands fa-github"></i></a>
            </div>
        </footer>

    );
}

export default Footer;
