interface Array<T> {
    move(from: number, to: number): Array<T>;
}

// source: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another?rq=1
Array.prototype.move = function (from: number, to: number) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
};

export { }