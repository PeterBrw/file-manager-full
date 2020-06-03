import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import "./add-data.styles.css";

import { useSelector } from "react-redux";

import FileQuery from "../../data/queries/File";
import AddFileMutation from "../../data/mutations/AddFile";

function AddData() {
    const [word, setWord] = useState("");

    const path = useSelector((store) => store.pathReducer);
    const id = path[path.length - 1].id;

    const [addFolder] = useMutation(AddFileMutation, {
        refetchQueries: [{ query: FileQuery, variables: { id } }],
        // update(cache, { data: { addFile } }) {
        //     console.log(addFile);
        //     let files = cache.readQuery({
        //         query: FileQuery,
        //         variables: { id },
        //     });
        //     console.log(files);
        //     if (files.getChildren === null) {
        //         files.getChildren = [];
        //     }
        //     if (addFile === null) {
        //         refetchQueries: [{ query: FileQuery, variables: { id } }];
        //     } else {
        //         cache.writeQuery({
        //             query: FileQuery,
        //             variables: { id },
        //             data: { getChildren: files.getChildren.concat([addFile]) },
        //         });
        //     }
        // },
    });

    const handleSubmit = () => {
        if (word !== "") {
            const name = word;
            addFolder({
                variables: { id, name },
            });
            setWord("");
        }
    };

    const handleChange = (e) => {
        setWord(e.target.value);
    };

    return (
        <div className="add-data">
            <label>
                <input
                    type="text"
                    onChange={handleChange}
                    value={word}
                    placeholder="Add Folder..."
                />
            </label>
            <button onClick={handleSubmit}>Add!</button>
        </div>
    );
}

export default AddData;
