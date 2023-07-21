import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import '../css/Profile.css';

const Profile = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const [myFavoritesRecipes, setMyFavoritesRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let totalViews = 0;

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const getProfile = async () => {
            setIsLoading(true);
            const opts = {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
            };

            await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/favorites/`, opts).then(
                (res) => {
                    res.text().then((text) => {
                        text = JSON.parse(text);
                        setMyFavoritesRecipes(text?.data.favoritesList);
                        setMyRecipes(text?.data.recipesList);
                    });
                }
            );
            setIsLoading(false);
        };
        getProfile();
    }, []);

    return (
        <div className='profile_card'>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <span className='profile_title'>
                        <h1>
                            {userInfo.username}{' '}
                            {userInfo.isAdmin ? ' - מנהל' : null}
                        </h1>
                    </span>

                    <h4>המתכונים שלי</h4>
                    <ol>
                        {myRecipes.map((fav, index) => {
                            totalViews += fav.views;
                            return (
                                <li key={index}>
                                    <a href={`/recipe/${fav.rid}`}>
                                        {fav.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ol>
                    <h5>סטטיסטיקות</h5>
                    <div className='profile_stats'>
                        <div className='profile_stats_block'>
                            <span className='title'>מתכונים</span>
                            <p>{myRecipes.length}</p>
                        </div>
                        <div className='profile_stats_block'>
                            <span className='title'>צפיות</span>
                            <p>{totalViews}</p>
                        </div>
                    </div>

                    <h4>&#10084; מתכונים שמורים &#10084;</h4>
                    <ol>
                        {myFavoritesRecipes.map((fav, index) => {
                            return (
                                <li key={index}>
                                    <a href={`/recipe/${fav.rid}`}>
                                        {fav.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ol>
                </>
            )}
        </div>
    );
};
export default Profile;
