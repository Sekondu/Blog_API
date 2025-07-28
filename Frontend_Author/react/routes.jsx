import { createBrowserRouter } from "react-router-dom";
import App from './src/App';
import { Login } from "./components/login";
import Edit from './components/edit';
import Add from './components/add';
export const router=createBrowserRouter(
    [
    {path:"/",element:<App />},
    {path:"/Adminlogin",element:<Login />,},
    {path:"/edit",element:<Edit />},
    {path:"/add",element: <Add />},
]
)
