import { FaInstagram } from 'react-icons/fa';
import classes from './layout.module.css';

const Footer = () =>{

    return(
        <footer className={classes.footer}>

            <h6 className={classes.footerText}>Support email: <a href="mailto:support@workouttracker.com" className={classes.footerLink}>support@workouttracker.com</a></h6>
            <a href="https://www.instagram.com/" className={classes.footerText}>
                <FaInstagram size={40} />
            </a>
        </footer>
    );

}

export default Footer;