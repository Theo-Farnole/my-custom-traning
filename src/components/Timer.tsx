import { extensionPuzzleSharp, flaskOutline } from "ionicons/icons";
import React from "react";
import { useState } from "react";
import { useConstructor } from "../services/CustomHooks";
import "./Timer.css"

// source: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/

interface TimerProps {
    duration: number;
};

const FULL_DASH_ARRAY = 283;

class Timer extends React.Component<TimerProps> {

    state = {
        timeLeft: 0,
        circleDashArray: FULL_DASH_ARRAY.toString()
    };

    timePassed: number;
    timeLeft: number;
    duration: number;
    timerInterval: number;

    constructor(props: TimerProps) {
        super(props);

        this.timePassed = 0;
        this.timeLeft = props.duration;
        this.duration = props.duration;
        this.timerInterval = -1;

        this.state =
        {
            timeLeft: props.duration,
            circleDashArray: FULL_DASH_ARRAY.toString()
        }
    }

    componentDidMount() {
        this.timerInterval = window.setInterval(() => {
            this.timePassed++;
            this.timeLeft = this.duration - this.timePassed;

            this.setState(
                {
                    timeLeft: this.timeLeft,
                    circleDasharray: this.calculateCircleDashArray()
                });

            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    calculateTimeFraction() {
        return this.timeLeft / this.duration;
    }

    calculateCircleDashArray(): string {
        return (this.calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0) + " " + FULL_DASH_ARRAY;
    }

    render() {
        return (
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    </g>
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray={this.state.circleDashArray}
                        className="base-timer__path-remaining"
                        d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                            "
                    ></path>
                </svg>
                <span id="base-timer-label" className="base-timer__label">
                    {this.state.timeLeft}
                </span>
            </div>
        )
    }
}
export default Timer;
