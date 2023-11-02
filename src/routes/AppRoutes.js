// React route
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../Components/Home';
import Login from '../Components/Login';
import TableUsers from '../Components/TableUsers';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </>
    )
}
export default AppRoutes