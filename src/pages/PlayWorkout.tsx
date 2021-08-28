import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import ErrorPage from "../components/ErrorPage";
import RepExercise from "../components/play-exercice/RepExercise";
import Rest from "../components/play-exercice/Rest";
import WorkoutFinished from "../components/play-exercice/WorkoutFinished";
import HomeButton from "../components/HomeButton";
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

        for (var i = 0; i < workout.sets.length; i++) {
            const set = workout.sets[i];

            for (var j = 0; j < set.setCount; j++) {
                const isLastSet = (i + 1 == workout.sets.length) && (j + 1 == set.setCount);

                output.push(<RepExercise exerciceName={set.exercise} currentSet={j + 1} totalSet={set.setCount} repCount={set.repetitionsPerSet} onDone={this.showNextComponent} />);

                if (isLastSet == false) {
                    output.push(<Rest duration={workout.secondsBetweenSets} onSkip={this.showNextComponent} onTimerOver={this.showNextComponent} />);
                }
                else {
                    output.push(<WorkoutFinished />);
                }
            }
        }

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
            return (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <HomeButton />
                            </IonButtons>
                            <IonTitle>{this.state.workout.name ?? "Exercise name"}</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent>
                        {this.componentsStack[this.state.showComponentIndex]}
                    </IonContent>
                </IonPage>
            );
        }
        catch (err) {
            return <ErrorPage err={err} />
        }
    }
}

export default PlayWorkout;
