import React, {useState} from "react";
import CookieImage from "../../../assets/Cookie.png";
import "./cookieClicker.scss";

const CookieClicker = () => {
    let clicks = parseInt(localStorage.getItem('clicks')) || 0;
    const [click, setClick] = useState(clicks);

    function btnClick(newCount){
        setClick(newCount);
        localStorage.setItem('clicks', newCount);
    }

    return (
        <div className="section__wrapper clickerBlockWrapper">
            <button onClick={()=> btnClick(click + 1)}>
                <img className="cookie rotation" src={CookieImage} alt="Cookie =)=)"/>
            </button>
            <p className="clickerCount">{click}</p>
        </div>
    )
}

export default CookieClicker;
