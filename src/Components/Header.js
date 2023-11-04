import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//React route
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//useContext
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction';

const Header = (props) => {
    //Chức năng đăng xuất
    const navigate = useNavigate();
    const user = useSelector(state => state.user.account);
    /**Điều này có nghĩa rằng bạn đang truy cập thông tin tài khoản của người dùng từ Redux store và lưu trữ nó trong biến 
     * user để sử dụng trong giao diện người dùng của bạn. */
    const dispatch = useDispatch();
    //Đăng xuất
    const handleLogout = () => {
        dispatch(handleLogoutRedux());
    }
    /**Hàm handleLogout thực hiện việc gọi một hành động Redux thông qua hàm handleLogoutRedux() và gửi nó đến Redux store 
     * thông qua dispatch. */

    // Chức năng quay lại trang chủ
    useEffect(() => {
        if (user && user.auth === false && window.location.pathname !== '/login') {
            /**window.location.pathname !== '/login' đang kiểm tra xem nếu địa chỉ URL của trang hiện tại không phải là 
             * "/login" thì điều kiện này sẽ trả về true, ngược lại sẽ trả về false. Điều này đảm bảo rằng mã trong 
             * useEffect chỉ sẽ thực hiện khi người dùng không ở trên trang /login. */
            navigate('/');
            /**Chuyển hướng về trang chủ */
        }
        /**Nếu người dùng đăng nhập thành công thì sẽ quay về trang chủ */
    }, [user])
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
                                <Nav className="me-auto fs-5 fw-bold">
                                    <NavLink to="/" className="nav-link text-decoration-none text-dark">Trang chủ</NavLink>
                                    <NavLink to="/users" className="nav-link text-decoration-none text-dark">Danh sách người dùng</NavLink>
                                </Nav>
                                <Nav className='fs-5'>
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