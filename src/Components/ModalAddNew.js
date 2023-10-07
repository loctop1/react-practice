import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const ModalAddNew = (props) => {
    const { show, handleClose } = props;
    /**Giải nén props để lấy giá trị show và handleClose */
    const [name, setName] = useState("");
    /**Khai báo biến name và hàm setName để quản lý state của name */
    const [job, setJob] = useState("");
    /**Khai báo biến job và hàm setJob để quản lý state của job */

    //tạo chức năng khi ấn lưu thông tin
    const handleSaveUser = () => {
        console.log('>>> check state: ', 'name = ', name, 'job', job);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='fw-bold'>Họ và tên</Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className='border-dark'
                                    type="text"
                                    placeholder="Vui lòng nhập họ và tên"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='fw-bold'>Nghề nghiệp</Form.Label>
                                <Form.Control
                                    value={job}
                                    onChange={(event) => setJob(event.target.value)}
                                    className='border-dark'
                                    type="text"
                                    placeholder="Vui lòng nhập công việc của bạn" />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={() => handleSaveUser()}>
                        Lưu Thay Đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddNew;