export class AudioPlayer {
    static timerEnded: HTMLAudioElement = new Audio("../assets/timer_ended.mp3");
    static timerDecount: HTMLAudioElement = new Audio("../assets/timer_decount.mp3");

    public static Initialize() {
        return;
    }

    public static PlayTimerEnded() {
        console.log("[Sound] timer ended play");
        this.timerEnded.play();
    }

    public static PlayTimerDecount() {
        console.log("[Sound] timer decount play");
        this.timerDecount.pause();
        this.timerDecount.play();
    }
}