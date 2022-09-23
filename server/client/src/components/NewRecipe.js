import React, { useState, useRef, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import defaultPicture from '../assets/no-image-available.png';
import '../css/NewRecipe.css';

const NewRecipe = () => {
    const [ingredientsList, setIngredientsList] = useState([]);
    const [methodsList, setMethods] = useState([]);
    const [cats, setCats] = useState([]);
    const [selected, setSelected] = useState([]);

    const ingQuantity = useRef(0);
    const ingUnit = useRef('0');
    const ingName = useRef('');
    const methodsCount = useRef(1);

    const formDataInitial = {
        title: '',
        summary: '',
        picture_url: defaultPicture,
        serving: 0,
        calories: 0,
        duration: 0,
        difficulty: '',
        category: [],
        ingredients: [],
        instructions: [],
        author: '',
        views: 0,
    };

    const [formData, setFormData] = useState(formDataInitial);

    useEffect(() => {
        const opts = {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        };

        fetch('http://localhost:3001/categories/', opts)
            .then((res) => res.text())
            .catch((e) => alert(e))
            .then((cats) => {
                setCats(JSON.parse(cats));
            });
    }, []);

    const catsOptions = [];
    cats.map((cat) => {
        return catsOptions.push({ label: `${cat.name}`, value: `${cat._id}` });
    });

    const changeHandler = (e) => {
        if (e.target.id === 'serving') {
            setFormData({
                ...formData,
                [e.target.id]: parseInt(e.target.value),
            });
            return;
        }

        setFormData({ ...formData, [e.target.id]: e.target.value });
        console.log(selected);
    };

    const addRecipe = async () => {
        if (methodsList.length === 0 || ingredientsList.length === 0) {
            alert('רשימת מצרכים או הוראות הכנה לא מולאו');
            return;
        }

        formData.instructions = methodsList;
        formData.ingredients = ingredientsList;
        formData.category = selected.map((a) => a.value);

        const opts = {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(formData),
        };

        await fetch('http://localhost:3001/recipe/', opts)
            .then((res) => res.text())
            .catch((e) => alert(e))
            .then(() => {
                window.location.replace(`/success/${formData.title}`);
            });
    };

    const formHandler = (e) => {
        e.preventDefault();
        addRecipe();
    };

    useEffect(() => {
        ingQuantity.current.value = '';
        ingUnit.current.value = '';
        ingName.current.value = '';
        setFormData({ ...formData, ingredients: ingredientsList });
    }, [ingredientsList]);

    const addIngredient = () => {
        if (
            ingName.current.value.length < 1 ||
            ingQuantity.current.value === ''
        )
            return;
        if (ingQuantity.current.value === '0')
            return alert('חובה לבחור כמות עבור', ingName.current.value);

        let found = false;
        setIngredientsList(
            ingredientsList.filter((ing) => {
                if (ing.name === ingName.current.value) {
                    found = true;
                    ing.qty = ingQuantity.current.value;
                    ing.unit = ingUnit.current.value;
                }
                return true;
            })
        );
        if (!found) {
            setIngredientsList((oldArray) => [
                ...oldArray,
                {
                    name: ingName.current.value,
                    qty: ingQuantity.current.value,
                    unit: ingUnit.current.value,
                },
            ]);
        } else {
            alert('פריט קיים, מעדכן כמות');
        }
    };

    const removeIngredient = (indexToRemove) => {
        setIngredientsList(
            ingredientsList.filter((ing, index) => {
                if (index === indexToRemove) return false;
                else return true;
            })
        );
    };

    const removeMethod = (indexToRemove) => {
        setMethods(
            methodsList.filter((_, index) => {
                if (index === indexToRemove) return false;
                else return true;
            })
        );
        methodsCount.current = methodsCount.current - 1;
    };

    const addStep = () => {
        const lastMethod = document.getElementById(`addMethod`);
        const lastMethodText = lastMethod.value;
        if (lastMethodText.length < 2) return;
        setMethods((methods) => [...methods, lastMethodText]);

        methodsCount.current = methodsCount.current + 1;
        document.getElementById(`addMethod`).value = '';
    };

    const customValueRenderer = (selected, _options) => {
        return selected.length ? '' : 'בחר/י קטגוריות';
    };

    return (
        <div className='newRecipe'>
            <form onSubmit={(e) => formHandler(e)}>
                <h1>הוספת מתכון חדש</h1>

                {/* Title */}
                <div className='field'>
                    <label htmlFor='title' className='ha-screen-reader'>
                        כותרת
                    </label>
                    <input
                        id='title'
                        className='field__input'
                        placeholder=' '
                        onChange={changeHandler}
                    />
                    <span className='field__label-wrap' aria-hidden='true'>
                        <span className='field__label'>כותרת</span>
                    </span>
                </div>

                {/* Summary */}
                <div className='field'>
                    <label htmlFor='summary' className='ha-screen-reader'>
                        תקציר
                    </label>
                    <input
                        id='summary'
                        className='field__input'
                        placeholder=' '
                        onChange={changeHandler}
                    />
                    <span className='field__label-wrap' aria-hidden='true'>
                        <span className='field__label'>תקציר</span>
                    </span>
                </div>

                {/* Picture URL */}
                <div className='field'>
                    <label htmlFor='picture_url' className='ha-screen-reader'>
                        כתובת תמונה
                    </label>
                    <input
                        id='picture_url'
                        className='field__input'
                        placeholder=' '
                        type='url'
                        onChange={changeHandler}
                    />
                    <span className='field__label-wrap' aria-hidden='true'>
                        <span className='field__label'>כתובת תמונה (URL)</span>
                    </span>
                </div>

                {/* Serves */}
                <div className='field'>
                    <label htmlFor='serving' className='ha-screen-reader'>
                        כמות סועדים
                    </label>
                    <input
                        id='serving'
                        className='field__input'
                        placeholder=' '
                        type='number'
                        onChange={changeHandler}
                        min='1'
                    />
                    <span className='field__label-wrap' aria-hidden='true'>
                        <span className='field__label'>כמות סועדים</span>
                    </span>
                </div>

                {/* Duration */}
                <div className='field'>
                    <label htmlFor='duration' className='ha-screen-reader'>
                        זמן הכנה
                    </label>
                    <input
                        id='duration'
                        className='field__input'
                        placeholder='בדקות'
                        type='number'
                        onChange={changeHandler}
                    />
                    <span className='field__label-wrap' aria-hidden='true'>
                        <span className='field__label'>זמן הכנה</span>
                    </span>
                </div>

                {/* Difficulty */}
                <div className='field'>
                    <select
                        id='difficulty'
                        className='field__input'
                        placeholder=''
                        onChange={changeHandler}
                        defaultValue={'0'}>
                        <option value='0' disabled>
                            בחר
                        </option>
                        <option value='קלה'>קלה</option>
                        <option value='בינונית'>בינונית</option>
                        <option value='קשה'>קשה</option>
                    </select>
                    <span className='field__label-wrap' aria-hidden='true'>
                        <span className='field__label'>רמת קושי</span>
                    </span>
                </div>

                {/* Category */}
                <div className='MultiSelect'>
                    <MultiSelect
                        options={catsOptions}
                        value={selected}
                        onChange={setSelected}
                        labelledBy='Select'
                        valueRenderer={customValueRenderer}
                        hasSelectAll={false}
                        selectionType='tags'
                        disableSearch={true}
                        overrideStrings={{
                            allItemsAreSelected: 'כל הקטגוריות נבחרו.',
                            clearSelected: 'מחיקת מסומנים',
                            noOptions: 'אין קטגוריות',
                            selectAll: 'בחר/י הכל',
                            selectSomeItems: 'בחר/י קטגוריות',
                        }}
                        className='dark'
                    />
                </div>

                <div className='field__categories'>
                    {/* <select
                        id='category'
                        className='field__input'
                        placeholder=''
                        onChange={changeHandler}> */}
                    {/* {cats.map((cat, index) => {
                        const catObj = {
                            name: cat.name,
                            id: cat._id,
                        };

                        return (
                            <p key={index}>
                                <label key={index} htmlFor={cat._id}>
                                    {cat.name}
                                </label>
                                <input
                                    type='checkbox'
                                    value={JSON.stringify(catObj)}
                                    key={cat.name}
                                    id={cat._id}
                                    onChange={changeHandler}
                                />
                            </p>
                        );
                    })} */}
                </div>

                {/* Ingredients */}
                <h3>רשימת מצרכים</h3>
                {ingredientsList.map((ing, index) => {
                    return (
                        <div className='ingredients_list' key={index}>
                            <div className='ingredient_details'>
                                <span className='methodNumber'>
                                    {index + 1}
                                </span>{' '}
                                {ing.name}, כמות: {ing.qty} ({ing.unit})
                            </div>
                            <div className='ingredient_cancel'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='#bc001b'
                                    className='bi bi-x-circle-fill'
                                    onClick={() => removeIngredient(index)}
                                    viewBox='0 0 16 16'>
                                    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
                                </svg>
                            </div>
                        </div>
                    );
                })}
                <div className='field' id='ingredient_list'>
                    <div className='flex_ingredients'>
                        {/* Quantity */}
                        <div className='ingredient_qty'>
                            <label htmlFor='qty' className='ha-screen-reader'>
                                זמן הכנה
                            </label>
                            <input
                                id='qty'
                                className='field__input'
                                placeholder=' '
                                type='number'
                                ref={ingQuantity}
                                min='1'
                                onChange={changeHandler}
                            />
                            <span
                                className='field__label-wrap'
                                aria-hidden='true'>
                                <span className='field__label'>כמות</span>
                            </span>
                        </div>

                        {/* Unit */}
                        <div className='ingredient_unit'>
                            <select
                                id='ingredient_unit'
                                className='field__input'
                                ref={ingUnit}
                                defaultValue={'0'}>
                                <option value='0' disabled>
                                    יחידת מידה
                                </option>
                                <option value='גרם'>גרם</option>
                                <option value='כפיות'>כפיות</option>
                                <option value='עוד'>עוד</option>
                            </select>
                        </div>

                        {/* Ingredient */}
                        <div className='ingredient'>
                            <input
                                id='ingredient'
                                className='field__input_ing'
                                placeholder='מרכיב'
                                type='text'
                                ref={ingName}
                            />
                        </div>
                    </div>
                </div>
                {/* Add Ingredient */}
                <button
                    className='icon-add-ing-btn add-ing-btn'
                    type='button'
                    onClick={() => {
                        addIngredient();
                    }}>
                    <div className='add-ing-icon'></div>
                    <div className='btn-txt'>הוספת מרכיב</div>
                </button>

                {/* Instructions */}
                <h3>הוראות הכנה</h3>
                {methodsList.map((method, index) => {
                    index = index + 1;
                    return (
                        <div
                            className='field'
                            id={`method${index}`}
                            key={method}>
                            <span
                                className='methodNumber'
                                onClick={() => removeMethod(index - 1)}>
                                {index}
                            </span>
                            <textarea
                                id={`method${index}`}
                                className='field__input field_textarea'
                                placeholder={`תיאור שלב ${index}`}
                                defaultValue={method}
                                onChange={(e) =>
                                    (methodsList[index - 1] = e.target.value)
                                }
                            />
                        </div>
                    );
                })}

                <div className='field'>
                    <span className='methodNumber red'>+</span>
                    <textarea
                        id={`addMethod`}
                        className='field__input field_textarea'
                        placeholder={`תיאור שלב ${methodsCount.current}`}
                    />
                </div>

                {/* Add Step */}
                <button
                    className='icon-add-ing-btn add-ing-btn'
                    type='button'
                    onClick={() => {
                        addStep();
                    }}>
                    <div className='add-ing-icon'></div>
                    <div className='btn-txt'>הוספת שלב</div>
                </button>

                <button type='submit' className='button_add_recipe'>
                    הוסף
                </button>
            </form>
            
        </div>
    );
};

export default NewRecipe;
