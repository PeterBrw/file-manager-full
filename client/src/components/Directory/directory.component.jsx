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
        update(cache, { data: deleteFile }) {
            console.log(deleteFile.deleteFile.id);
            let files = cache.readQuery({
                query: FileQuery,
                variables: { id: lastId },
            });
            console.log(files);
            files = files.getChildren.filter(
                (file) => file.id !== deleteFile.deleteFile.id
            );

            cache.writeQuery({
                query: FileQuery,
                variables: { id: lastId },
                data: { getChildren: files },
            });
        },
    });
    const [changeNameFolder] = useMutation(ChangeNameMutation, {
        update(cache, { data }) {
            let files = cache.readQuery({
                query: FileQuery,
                variables: { id: lastId },
            });
            files.getChildren.map((item) => {
                if (item.id === data.changeName.id) {
                    item.name = data.changeName.name;
                }
            });
            cache.writeQuery({
                query: FileQuery,
                variables: { id: lastId },
                data: { getChildren: files.getChildren },
            });
        },
    });
    const [dragAndDrop] = useMutation(DragFileMutation, {
        refetchQueries: [{ query: FileQuery, variables: { id: lastId } }],
        // update(cache, { data }) {
        //     console.log(data);
        //     cache.writeQuery({
        //         query: FileQuery,
        //         variables: { id: lastId },
        //         data: { getChildren: data.dragFile },
        //     });
        // },
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
            variables: { id, idTo, lastId },
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
