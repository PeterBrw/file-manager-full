import React, { useState } from "react";
import "./directory.styles.css";
import Icon from "../Icon";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
// import { returnName } from "../../return-children";

import { onClick } from "../../Root";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";

const Directory = ({ id, name, type }) => {
    const dispatch = useDispatch();
    const path = useSelector((store) => store.pathReducer);

    const [modal, setModal] = useState({ open: false });
    const [inputValue, setInputValue] = useState("");

    const onOpenModal = () => {
        setModal({ open: true });
    };

    const onCloseModal = () => {
        console.log("exit");
        setModal({ open: false });
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const onButtonClick = () => {
        console.log(inputValue);
    };

    console.log(path);

    return (
        <div className="directory" id={id}>
            <div className="left" onClick={() => dispatch(onClick(id))}>
                <Icon className="icon" type={type} />
                <h1>{name}</h1>
            </div>
            <FontAwesomeIcon className="delete-button" icon={faTrash} />
            <FontAwesomeIcon icon={faEdit} onClick={onOpenModal} />
            <Modal open={modal.open} onClose={onCloseModal} little>
                <p>Edit file name</p>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button
                    onClick={() => {
                        onButtonClick();
                        onCloseModal();
                    }}
                >
                    Change
                </button>
            </Modal>
        </div>
    );
};

export default Directory;
