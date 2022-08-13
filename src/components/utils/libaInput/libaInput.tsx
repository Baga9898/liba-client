import React from "react";

type libaInputProps = {
    inputName: string,
    resourceError: string,
    value: any,
    changeFunction: (e: any) => void;
}

const LibaInput:React.FC<libaInputProps> = ({ inputName, resourceError, value, changeFunction}) => {
    return (
        <div className='addResource__content_wrapper'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <label className='editModal__content_label'>{inputName}</label>
                {resourceError && <span className='resourceLinkError'>{resourceError}</span>}
            </div>
            <input className='editModal__content_input' name={inputName} type='text' value={value} onChange={changeFunction}/>
        </div>
    )
}

export default LibaInput;