import Header from './components/Header';
import Routing from './components/routing/Route';
import Footer from './components/Footer.js';
import GetAuth from './components/auth/GetAuth';
import './css/App.css';

const App = () => {
    return (
        <>
            <GetAuth />
            <div className='wrapper'>
                <Header />
                <main>
                    <Routing />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default App;
