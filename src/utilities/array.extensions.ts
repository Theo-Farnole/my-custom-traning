// source: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another?rq=1
Array.prototype.move = function (from: number, to: number) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
};

// source: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
Array.prototype.remove = function (element: any) {
    const index = this.indexOf(element);
    if (index != -1) {
        this.splice(index, 1);
    }

    return this;
}

export { }