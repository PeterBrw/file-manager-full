import React, { useContext } from "react";
import "./custom-list.styles.css";

import { MyContext } from "../../react-context/display.context";

import Directory from "../Directory";

import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@apollo/react-hooks";
import FileQuery from "../../data/queries/File";

const CustomList = () => {
    const path = useSelector((store) => store.pathReducer);
    const id = path[path.length - 1].id;

    console.log(id);

    const { loading, error, data } = useQuery(FileQuery, { variables: { id } });

    const files = data ? data.getChildren : [];
    console.log(files);
    if (loading) return <h1>Loading</h1>;
    if (error) console.log(error);
    // return <h1>Some error </h1>;

    const row = useContext(MyContext);
    let classNameList = row ? "list-directory-row" : "list-directory-column";

    return (
        <div className={classNameList}>
            {files.map((item) => {
                return <Directory key={item.id} {...item} />;
            })}
        </div>
    );
};

export default CustomList;
