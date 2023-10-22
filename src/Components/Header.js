import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//React route
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = (props) => {
    //Chức năng đăng xuất
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        /**Dòng này xóa giá trị của token được lưu trữ trong local storage. Điều này đồng nghĩa với việc đăng xuất người 
         * dùng bằng cách xóa thông tin xác thực của họ. */
        navigate('/');
        /**Chuyển hướng về trang chủ */
        toast.success('Đăng xuất thành công!');
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary sticky-top">
                <Container>
                    <Navbar.Brand>
                        <NavLink to="/" className="nav-link text-decoration-none text-dark">
                            <img src="logo512.png" className="App-logo" alt="logo" />
                        </NavLink>
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
                                <NavDropdown.Item onClick={() => handleLogout()} >
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