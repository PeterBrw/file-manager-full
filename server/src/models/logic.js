const returnChildren = (data, id) => {
    if (id === "root" || id === null) {
        return data;
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return data[i].children;
        }

        if (data[i].children.length > 0) {
            let found = returnChildren(data[i].children, id);
            if (found) {
                return found;
            }
        }
    }

    return null;
};

const returnName = (data, id) => {
    if (id === "root" || id === null) {
        return "root";
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return data[i].name;
        }

        if (data[i].children.length > 0) {
            let found = returnName(data[i].children, id);
            if (found) {
                return found;
            }
        }
    }

    return null;
};

const deleteItem = (data, id) => {
    return data.reduce((arr, item) => {
        if (item.id !== id) {
            if (item.children) item.children = deleteItem(item.children, id);
            arr.push(item);
        }
        return arr;
    }, []);
};

const changeName = (data, id, newName) => {
    if (id === "root" || id === null) {
        return "root";
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            data[i].name = newName;
            return data;
        }

        if (data[i].children.length > 0) {
            let found = changeName(data[i].children, id, newName);
            if (found) {
                return data;
            }
        }
    }

    return null;
};

const addItem = (data, id, word) => {
    const rand = Math.floor(Math.random() * (1000 - 100 + 1) + 100).toString();
    Math.floor(Math.random() * (1000 - 100 + 1) + 100);
    if (id === "root" || id === null) {
        data.push({
            id: `${rand}`,
            name: word,
            type: "folder",
            children: [],
        });
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].children.push({
                    id: `${rand}`,
                    name: word,
                    type: "folder",
                    children: [],
                });
            } else if (data[i].children.length > 0) {
                addItem(data[i].children, id, word);
            }
        }
    }

    return { data, rand };
};

const dragAndDrop = (data, idFrom, idTo) => {
    const returnItem = (data, idFrom) => {
        if (idFrom === "root" || idFrom === null) {
            return data;
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === idFrom) {
                return data[i];
            }

            if (data[i].children.length > 0) {
                let found = returnItem(data[i].children, idFrom);
                if (found) {
                    return found;
                }
            }
        }

        return null;
    };

    const itemToDrop = { ...returnItem(data, idFrom) };

    const deleteItem = (data, idFrom) => {
        return data.reduce((arr, item) => {
            if (item.id !== idFrom) {
                if (item.children)
                    item.children = deleteItem(item.children, idFrom);
                arr.push(item);
            }
            return arr;
        }, []);
    };

    const middleData = deleteItem(data, idFrom);

    const dropIt = (data, idTo) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === idTo) {
                data[i].children.push(itemToDrop);
            } else if (data[i].children.length > 0) {
                dropIt(data[i].children, idTo);
            }
        }
        return data;
    };

    return dropIt(middleData, idTo);
};

const returnItem = (data, id) => {
    if (id === "root" || id === null) {
        return data;
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return data[i];
        }

        if (data[i].children.length > 0) {
            let found = returnItem(data[i].children, id);
            if (found) {
                return found;
            }
        }
    }

    return null;
};

module.exports = {
    returnChildren,
    returnName,
    addItem,
    changeName,
    deleteItem,
    dragAndDrop,
    returnItem,
};
