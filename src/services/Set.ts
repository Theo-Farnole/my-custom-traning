
export class Set {
    repetitionsPerSet: string;
    setCount: number;
    exercise: string;
    uid: string;

    constructor(exercise: string, repetitionsPerSet: string, setCount: number) {
        this.repetitionsPerSet = repetitionsPerSet;
        this.setCount = setCount;
        this.exercise = exercise;

        this.uid = Set.generatorUID();
    }

    public static get Empty(): Set {
        return new Set("", "", 1);
    }

    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
    // move to utilities
    private static generatorUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
