import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete } = props;
    /**Giải nén props để lấy giá trị show và handleClose */

    //Chức năng xóa User
    const confirmDelete = () => {

    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                {/* backdrop="static": Thuộc tính này xác định cách backdrop (phần nền) của modal hoạt động. Giá trị 
                "static" đặt backdrop để cố định, tức là nó không biến mất khi người dùng nhấp chuột bên ngoài modal. Điều 
                này đôi khi được sử dụng để yêu cầu người dùng phải tương tác với modal trước khi có thể thực hiện các tác 
                vụ khác.
                keyboard={false}: Thuộc tính này xác định liệu người dùng có thể đóng modal bằng cách bấm phím Esc hay 
                không. Khi giá trị là false, người dùng sẽ không thể đóng modal bằng cách bấm phím Esc. */}
                <Modal.Header closeButton>
                    <Modal.Title>Xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Bạn có muốn xóa người dùng này
                        <br />
                        <b>Email = {dataUserDelete.email}?</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="success" onClick={() => confirmDelete()}>
                        Có, Xóa ngay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalConfirm;