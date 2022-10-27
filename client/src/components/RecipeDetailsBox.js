const RecipeDetailsBox = (props) => {
    if (props.recipe.category === undefined) props.recipe.category = [];
    return (
        <div
            className='card'
            onClick={() => (window.location = `/recipe/${props.recipe.rid}`)}>
            <div
                className='card-img'
                style={{
                    backgroundImage: `url(${props.recipe.picture_url})`,
                }}>
                <div className='bookmark_views'>
                    <span>{props.recipe.views} צפיות</span>
                </div>
            </div>
            <div className='card-info'>
                <p className='text-title'>{props.recipe.title}</p>
                <div className='text-body'>
                    {props.recipe.summary.slice(0, 100)}
                    {props.recipe.summary.length > 100
                        ? '... \u2022 תיאור מלא במתכון'
                        : ''}
                    <p>
                        <span className='span-title'>זמן הכנה:</span>
                        &nbsp;
                        {props.recipe.duration} דקות
                    </p>
                    <p>
                        <span className='span-title'>רמת קושי:</span>
                        &nbsp;
                        {props.recipe.difficulty}
                    </p>
                    {props.showCategories ? (
                        <p>
                            <span className='span-title'>קטגוריה:</span>
                            &nbsp;
                            {props.recipe.category.map((cat, index) => {
                                return (
                                    <span key={index}>
                                        <a
                                            href={`/categories/${encodeURIComponent(
                                                cat.name
                                            )}`}>
                                            {cat.name}
                                        </a>
                                        {index <
                                        props.recipe.category.length - 1
                                            ? ', '
                                            : ''}
                                    </span>
                                );
                            })}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className='card-footer'>
                <div className='card-button'>
                    <a
                        href={`whatsapp://send?text=${props.recipe.title}: ${window.location.host}/recipe/${props.recipe.rid}`}
                        data-action='share/whatsapp/share'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            aria-label='WhatsApp'
                            role='img'
                            viewBox='0 0 512 512'>
                            <rect
                                width='512'
                                height='512'
                                rx='15%'
                                fill='#25d366'
                            />
                            <path
                                fill='#25d366'
                                stroke='#fff'
                                strokeWidth='26'
                                d='M123 393l14-65a138 138 0 1150 47z'
                            />
                            <path
                                fill='#fff'
                                d='M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18'
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsBox;
