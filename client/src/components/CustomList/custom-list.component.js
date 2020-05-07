import React, { useContext } from "react";
import "./custom-list.styles.css";

import { MyContext } from "../../react-context/display.context";

import Directory from "../Directory";

import { useQuery } from "@apollo/react-hooks";
import FileQuery from "../../data/queries/File";

const CustomList = () => {
    const { loading, error, data } = useQuery(FileQuery);
    const files = data ? data.getFiles : [];

    if (loading) return <h1>Loading</h1>;
    if (error) return <h1>Some error</h1>;
    console.log(files);

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
