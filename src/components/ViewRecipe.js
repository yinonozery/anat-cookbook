import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import '../css/ViewRecipe.css';

const ViewRecipe = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        // Get recipe data
        getRecipe();
    }, []);

    const timeConvert = (n) => {
        // Convert minutes to [h:m] format
        var num = n;
        var hours = Math.floor(num / 60);
        var minutes = n % 60;
        if (hours === 0) return minutes;
        return hours + ':' + minutes;
    };

    // Get all recipes from db
    const getRecipe = async () => {
        const opts = {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        };

        await fetch(`http://localhost:3001/recipe/${id}`, opts)
            .then((res) => res.text())
            .then((text) => {
                setRecipe(JSON.parse(text));
                document.title = ` ${JSON.parse(text).title}`;
            });
        setIsLoading(false);
    };

    if (isLoading) return <Spinner />;
    return (
        <>
            <div className='recipe_details_bg'>
                <div className='recipe_details_content'>
                    <h1>{recipe.title}</h1>
                    <hr />
                    <p>{recipe.summary}</p>
                    <p>צפיות: {recipe.views}</p>
                    <center>
                        <img src={recipe.picture_url} alt='' />
                    </center>
                </div>
                <div className='recipe_categories'>
                    <div className='category'>
                        <span className='title'>קטגוריה</span>
                        <div className='recipe_cats'>
                            {recipe.category.map((cat, index) => {
                                return (
                                    <p key={index}>
                                        <a
                                            href={`/categories/${encodeURIComponent(
                                                cat.name
                                            )}`}>
                                            {cat.name}
                                        </a>
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <div className='category'>
                        <span className='title'>דרגת קושי</span>
                        <p>{recipe.difficulty}</p>
                    </div>
                    <div className='category'>
                        <span className='title'>זמן הכנה</span>
                        <p>{timeConvert(recipe.duration)}</p>
                    </div>
                    <div className='category'>
                        <span className='title'>כמות סועדים</span>
                        <p>{recipe.serving}</p>
                    </div>
                    <div className='category'>
                        <span className='title'>קלוריות</span>
                        <p>~{recipe.calories}</p>
                    </div>
                </div>
                <div className='recipe_details_content'>
                    <h2>מרכיבים</h2>
                    <ol>
                        {recipe.ingredients.map((step, index) => {
                            // Adding full stop (dot) at the end of the step if needed
                            return (
                                <li key={index}>
                                    &ensp;{step.qty} {step.unit} - {step.name}
                                </li>
                            );
                        })}
                    </ol>

                    <h2>הוראות הכנה</h2>
                    <ol>
                        {recipe.instructions.map((step, index) => {
                            // Adding full stop (dot) at the end of the step if needed
                            step +=
                                step.charAt(step.length - 1) !== '.' ? '.' : '';

                            return <li key={index}>&ensp;{step}</li>;
                        })}
                    </ol>
                </div>
            </div>
        </>
    );
};

export default ViewRecipe;
