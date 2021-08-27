export class Utilities {
    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid    
    public static generateUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static truncateString(str: string, num: number) {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str.length <= num) {
            return str
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, num) + '...'
    }

    public static isBlank(str: string) {
        return (!str || /^\s*$/.test(str));
    }
}
