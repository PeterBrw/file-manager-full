import React, { useState, useEffect } from "react";
import "./back-button.styles.css";

import { useSelector, useDispatch } from "react-redux";

import { onBackClick } from "../../Root";

const BackButton = () => {
    const dispatch = useDispatch();
    const path = useSelector((store) => store.pathReducer);

    return (
        <div className="back-button">
            {path.map((item) => {
                return (
                    <button key={item.id} onClick={() => dispatch(onBackClick(item.id))}>
                        <b>{item.name}</b>
                    </button>
                );
            })}
        </div>
    );
};

export default BackButton;
