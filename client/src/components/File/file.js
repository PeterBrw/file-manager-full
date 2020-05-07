import React from "react";
import { useQuery } from "@apollo/react-hooks";
import FileQuery from "../../data/queries/File";

const File = () => {
    const { loading, error, data } = useQuery(FileQuery);
    const files = data ? data.getFiles : [];

    if (loading) return <h1>Loading</h1>;
    if (error) return <h1>Some error</h1>;
    console.log(files);
    return (
        <div>
            {files.map((item) => {
                return <h1 key={item.id}>{item.name}</h1>;   
            })}
        </div>
    );
};

export default File;
