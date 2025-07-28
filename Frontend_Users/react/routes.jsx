import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './src/App';
import { About } from './components/About';
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Article } from "./components/article";
import { Contact } from "./components/Contact";

export const router=createBrowserRouter([{
    path:"/",
    element:<App />,
    children:[
        {index:true,element:<Navigate to="home" replace />},{path:"home",element:<Home />},{path:"about",element:<About />},{path:"contact",element:<Contact />},
    ]
    },
    {path:"/signup",
    element:<SignUp />,
    },
    {path:"/login",
        element:<Login />,
    },
    {path:"/article",
        element:<Article />,
    },
])

