import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Navbar.Brand as={Link} to="/">Auctions Mine</Navbar.Brand>
            </Navbar>
        </>
    );
}

export default Header;