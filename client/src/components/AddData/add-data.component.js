import React, { useState } from "react";

function AddData() {
    const [word, setWord] = useState("");

    // const dispatch = useDispatch();
    // const manipulateData = useSelector((store) => store.dataReducer);
    // const path = useSelector((store) => store.pathReducer);

    // const anotherData = [...manipulateData];

    const handleSubmit = () => {
        // if (word !== "") {
        //     dispatch(
        //         addItemData({
        //             data: anotherData,
        //             id: path[path.length - 1].id,
        //             word: word,
        //         })
        //     );
        //     setWord("");
        // }
    };

    const handleChange = (e) => {
        // setWord(e.target.value);
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
