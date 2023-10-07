import logo from './logo.svg';
import './App.scss';
import Header from './Components/Header';
import TableUsers from './Components/TableUsers';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ModalAddNew from './Components/ModalAddNew';
import { useState } from 'react';

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  /**Khai báo biến state isShowModalAddNew và hàm setIsShowModalAddNew để quản lý trạng thái hiển thị 
   * modal, ban đầu được đặt là false để ẩn modal. */

  //Chức năng đóng Modal
  const handleClose = () => {
    setIsShowModalAddNew(false);
    /**Khi được gọi, hàm này sẽ đặt giá trị của biến isShowModalAddNew thành false, dẫn đến việc 
     * ẩn modal. */
  }
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <div className='my-3 fs-2 fw-bold add-new'>
            <span>
              <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} size='sm' /> Danh sách người dùng
            </span>
            <button onClick={() => setIsShowModalAddNew(true)} className='btn btn-primary btn-lg float-end'>
              Thêm người dùng
            </button>
          </div>
          <TableUsers />
        </Container>
        <ModalAddNew
          show={isShowModalAddNew}
          /**truyền giá trị của biến isShowModalAddNew vào prop show của <ModalAddNew>. Điều này sẽ 
           * quyết định xem modal có được hiển thị (nếu isShowModalAddNew là true) hoặc ẩn đi 
           * (nếu isShowModalAddNew là false). */
          handleClose={handleClose}
        /**truyền hàm handleClose vào prop handleClose của <ModalAddNew>. Khi người dùng tương tác 
         * và muốn đóng modal, hàm này sẽ được gọi để thay đổi giá trị của isShowModalAddNew thành 
         * false, dẫn đến việc ẩn modal. */
        />
      </div>
    </>
  );
}

export default App;
