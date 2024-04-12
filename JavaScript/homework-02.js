function deepEqual(object1, object2, errorKey = '') {
    if (object1 === object2) {
        console.log(`OK`)
        return true
    } 
    if (object1 == null || typeof(object1) != "object" || 
        object2 == null || typeof(object2) != "object") {
        console.log(`Error: ${errorKey}`)
        return false;
    };
    let objKeys1 = Object.keys(object1);
    let objKeys2 = Object.keys(object2);
    if (objKeys1.length !== objKeys2.length) {
        console.log(`Error: ${errorKey}`)
        return false
    } ;
    for (let key of objKeys1) {
        let value1 = object1[key];
        let value2 = object2[key];
        if (errorKey) {
            errorKey = `${errorKey}.${key}`
        } else {
            errorKey = key
        }
        if (!objKeys2.includes(key) || !deepEqual(value1, value2, errorKey)) {
            return false;
        }
    }
    return true;
};
  
const obj1 = {
    a: {b: 1,},
};
const obj2 = {
    a: {b: 2,},
};
const obj3 = {
    a: {b: 1,},
};
deepEqual(obj1, obj1);
deepEqual(obj1, obj2);
deepEqual(obj1, obj3);


// Переписать, используя async / await
function getResponseSize(url) {
    return fetch(url).then(response => {
        const reader = response.body.getReader()
        let total = 0

        return reader.read().then(function processResult(result) {
            if (result.done) return total
            const value = result.value
            total += value.length
            console.log('Received chunk', value)
            return reader.read().then(processResult)
        })
    })
}

async function getResponseSize(url) {
    const response = await fetch(url);
    const reader = response.body.getReader();
    let total = 0;
    while (true) {
        const result = await reader.read();
        if (result.done) return total;
        const value = result.value;
        total += value.length;
        console.log('Received chunk', value);
    }
}
