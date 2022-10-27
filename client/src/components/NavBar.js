import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/NavBar.css';

const NavBar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [currPage, setCurrPage] = useState('');
    const { userInfo } = useSelector((state) => state.user);

    const headers = [
        {
            title: 'פרופיל',
            link: 'profile',
            userLogged: true,
        },
        {
            title: 'רשימת מתכונים',
            link: 'recipes',
            userLogged: true,
        },
        {
            title: 'הוספת מתכון',
            link: 'recipes/new',
            userLogged: true,
        },
        {
            title: 'הרשמה',
            link: 'register',
            userLogged: false,
        },
        {
            title: 'התחברות',
            link: 'login',
            userLogged: false,
        },
        {
            title: 'התנתקות',
            link: 'logout',
            userLogged: true,
            className: 'nav-no-highlight-red',
        },
    ];

    window.onload = () => {
        setCurrPage(window.location.pathname.slice(1));
    };

    return (
        <>
            <nav className='navigation'>
                <button
                    className='hamburger'
                    onClick={() => {
                        setIsNavExpanded(!isNavExpanded);
                    }}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='white'>
                        <path
                            fillRule='evenodd'
                            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
                <div
                    className={
                        isNavExpanded
                            ? 'navigation-menu expanded'
                            : 'navigation-menu'
                    }>
                    <ul>
                        {userInfo ? (
                            <li>ברוכים הבאים, {userInfo.username}</li>
                        ) : (
                            ''
                        )}

                        {headers.map((header, index) => {
                            return (userInfo && header.userLogged) ||
                                (!userInfo && !header.userLogged) ? (
                                <li key={index}>
                                    <a
                                        href={
                                            'http://' +
                                            window.location.host +
                                            `/${header.link}`
                                        }
                                        className={
                                            header.className
                                                ? header.className
                                                : currPage.localeCompare(
                                                      `${header.link}`
                                                  )
                                                ? 'nav-highlight'
                                                : 'nav-no-highlight'
                                        }>
                                        {header.title}
                                    </a>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
