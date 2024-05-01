const path = require('path');
const fs = require('fs').promises;
// const { argv } = require('process')

async function dirsDict(dirPath, depth, currentDepth = 0) {
    if (currentDepth > depth) {
        return []
    };
    let dirEntries;
    try {
        dirEntries = await fs.readdir(dirPath, { withFileTypes: true });
    } catch (err) {
        console.log(`Ошибка чтения директорий: ${err}`);
        return []
    };
    let filesDict = {
        "name": dirPath,
        "items": []
    };
    for (let dirEntry of dirEntries) {
        let fileName = dirEntry.name;
        let filePath = path.join(dirPath, fileName);
        if (dirEntry.isDirectory()) {
            let subDir = {
                "name": fileName,
                "items": await dirsDict(filePath, depth, currentDepth + 1)
            };
            filesDict.items.push(subDir);
        } else {
            filesDict.items.push({ "name": fileName });
        }
    }
    if (currentDepth === 0) {
        let result = {
            "name": dirPath,
            "items": filesDict.items
        };
        return result
    } else {
        return filesDict.items;
    }
}

// Функция построения дерева
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

async function main(dirPath, depth) {
    let args = process.argv;
    depth = args.includes('-d') ? depth = args[args.indexOf('-d') + 1] : 0;
    dirPath = args.includes('-p') ? dirPath = args[args.indexOf('-p') + 1] : './';
    let result = await dirsDict(dirPath, depth);
    tree(result);
}

main()