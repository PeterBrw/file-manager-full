import React from "react";
import "./back-button.styles.css";

import { useSelector, useDispatch } from "react-redux";

const BackButton = () => {
    const dispatch = useDispatch();
    const path = useSelector((store) => store.pathReducer);
    return (
        <div className="back-button">
            {path.map((item) => {
                return (
                    <button
                        key={Math.floor(
                            Math.random() * (10000 - 1000 + 1) + 1000
                        )}
                        onClick={() => console.log(path)}
                    >
                        <b>something</b>
                    </button>
                );
            })}
        </div>
    );
};

export default BackButton;
