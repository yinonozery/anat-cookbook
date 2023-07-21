import '../css/LikeButton.css';
import { useState } from 'react';

const LikeButton = (props) => {
    const [like, setLike] = useState(props.clicked);
    return (
        <>
            שמירה במועדפים
            <div
                onClick={() => setLike(!like)}
                className={
                    like ? 'heart is_animating heart_clicked' : 'heart'
                }
                key={props.clicked}
                ></div>
        </>
    );
};

export default LikeButton;
