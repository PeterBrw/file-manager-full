import React, { useState } from "react";
import "./directory.styles.css";
import Icon from "../Icon";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import { onClick, addIdFrom } from "../../Root";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";

import FileQuery from "../../data/queries/File";
import DeleteFileMutation from "../../data/mutations/DeleteFile";
import ChangeNameMutation from "../../data/mutations/ChangeName";
import DragFileMutation from "../../data/mutations/DragFile";

const Directory = ({ id, name, type }) => {
    const dispatch = useDispatch();
    const path = useSelector((store) => store.pathReducer);
    const lastId = path[path.length - 1].id;

    const idFrom = useSelector((store) => store.idFromReducer);

    const [modal, setModal] = useState({ open: false });
    const [inputValue, setInputValue] = useState(name);

    const [deleteFolder] = useMutation(DeleteFileMutation, {
        refetchQueries: [{ query: FileQuery, variables: { id: lastId } }],
    });
    const [changeNameFolder] = useMutation(ChangeNameMutation, {
        refetchQueries: [{ query: FileQuery, variables: { id: lastId } }],
    });
    const [dragAndDrop] = useMutation(DragFileMutation, {
        refetchQueries: [{ query: FileQuery, variables: { id: lastId } }],
    });

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
        const newName = inputValue;
        changeNameFolder({
            variables: { id, newName },
        });
    };

    const dragStart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        console.log(e.target.id);
        dispatch(addIdFrom(e.target.id));
    };

    const allowDrop = (e) => {
        e.preventDefault();
        console.log(e.target.id);
    };

    const dragDrop = (e) => {
        e.preventDefault();
        console.log("finish", e.target.id, idFrom[idFrom.length - 1]);

        if (idFrom[idFrom.length - 1] === e.target.id || e.target.id === "") {
            console.log("exception");
            return;
        }

        const id = idFrom[idFrom.length - 1];
        const idTo = e.target.id;

        dragAndDrop({
            variables: { id, idTo },
        });
    };

    return (
        <div
            className="directory"
            onDrop={dragDrop}
            onDragOver={allowDrop}
            id={id}
        >
            <div className="left" onClick={() => dispatch(onClick(id, name))}>
                <Icon className="icon" type={type} />
                <h1
                    className="header"
                    draggable="true"
                    onDragStart={dragStart}
                    id={id}
                >
                    {name}
                </h1>
            </div>
            <FontAwesomeIcon
                className="delete-button"
                icon={faTrash}
                onClick={() => {
                    console.log(id);
                    deleteFolder({
                        variables: { id },
                    });
                }}
            />
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
