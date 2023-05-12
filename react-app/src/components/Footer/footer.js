import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer style={{zIndex:'999', position: 'relative'}}>
            <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#6c757d', zIndex: '999' }}>
                <a href='https://www.linkedin.com/in/anthony-v-67a490214/' className='footer-link' ><i class="fa-brands fa-linkedin"></i></a>
                <a href='https://github.com/hvu24' className='footer-link' ><i class="fa-brands fa-github"></i></a>
            </div>
        </footer>

    );
}

export default Footer;
