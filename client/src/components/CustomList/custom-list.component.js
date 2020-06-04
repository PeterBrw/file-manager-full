import React, { useContext, useEffect } from "react";
import "./custom-list.styles.css";

import { MyContext } from "../../react-context/display.context";

import Directory from "../Directory";

import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@apollo/react-hooks";
import FileQuery from "../../data/queries/File";

const CustomList = () => {
    const path = useSelector((store) => store.pathReducer);
    const id = path[path.length - 1].id;

    const { loading, error, data } = useQuery(FileQuery, {
        variables: { id },
    });

    const row = useContext(MyContext);
    let classNameList = row ? "list-directory-row" : "list-directory-column";

    let files = data ? data.getChildren : [];
    if (loading) return <h1>Loading</h1>;
    if (error) {
        console.log(error);
        return <h1>Something went wrong!</h1>;
    }

    if (files.length > 0) {
        return (
            <div className="main">
                <div className={classNameList}>
                    {files.map((item) => {
                        return <Directory key={item.id} {...item} />;
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div className="main">
                <div className={classNameList}>
                    <h2 className="empty">No folders or files</h2>
                </div>
            </div>
        );
    }
};

export default CustomList;
