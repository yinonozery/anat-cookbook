import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from '../About';
import NewRecipe from '../NewRecipe';
import Recipes from '../Recipes';
import ViewRecipe from '../ViewRecipe';
import SuccessMsg from '../SuccessMsg';
import ViewCategory from '../ViewCategory';
import Register from '../auth/Register';
import Login from '../auth/Login';
import LogOut from '../auth/LogOut';
import Profile from '../Profile';

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/about' element={<About />} />
                <Route path='/success/:name' element={<SuccessMsg />} />
                <Route path='/recipes/new' element={<NewRecipe />} />
                <Route path='/recipe/:id' element={<ViewRecipe />} />
                <Route path='/categories/:name' element={<ViewCategory />} />
                <Route path='/profile/' element={<Profile />} />
                <Route path='/register/' element={<Register />} />
                <Route path='/login/' element={<Login />} />
                <Route path='/logout/' element={<LogOut />} />
            </Routes>
        </Router>
    );
};

export default Routing;
