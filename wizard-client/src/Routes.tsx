import { Route, Routes } from "react-router-dom";
import Play from "./Play/Play";

const AppRoutes = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Play />}/>
            </Routes>
        </div>
    );
}

export default AppRoutes;