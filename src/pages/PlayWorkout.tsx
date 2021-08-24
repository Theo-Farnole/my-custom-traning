import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import ErrorPage from "../components/ErrorPage";
import RepExercise from "../components/RepExercise";
import Rest from "../components/Rest";
import { Workout } from "../services/Workout";
import { WorkoutsSave } from "../services/WorkoutsSave";

interface PlayWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }

class PlayWorkout extends React.Component<PlayWorkoutProps> {

    id: number;
    state = {
        workout: Workout.Empty, // not sure if it a good idea
        showComponentIndex: 0
    }
    componentsStack: JSX.Element[] = [];

    constructor(props: PlayWorkoutProps | Readonly<PlayWorkoutProps>) {
        super(props);
        this.id = parseInt(props.match.params.id);

        this.showNextComponent = this.showNextComponent.bind(this);
        this.setState = this.setState.bind(this);

        WorkoutsSave.Instance.attachOnWorkoutsModified(e => {
            this.setWorkoutFromID();
        });

        if (WorkoutsSave.Instance.areWorkoutsLoaded == true && WorkoutsSave.Instance.workouts[this.id] != this.state.workout) {
            this.setWorkoutFromID();
        }
    }

    private setWorkoutFromID() {
        const newWorkout = WorkoutsSave.Instance.workouts[this.id];

        this.componentsStack = this.generateComponentsStack(newWorkout);
        this.setState(
            {
                workout: newWorkout,
                componentsIndex: 0
            });
    }

    private generateComponentsStack(workout: Workout): JSX.Element[] {

        var output: Array<JSX.Element> = [];

        workout.sets.forEach((set) => {

            for (var i = 0; i < set.setCount; i++) {
                output.push(<RepExercise exerciceName={set.exercise} currentSet={i + 1} totalSet={set.setCount} repCount={set.repetitionsPerSet} onDone={this.showNextComponent} />);
                output.push(<Rest duration={10} onSkip={this.showNextComponent} onTimerOver={this.showNextComponent} />)
            }
        });

        return output;
    }

    private showNextComponent() {
        this.setState(
            {
                componentsIndex: this.state.showComponentIndex++
            });

        console.log("Next component shown. Current index = " + this.state.showComponentIndex)
    }

    render() {
        try {
            return this.componentsStack[this.state.showComponentIndex];
        }
        catch (err) {
            return <ErrorPage err={err} />
        }
    }
}

export default PlayWorkout;
