function hasTwelveLetterKey(o: {[key: string]: any}) {
    for (const key in o) {
        if (key.length === 12) {
            return true;
        }
    }
    return false;
}

function hasTenLetterKey<T>(o: {[key: string]: T}) {
    for (const key in o) {
        if (key.length === 10) {
            return true;
        }
    }
    return false;
}

const n = {hi: 1, bye: 2}

hasTenLetterKey(n);

export {}