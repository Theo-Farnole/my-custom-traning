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

    public static isNumeric(str: string) {
        return isNaN(Number(str)) == false;
    }

    public static isNumericInteger(str: string) {
        const number = Number(str);
        return isNaN(number) == false && this.isInt(number);
    }

    public static isInt(n: number) {
        return n % 1 === 0;
    }

    public static readonly ExceptionMMSS_NotRightLength = "The format must be 5 characters long. (ex: 20:30)";
    public static readonly ExceptionMMSS_MissingSeparator = "The format must contains : as a separator between MM:SS";

    public static readonly ExceptionMMSS_MinutesNotNumeric = "The provided minutes are not integer. (ex: ab:50)";
    public static readonly ExceptionMMSS_SecondsNotNumeric = "The provided seconds are not integer. (ex: 30:ab)";

    public static MMSSToSeconds(mmss: string) {
        if (mmss.length != 5) throw Utilities.ExceptionMMSS_NotRightLength;
        if (mmss[2] != ':') throw Utilities.ExceptionMMSS_MissingSeparator;

        var rawMinutes = mmss.substr(0, 2);
        var rawSeconds = mmss.substr(3, 2);

        if (this.isNumericInteger(rawMinutes) == false) throw Utilities.ExceptionMMSS_MinutesNotNumeric;
        if (this.isNumericInteger(rawSeconds) == false) throw Utilities.ExceptionMMSS_SecondsNotNumeric;

        return parseInt(rawMinutes) * 60 + parseInt(rawSeconds);
    }

    public static pad(n: number, size: number) {
        var s = String(n);
        while (s.length < (size || 2)) { s = "0" + s; }
        return s;
    }

    public static SecondsToMMSS(totalSeconds: number) {
        if (totalSeconds >= 3600) throw "Format doesn't support total seconds greater or equals to 3600."

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return this.pad(minutes, 2) + ":" + this.pad(seconds, 2);
    }
}
