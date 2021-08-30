interface Array<T> {
    move(from: number, to: number): Array<T>;
    remove<T>(element: T): Array<T>
}