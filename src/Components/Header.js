import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//React route
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//useContext
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';

const Header = (props) => {
    const { logout, user } = useContext(UserContext);
    /**UserContext là một biến hoặc đối tượng mà bạn đã tạo bằng React.createContext() để chia sẻ dữ liệu trong toàn bộ ứng 
     * dụng của bạn.
     * Sau khi bạn đã truy cập ngữ cảnh UserContext, bạn đang trích xuất một phương thức hoặc hàm có tên logout từ ngữ cảnh 
     * đó. Điều này giả sử rằng UserContext cung cấp một phương thức logout để thực hiện việc đăng xuất người dùng khi cần. */
    const [hideHeader, setHideHeader] = useState(false);
    // useEffect(() => {
    //     if (window.location.pathname === '/login') {
    //         setHideHeader(true);
    //     }
    // }, []);

    //Chức năng đăng xuất
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
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
                            <img src="2560px-TikTok_logo.svg.png" className="App-logo" alt="logo" />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/') &&
                            /**window.location.pathname === '/' Nếu đường dẫn hiện tại của trình duyệt là '/', thì luôn hiện 
                             * thông tin */
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className="nav-link text-decoration-none text-dark">Trang chủ</NavLink>
                                    <NavLink to="/users" className="nav-link text-decoration-none text-dark">Danh sách người dùng</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className='nav-link'>Xin chào <b>{user.email}</b></span>}
                                    <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                                        {user && user.auth === true
                                            ?
                                            <NavDropdown.Item onClick={() => handleLogout()} >
                                                <NavLink to="/logout" className="nav-link text-decoration-none text-dark">
                                                    Đăng xuất
                                                </NavLink>
                                            </NavDropdown.Item>
                                            // Nếu mà đã đăng nhập rồi thì chỉ có nút đăng xuất
                                            :
                                            <NavDropdown.Item>
                                                <NavLink to="/login" className="nav-link text-decoration-none text-dark">
                                                    Đăng nhập
                                                </NavLink>
                                            </NavDropdown.Item>
                                            // Nếu mà chưa đăng nhập thì chỉ có nút đăng đăng nhập
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}
export default Header;