type AbsolutePath = string & {_brand: 'abs'};
function listAbsolutePath(path: AbsolutePath) {
    return path;
}
function isAbsolutePath(path: string): path is AbsolutePath {
    return path.startsWith('/');
}

const notAbsPath = 'files/system'

if (isAbsolutePath(notAbsPath)) {
    listAbsolutePath(notAbsPath)
}

type SortedList<T> = T[] & {_brand: 'sorted'};

function isSorted<T>(xs: T[]): xs is SortedList<T> {
    for (let i = 1; i < xs.length; i++) {
        if (xs[i] < xs[i - 1]) {
            return false;
        }
    }
    return true;
}

function binarySearch<T>(xs: SortedList<T>, x: T) {
    // ...
    return x;
}


export {};