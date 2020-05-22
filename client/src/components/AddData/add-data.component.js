import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { useSelector } from "react-redux";

import FileQuery from "../../data/queries/File";
import AddFileMutation from "../../data/mutations/AddFile";

function AddData() {
    const [word, setWord] = useState("");

    const path = useSelector((store) => store.pathReducer);
    const id = path[path.length - 1].id;

    const [addFolder] = useMutation(AddFileMutation, {
        refetchQueries: [{ query: FileQuery, variables: { id } }],
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
        <div>
            <label>
                Add Folder:
                <input type="text" onChange={handleChange} value={word} />
            </label>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default AddData;
