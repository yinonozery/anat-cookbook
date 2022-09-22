import React, { useState } from 'react';
import '../css/NavBar.css';

const NavBar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [currPage, setCurrPage] = useState('');
    window.onload = () => {
        setCurrPage(window.location.pathname.slice(1));
    };

    return (
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
                    <li>
                        <a
                            href='/'
                            className={
                                currPage.localeCompare('')
                                    ? 'nav-highlight'
                                    : 'nav-no-highlight'
                            }>
                            ראשי
                        </a>
                    </li>
                    <li>
                        <a
                            href='/recipes'
                            className={
                                currPage.localeCompare('recipes')
                                    ? 'nav-highlight'
                                    : 'nav-no-highlight'
                            }>
                            רשימת מתכונים
                        </a>
                    </li>
                    <li>
                        <a
                            href='/about'
                            className={
                                currPage.localeCompare('about')
                                    ? 'nav-highlight'
                                    : 'nav-no-highlight'
                            }>
                            אודות
                        </a>
                    </li>
                    <li>
                        <a
                            href='/recipes/new'
                            className={
                                currPage.localeCompare('recipes/new')
                                    ? 'nav-highlight'
                                    : 'nav-no-highlight'
                            }>
                            הוספת מתכון
                        </a>
                    </li>
                    <li>
                        <a
                            href='/contact'
                            className={
                                currPage.localeCompare('contact')
                                    ? 'nav-highlight'
                                    : 'nav-no-highlight'
                            }>
                            צור קשר
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
