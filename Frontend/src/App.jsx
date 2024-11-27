//Dependencies
import { BrowserRouter,Routes,Route } from "react-router-dom";
//Modules
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Home from "./Home/Home";
import Archive from "./Archive/Archive";


const App=()=>
{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/archive" element={<Archive/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;