import { Routes, Route } from 'react-router-dom';
import {
  Header,
  HomePage,
  ListProduct,
  FormProduct,
  ListUser,
  FormUser,
} from './components'

function App() {
    return (
        <div className="App">
          <Header />

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product' element={<ListProduct />} />
            <Route path='/product/create' element={<FormProduct />} />
            <Route path='/product/edit/:productId' element={<FormProduct />} />
            <Route path='/user/' element={<ListUser />} />
            <Route path='/user/create' element={<FormUser />} />
            <Route path='/user/edit/:userId' element={<FormUser />} />
          </Routes>
        </div>
    );
}

export default App;
