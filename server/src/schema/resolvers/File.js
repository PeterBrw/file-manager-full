const fs = require("fs");
const path = require("path");
const {
    returnChildren,
    returnName,
    changeName,
    deleteItem,
    addItem,
    dragAndDrop,
} = require("../../models/logic");

export const resolvers = {
    Query: {
        getFiles: (_, args, context) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            return data;
        },
        getChildren: (_, { id }) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            return returnChildren(data, id);
        },
        getName: (_, { id }) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            return returnName(data, id);
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
            return changeData;
        },
        deleteFile: (_, { id }) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            const deleteData = deleteItem(data, id);
            fs.writeFileSync(
                path.join(__dirname, "../", "../", "models", "data.json"),
                JSON.stringify(deleteData)
            );
            return deleteData;
        },
        addFile: (_, { id, name }) => {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, "../", "../", "models", "data.json")
                )
            );
            const addedItem = addItem(data, id, name);
            fs.writeFileSync(
                path.join(__dirname, "../", "../", "models", "data.json"),
                JSON.stringify(addedItem)
            );
            return addedItem;
        },
        dragFile: (_, { id, idTo }) => {
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
            return dragData;
        },
    },
};
