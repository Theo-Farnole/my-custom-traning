import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
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
            if (this.state.workout == undefined)
                throw "Workout in array is undefined.";
            else if (this.state.showComponentIndex >= this.componentsStack.length) {
                return (
                    <IonPage>
                        <IonContent>
                            <h1>Page todo</h1>
                            <p>Components index is out of bounds. The exercise is either loading a done</p>
                        </IonContent>
                    </IonPage>
                )
            }
            else {
                return this.componentsStack[this.state.showComponentIndex];
            }
        }
        catch (err) {
            return (
                <IonPage>
                    <IonContent>
                        <h1>Error, cannot load the workout of id "{this.id}" because it doesn't exit or is empty</h1>
                        <p>Please, return home.</p>
                        <p>{err}</p>
                    </IonContent>
                </IonPage>
            )
        }
    }
}

export default PlayWorkout;
