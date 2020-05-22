import React from "react";
import "./list-directoy.styles.css";
import BackButton from "../BackButton";
import AddData from "../AddData";
import CustomList from "../CustomList";

function ListDirectory() {
    return (
        <div>
            <BackButton />
            <CustomList />
            <AddData />
        </div>
    );
}

export default ListDirectory;
