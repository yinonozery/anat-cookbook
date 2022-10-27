import { useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const SelectCategories = (props) => {
    const [cats, setCats] = [props.cat, props.setCat];

    const catsOptions = [];
    cats.map((cat) => {
        return catsOptions.push({ label: `${cat.name}`, value: `${cat._id}` });
    });

    const customValueRenderer = (selected, _options) => {
        return selected.length ? '' : 'כל המתכונים';
    };

    useEffect(() => {
        const fetchCategories = () => {
            const opts = {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
            };

            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/categories/`, opts)
                .then((res) => res.text())
                .catch((e) => console.log(e))
                .then((cats) => {
                    setCats(JSON.parse(cats));
                });
        };

        fetchCategories();
    }, [setCats]);

    return (
        <MultiSelect
            options={catsOptions}
            value={props.selected}
            onChange={props.setSelected}
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
    );
};

export default SelectCategories;
