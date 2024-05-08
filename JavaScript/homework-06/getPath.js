function getPath(element) {
    const path = [];
    let el = element;
    while (el.nodeType === el.ELEMENT_NODE) {
        let selector = el.nodeName.toLowerCase();
        // console.log(el)
        if (el.id) {
            selector += `#${el.id}`;
            path.unshift(selector);
            break;
        } else {
            let sibling = el;
            let n = 1;
            while ((sibling = sibling.previousElementSibling) !== null) {
                if (sibling.nodeName === selector) n++;
            }
            if (n !== 1) selector += `:nth-of-type(${nth})`;
        }
        path.unshift(selector);
        el = el.parentNode;
    }
    return path.join(' ');
}

module.exports = {
    getPath: getPath
}