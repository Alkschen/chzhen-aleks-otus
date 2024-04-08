function tree(obj, prefix = '', last = true, root = true) {
    if (root) {
        console.log(obj.name);
    } else {
        console.log(prefix + (last ? '└── ' : '├── ') + obj.name);
        prefix += last ? '    ' : '│   ';
    }
    if (obj.items) {
        const length = obj.items.length;
        obj.items.forEach((item, index) => {
            const last = index === length - 1;
            tree(item, prefix, last, false);
        });
    }
}

const treeObject = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{ "name": 3 }, { "name": 4 }]
    }, {
        "name": 5,
        "items": [{ "name": 6, "items": [{ "name": 7 }]}]
    }]
};

tree(treeObject);