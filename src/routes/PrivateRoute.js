// React route
import { Routes, Route, Link } from 'react-router-dom';
//useContext
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const PrivateRoute = (props) => {
    const { user, loginContext } = useContext(UserContext);
    /**UserContext là một biến hoặc đối tượng mà bạn đã tạo bằng React.createContext() để chia sẻ dữ liệu trong toàn bộ ứng 
     * dụng của bạn.
     * Sau khi bạn đã truy cập ngữ cảnh UserContext, bạn muốn trích xuất dữ liệu người dùng từ đó. Biến user là một biến bạn 
     * đặt tên để lưu trữ giá trị dữ liệu người dùng từ ngữ cảnh UserContext. */
    if (user && !user.auth) {
        return (
            <>
                <Alert className='mt-3' variant="danger" dismissible>
                    <Alert.Heading>Thông báo!</Alert.Heading>
                    <h4 className='alert alert-danger'>Xin lỗi! Bạn không là quản trị viên!</h4>
                </Alert>
            </>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoute;