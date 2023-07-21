import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

const SuccessMsg = () => {
    const { name } = useParams();

    const countDown = (i) => {
        const int = setInterval(function () {
            document.getElementById('timer').innerHTML = i;
            if (i === 0) {
                clearInterval(int);
                window.location.replace('/list');
            } else i--;
        }, 1000);
    };
    countDown(3);

    return (
        <div className='recipe_details_content'>
            <h1>המתכון '{name}' נוסף בהצלחה</h1>
            <br />
            <h1>הינך מועבר לרשימת המתכונים...</h1>
            <h2 id='timer' className='text-center'>
                {' '}
            </h2>
            <Spinner />
        </div>
    );
};

export default SuccessMsg;
