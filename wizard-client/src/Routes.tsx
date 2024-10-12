import { Route, Routes } from "react-router-dom";
import Play from "./Play/Play";
import NewQuiz from "./NewQuiz/NewQuiz";

const AppRoutes = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Play />}/>
                <Route path="/create" element={<NewQuiz />}/>
            </Routes>
        </div>
    );
}

export default AppRoutes;