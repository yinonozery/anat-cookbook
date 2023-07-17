import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import RecipeDetailsBox from './RecipeDetailsBox';
import SelectCategories from './SelectCategories.js';
import '../css/RecipesList.css';

const Recipes = () => {
    const [RecipesArr, setRecipesArr] = useState([]);
    const [cats, setCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
            const opts = {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
            };

            await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/api/recipes/`,
                opts
            ).then((res) => {
                res.text().then((text) => {
                    text = JSON.parse(text);
                    if (!text.isLoggedIn) {
                        //alert(text.message);
                        document.location.href = '/login';
                    } else setRecipesArr(text.data);
                });
            });
            setIsLoading(false);
        };
        getRecipes();
    }, []);

    const filterRecipes = (e) => {
        if (e === '0') return RecipesArr;
        const filteredRecipesArr = RecipesArr.filter((recipe) => {
            if (selected.length === 0) return true;
            else if (
                recipe.category.some((s) => {
                    return selected.some((select) => select.label === s.name);
                })
            )
                return true;
            return false;
        });
        return filteredRecipesArr;
    };

    return (
        <>
            <div className='filter_options'>
                <p>
                    סינון ומיון &nbsp;
                    <img
                        src={require('../assets/sort.png')}
                        alt=''
                        style={{ verticalAlign: 'middle' }}
                    />
                </p>
                <span>קטגוריות:</span>
                <SelectCategories
                    cat={cats}
                    setCat={setCats}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>

            {isLoading && <Spinner />}

            <div className='recipes'>
                {filterRecipes(cats).map((recipe, index) => {
                    return (
                        <RecipeDetailsBox
                            recipe={recipe}
                            showCategories={true}
                            key={index}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Recipes;
