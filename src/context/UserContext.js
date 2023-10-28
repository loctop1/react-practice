import React from "react";

// @function  UserContext
const UserContext = React.createContext({ email: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ email: '', auth: false });

    // Chức năng cập nhật lại dữ liệu API khi load lại trang
    const loginContext = (email, token) => {
        setUser((user) => ({
            email: email,
            auth: true,
        }));
        localStorage.setItem("token", token)
        /**Nếu biến res tồn tại và có thuộc tính token, thì hàm này lưu giá trị res.token vào local storage với key là 
         * "token". Điều này cho phép ứng dụng lưu thông tin đăng nhập để sử dụng trong các yêu cầu sau này. */
        localStorage.setItem("email", email)
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserContext, UserProvider };