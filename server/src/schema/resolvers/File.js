const fs = require("fs");
const path = require("path");
const {
    returnChildren,
    changeName,
    deleteItem,
    addItem,
    dragAndDrop,
    returnItem,
} = require("../../models/logic");

export const resolvers = {
    Query: {
        getChildren: (_, { id }) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            return returnChildren(data, id);
        },
    },
    Mutation: {
        changeName: (_, { id, newName }) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            const changeData = changeName(data, id, newName);
            fs.writeFileSync(
                path.join(__dirname, "../", "../", "models", "data.json"),
                JSON.stringify(changeData)
            );
            return returnItem(changeData, id);
        },
        deleteFile: (_, { id }) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            const deleteEl = returnItem(data, id);
            const deleteData = deleteItem(data, id);
            fs.writeFileSync(
                path.join(__dirname, "../", "../", "models", "data.json"),
                JSON.stringify(deleteData)
            );
            return deleteEl;
        },
        addFile: (_, { id, name }) => {
            const oldData = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );

            const { data, rand } = addItem(oldData, id, name);
            fs.writeFileSync(
                path.join(__dirname, "../", "../", "models", "data.json"),
                JSON.stringify(data)
            );
            const data1 = [...data];
            return returnItem(data1, rand);
        },
        dragFile: (_, { id, idTo, lastId }) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            const dragData = dragAndDrop(data, id, idTo);
            fs.writeFileSync(
                path.join(__dirname, "../", "../", "models", "data.json"),
                JSON.stringify(dragData)
            );
            return returnChildren(dragData, lastId);
        },
    },
};
