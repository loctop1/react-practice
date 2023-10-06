import logo from './logo.svg';
import './App.scss';
import Header from './Components/Header';
import TableUsers from './Components/TableUsers';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <>
      <div className='app-container'>
        <Header/>
        <TableUsers/>
      </div>
    </>
  );
}

export default App;
