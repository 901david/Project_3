//Fib Recur fun
     
const memoize = (fn) => {
    const results = {};
    return function(...args) {
        if(results[args]) {
            return results[args];
        }
        const result = fn.call(this, ...args);
        cache[args] = result;
        return result;
    }
}

let fib = (n) => {
    if(n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n -2);
}

fib = memoize(fib);





