import React from "react";
import "./list-directoy.styles.css";
import BackButton from "../BackButton";
import AddData from "../AddData";
import CustomList from "../CustomList";

import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import NameQuery from "../../data/queries/Name";


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
