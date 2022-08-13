import React from 'react';

type libaSelectProps = {
    selectName: string,
    value: any,
    categoriesList: any,
    changeFunction: (e: any) => void,
}

const libaSelect:React.FC<libaSelectProps> = ({ selectName, categoriesList, value, changeFunction }) => {
    return (
        <div className='addResource__content_wrapper'>
            <label className='editModal__content_label' style={{marginBottom: '8px'}}>{selectName}</label>
            <select className='editModal__content_input' style={{marginBottom: '24px', textTransform: 'uppercase'}} value={value} onChange={changeFunction}>
                {categoriesList.map((category: string, index: number) => <option key={`${category}_${index}`} style={{textTransform: 'uppercase'}}>{category}</option>)};
            </select>
        </div>
    )
}

export default libaSelect;