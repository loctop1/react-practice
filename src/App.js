import logo from './logo.svg';
import './App.scss';
import Header from './Components/Header';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalAddNew from './Components/ModalAddNew';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//useContext
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useEffect } from 'react';
// Route
import AppRoutes from './routes/AppRoutes';
import { useSelector } from 'react-redux';

function App() {
  const dataUserRedux = useSelector(state => state.user.account);
  /**useSelector là một hook được cung cấp bởi thư viện Redux Toolkit hoặc thư viện React-Redux. Hook này được sử dụng trong 
   * các thành phần React để chọn dữ liệu từ trạng thái Redux.
   * state là đối số đầu tiên của hàm callback truyền vào useSelector. Đối số này là trạng thái Redux tổng hợp (root state) 
   * hoặc một phần của trạng thái mà bạn muốn truy cập.
   * state.user.account truy cập dữ liệu từ trạng thái Redux thông qua state. Cụ thể, nó truy cập trường account trong đối 
   * tượng user trong trạng thái Redux. */

  const { user, loginContext } = useContext(UserContext);
  /**UserContext là một biến hoặc đối tượng mà bạn đã tạo bằng React.createContext() để chia sẻ dữ liệu trong toàn bộ ứng 
   * dụng của bạn.
   * Sau khi bạn đã truy cập ngữ cảnh UserContext, bạn muốn trích xuất dữ liệu người dùng từ đó. Biến user là một biến bạn 
   * đặt tên để lưu trữ giá trị dữ liệu người dùng từ ngữ cảnh UserContext. */
  console.log('>>> check user: ', user);

  //Chức năng cập nhật lại dữ liệu khi re-render
  useEffect(() => {
    if (localStorage.getItem('token')) {
      /**Mã này kiểm tra xem trong local storage của trình duyệt có một mục có tên là 'token' hay không. Local storage là 
       * một cơ chế để lưu trữ dữ liệu trên trình duyệt web. Nếu tồn tại mục 'token', đoạn mã bên trong if block sẽ được 
       * thực hiện. */
      loginContext(localStorage.getItem('email', localStorage.getItem('token')))
      /**Trong trường hợp mục 'token' tồn tại trong local storage, hàm loginContext được gọi với hai đối số: 
       * localStorage.getItem('email', localStorage.getItem('token')). Hàm này sẽ gọi ngược lại để cập nhật lại dữ liệu*/
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
