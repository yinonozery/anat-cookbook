import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import RecipeDetailsBox from './RecipeDetailsBox';

const ViewCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [listRecipes, setListRecipes] = useState([]);
    const { name } = useParams();
    document.title = name;

    const getCategory = async () => {
        const opts = {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        };

        await fetch(
            `http://localhost:3001/categories/${encodeURIComponent(name)}`,
            opts
        )
            .then((res) => res.text())
            .then((text) => {
                setListRecipes(JSON.parse(text));
            });
        setIsLoading(false);
    };

    useEffect(() => {
        getCategory();
    }, []);

    if (isLoading) return <Spinner />;
    return (
        <div className='recipes'>
            {listRecipes.map((recipe, index) => {
                return (
                    <div className='card' key={index}>
                        <RecipeDetailsBox
                            recipe={recipe}
                            showCategories={false}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ViewCategory;
