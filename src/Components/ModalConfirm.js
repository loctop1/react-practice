import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//Modal xóa User
import { deleteUser } from '../service/UserService';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;
    /**Giải nén props để lấy giá trị show và handleClose */

    //Chức năng xóa User
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        /**Gọi hàm deleteUser (trước đó bạn đã cung cấp) để xóa người dùng với id từ biến dataUserDelete. Kết quả của hàm \
         * này được lưu trong biến res. */
        if (res && +res.statusCode === 204) {
            /**Kiểm tra nếu kết quả (res) tồn tại và mã trạng thái HTTP (statusCode) của phản hồi là 204, thể hiện rằng xóa 
             * thành công.
             * +res.statusCode: Trong đó, res.statusCode là một thuộc tính trong đối tượng phản hồi từ yêu cầu API. Toán 
             * tử + được sử dụng để chuyển đổi giá trị này sang kiểu số. Mục tiêu là kiểm tra xem mã trạng thái HTTP của 
             * phản hồi có phải là 204 hay không. */
            toast.success(`Đã xóa người dùng ${dataUserDelete.email} thành công!`);
            handleClose()
            handleDeleteUserFromModal(dataUserDelete)
            /**Gọi hàm handleDeleteUserFromModal để thực hiện xóa người dùng khỏi modal hoặc cửa sổ hiện tại. */
        } else {
            toast.error(`Lỗi!Không thể xóa người dùng ${dataUserDelete.email}!`);
        }
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