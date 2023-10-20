import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//React route
import { useLocation, NavLink } from 'react-router-dom';

const Header = (props) => {
    const location = useLocation();
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary sticky-top">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="logo512.png" className="App-logo" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link text-decoration-none text-dark">Trang chủ</NavLink>
                            <NavLink to="/users" className="nav-link text-decoration-none text-dark">Danh sách người dùng</NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <NavLink to="/login" className="nav-link text-decoration-none text-dark">
                                        Đăng nhập
                                    </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/logout">
                                    <NavLink to="/logout" className="nav-link text-decoration-none text-dark">
                                        Đăng xuất
                                    </NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;