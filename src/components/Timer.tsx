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

    constructor(props: TimerProps) {
        super(props);

        this.timePassed = 0;
        this.timeLeft = props.duration;
        this.duration = props.duration;

        this.state =
        {
            timeLeft: props.duration,
            circleDashArray: FULL_DASH_ARRAY.toString()
        }

    }

    componentDidMount() {
        let timerInterval = setInterval(() => {
            // The amount of time passed increments by one
            this.timePassed++;
            this.timeLeft = this.duration - this.timePassed;

            // The time left label is updated
            this.setState({ timeLeft: this.timeLeft });
            this.setCircleDasharray();

            if (this.timeLeft <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    calculateTimeFraction() {
        return this.timeLeft / this.duration;
    }

    setCircleDasharray() {


        const circleDasharray = (this.calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0) + " " + FULL_DASH_ARRAY;

        this.setState({ circleDasharray: circleDasharray });
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
