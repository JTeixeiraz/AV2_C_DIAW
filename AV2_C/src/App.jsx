import { createBrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

createBrowserRouter([
    {
        path: "/",
        Component: Home
    }
])
function App(){
    return(
        <main>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
        </main>
        
    );
}

export default App;