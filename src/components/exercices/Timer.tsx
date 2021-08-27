import { timelineEnd } from "console";
import { extensionPuzzleSharp, flaskOutline } from "ionicons/icons";
import React from "react";
import { useState } from "react";
import "./Timer.css"

// source: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/

interface TimerProps {
    duration: number;
    onTimerOver: () => void;
};

const FULL_DASH_ARRAY = 283;

class Timer extends React.Component<TimerProps> {

    state = {
        timeLeft: 0,
        dash: FULL_DASH_ARRAY.toString()
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
            dash: FULL_DASH_ARRAY.toString()
        }
    }

    componentDidMount() {
        this.timerIntervalID = window.setInterval(() => {
            this.timePassed++;
            this.updateVisual();

            if (this.state.timeLeft <= 0) {
                this.props.onTimerOver();
                clearInterval(this.timerIntervalID);
            }
        }, 1000);
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

        console.log(this.state.dash);

    }

    componentWillUnmount() {
        if (this.timerIntervalID != -1) {
            clearInterval(this.timerIntervalID);
            this.timerIntervalID = -1;
        }
    }

    calculateTimeFraction() {
        const rawTimeFraction = this.state.timeLeft / this.duration;
        return rawTimeFraction - (1 / this.duration) * (1 - rawTimeFraction);
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
            <div className="timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle className="background" r="45" cx="50" cy="50"></circle>

                    <path
                        strokeDasharray={this.state.dash}
                        className="remaining"
                        d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                            "
                    ></path>
                </svg>
                <span className="time-label">
                    {this.state.timeLeft}
                </span>
            </div>
        )
    }
}
export default Timer;
