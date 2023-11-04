import logo from './logo.svg';
import './App.scss';
import Header from './Components/Header';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalAddNew from './Components/ModalAddNew';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
// Route
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';

function App() {
  const dispatch = useDispatch();

  //Chức năng cập nhật lại dữ liệu khi re-render
  useEffect(() => {
    if (localStorage.getItem('token')) {
      /**Trong hàm useEffect, kiểm tra xem có một mục 'token' trong localStorage không bằng cách sử dụng 
       * localStorage.getItem('token'). */
      dispatch(handleRefresh());
      /**Nếu có mục 'token' trong localStorage, mã sẽ gọi hàm handleRefresh() thông qua dispatch. Việc này có thể được sử 
       * dụng để làm mới thông tin xác thực của người dùng hoặc thực hiện các tác vụ khác liên quan đến việc có token. */
    }
  }, []);
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <AppRoutes />
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
