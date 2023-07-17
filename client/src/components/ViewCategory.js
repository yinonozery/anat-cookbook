import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import RecipeDetailsBox from './RecipeDetailsBox';

const ViewCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [listRecipes, setListRecipes] = useState([]);
    const { name } = useParams();
    document.title = name;

    useEffect(() => {
        const getCategory = async () => {
            const opts = {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
            };

            await fetch(
                `${
                    process.env.REACT_APP_API_BASE_URL
                }/api/categories/${encodeURIComponent(name)}`,
                opts
            )
                .then((res) => res.text())
                .then((text) => {
                    setListRecipes(JSON.parse(text));
                });
            setIsLoading(false);
        };
        getCategory();
    }, [name]);

    if (isLoading) return <Spinner />;
    return (
        <div className='recipes'>
            {listRecipes.map((recipe, index) => {
                return (
                    <RecipeDetailsBox
                        recipe={recipe}
                        showCategories={false}
                        key={index}
                    />
                );
            })}
        </div>
    );
};

export default ViewCategory;
