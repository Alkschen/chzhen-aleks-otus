const fs = require('fs');
const { Readable, Transform, Writable } = require('stream');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) throw err;
    Readable.from(data)
        .pipe(splitWords())
        .pipe(filterNonTextChars())
        .pipe(createIndex())
        .pipe(writeToFile());
});

function splitWords() {
    let wordBuffer = '';
    return new Transform({
        transform(chunk, encoding, callback) {
            const words = (wordBuffer + chunk.toString()).split(/\s+/);
            wordBuffer = words.pop();
            for (const word of words) {
                this.push(word);
            }
            callback();
        },
        flush(callback) {
            if (wordBuffer) {
                this.push(wordBuffer);
            }
            callback();
        }
    });
}

function filterNonTextChars() {
    return new Transform({
        transform(chunk, encoding, callback) {
            const word = chunk.toString().replace(/[^a-zA-Z]/g, '');
            this.push(word);
            callback();
        }
    });
}

function createIndex() {
    const wordCounts = {};
    return new Transform({
        transform(chunk, encoding, callback) {
            const word = chunk.toString();
            wordCounts[word] = (wordCounts[word] || 0) + 1;
            callback();
        },
        flush(callback) {
            const sortedWords = Object.keys(wordCounts).sort();
            const index = sortedWords.map(word => wordCounts[word]);
            this.push(index.join(', '));
            callback();
        }
    });
}

function writeToFile() {
    return new Writable({
        write(chunk, encoding, callback) {
            fs.writeFile('output.txt', chunk, { flag: 'w' }, (err) => {
                if (err) throw err;
                console.log('Successful, look at the - output.txt');
                callback();
            });
        }
    });
}