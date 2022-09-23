import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from '../About';
import NewRecipe from '../NewRecipe.js';
import Recipes from '../Recipes';
import ViewRecipe from '../ViewRecipe';
import SuccessMsg from '../SuccessMsg';
import ViewCategory from '../ViewCategory';

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/about' element={<About />} />
                <Route path='/success/:name' element={<SuccessMsg />} />
                <Route path='/recipes/new' element={<NewRecipe />} />
                <Route path='/recipe/:id' element={<ViewRecipe />} />
                <Route path='/categories/:name' element={<ViewCategory />} />
            </Routes>
        </Router>
    );
};

export default Routing;
