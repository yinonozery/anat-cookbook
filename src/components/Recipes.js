import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import '../css/RecipesList.css';
import RecipeDetailsBox from './RecipeDetailsBox';

const Recipes = () => {
    const [RecipesArr, setRecipesArr] = useState([]);
    const [cat, setCat] = useState('0');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRecipes();
    }, []);

    // Get all recipes from db
    const getRecipes = async () => {
        const opts = {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        };

        await fetch('/recipes/', opts)
            .then((res) => res.text())
            .then((text) => {
                setRecipesArr(JSON.parse(text));
            });
        setIsLoading(false);
    };

    const filterRecipes = (e) => {
        if (e === '0') return RecipesArr;
        const filteredRecipesArr = RecipesArr.filter((recipe) => {
            if (recipe.category === e) return true;
            return false;
        });
        return filteredRecipesArr;
    };

    // Spinner
    if (isLoading) return <Spinner />;

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
                קטגוריות: &nbsp;
                <select
                    onChange={(e) => setCat(e.target.value)}
                    defaultValue={'0'}>
                    <option value='0'>הכל</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </select>
            </div>
            <div className='recipes'>
                {filterRecipes(cat).map((recipe, index) => {
                    return (
                        <div className='card' key={index}>
                            <RecipeDetailsBox
                                recipe={recipe}
                                showCategories={true}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Recipes;
