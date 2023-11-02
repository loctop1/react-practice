import Alert from 'react-bootstrap/Alert';

const NotFound = () => {
    return (
        <>
            <Alert className='mt-3' variant="danger" dismissible>
                <Alert.Heading>Thông báo!</Alert.Heading>
                <h4 className='alert alert-danger'>Trang này không hợp lệ!</h4>
            </Alert>
        </>
    )
}
export default NotFound;