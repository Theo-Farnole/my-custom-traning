import { timelineEnd } from "console";
import { extensionPuzzleSharp, flaskOutline } from "ionicons/icons";
import React from "react";
import { useState } from "react";
import { AudioPlayer } from "../../services/AudioPlayer";
import "./Timer.css"

// source: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/

interface TimerProps {
    duration: number,
    isPaused: boolean,
    onTimerOver: () => void;
};

const FULL_DASH_ARRAY = 283;
const VISUAL_INTERVAL_MS = 125; // baisser cette valeur fluidise la reprise de la pause

class Timer extends React.Component<TimerProps> {

    state = {
        timeLeft: 0,
        dash: ""
    };

    timePassed: number;
    duration: number;
    timerIntervalID: number;

    constructor(props: TimerProps) {
        super(props);

        this.timePassed = 0;
        this.duration = props.duration;
        this.timerIntervalID = -1;

        this.state =
        {
            timeLeft: props.duration,
            dash: "0 " + FULL_DASH_ARRAY.toString()
        }
    }

    componentDidMount() {
        this.updateVisual();

        this.timerIntervalID = window.setInterval(() => this.updateInterval(), VISUAL_INTERVAL_MS);
        this.updateInterval();

        if (this.duration <= 0) {
            this.props.onTimerOver();
            clearInterval(this.timerIntervalID);
        }
    }

    componentWillUnmount() {
        if (this.timerIntervalID != -1) {
            clearInterval(this.timerIntervalID);
            this.timerIntervalID = -1;
        }
    }

    updateInterval() {
        if (this.props.isPaused == true) return;

        this.timePassed += VISUAL_INTERVAL_MS / 1000;
        this.updateVisual();


        console.log(this.state.timeLeft);

        if (this.state.timeLeft == 1 || this.state.timeLeft == 2 || this.state.timeLeft == 3) {
            AudioPlayer.PlayTimerDecount();
        }

        if (this.state.timeLeft == 0) {
            AudioPlayer.PlayTimerEnded();
        }

        // let the label go to zero by waiting a tick before disappear
        if (this.state.timeLeft <= -VISUAL_INTERVAL_MS / 1000) {
            this.props.onTimerOver();
            clearInterval(this.timerIntervalID);
        }
    }

    updateVisual() {
        // batching can leads to problem: dash use TimeLeft
        this.setState(
            {
                timeLeft: this.duration - this.timePassed
            });

        this.setState(
            {
                dash: this.calculateCircleDashArray()
            });
    }

    calculateTimeFraction() {
        return (this.timePassed) / (this.duration - 0.5);
    }

    calculateCircleDashArray() {
        var firstDigit = this.calculateTimeFraction() * FULL_DASH_ARRAY;

        if (firstDigit < 0) {
            firstDigit = 0;
        }

        return (firstDigit).toFixed(0) + " " + FULL_DASH_ARRAY.toString()
    }

    render() {
        return (
            <div className="timer squarred">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle className="background" r="45" cx="50" cy="50"></circle>

                    <path
                        strokeDasharray={this.state.dash}
                        className={(this.props.isPaused == true) ? "remaining paused" : "remaining"}
                        d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                            "
                    ></path>
                </svg>
                <span className="time-label">
                    {Math.ceil(this.state.timeLeft)}
                </span>
            </div>
        )
    }
}
export default Timer;
