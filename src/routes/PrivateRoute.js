// React route
import { Routes, Route, Link } from 'react-router-dom';
//useContext
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
    const user = useSelector(state => state.user.account);
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
/**react-error-overlay là một thư viện JavaScript được sử dụng trong các ứng dụng React để cải thiện trải nghiệm gỡ lỗi. 
 * Thư viện này giúp hiển thị thông báo lỗi và stack trace (ngăn xếp cuộc gọi) khi có lỗi xảy ra trong ứng dụng React của 
 * bạn, giúp bạn dễ dàng xác định và sửa lỗi trong quá trình phát triển. */