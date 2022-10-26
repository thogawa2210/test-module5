
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Detail from "./pages/Detail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Home />}></Route>
                <Route path='/products/:id' element={<Detail />}></Route>
                <Route path='/add' element={<AddProduct />}></Route>
                <Route path='/edit/:id' element={<EditProduct />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
