import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { Prompt, RouteComponentProps } from "react-router";
import ErrorPage from "../components/ErrorPage";
import RepExercise from "../components/play-exercice/RepExercise";
import Rest from "../components/play-exercice/Rest";
import WorkoutFinished from "../components/play-exercice/WorkoutFinished";
import HomeButton from "../components/HomeButton";
import { Workout } from "../services/Workout";
import { WorkoutsSave } from "../services/WorkoutsSave";
import { AdsPlayer } from "../services/AdsPlayer";
import { Insomnia } from "@ionic-native/insomnia";

interface PlayWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }

class PlayWorkout extends React.Component<PlayWorkoutProps> {

    public get id(): number {
        return parseInt(this.props.match.params.id);
    }

    state = {
        workout: Workout.Empty, // not sure if it a good idea
        showComponentIndex: 0,
        isLeaving: false
    }
    componentsStack: JSX.Element[] = [];

    constructor(props: PlayWorkoutProps | Readonly<PlayWorkoutProps>) {
        super(props);

        this.showNextComponent = this.showNextComponent.bind(this);
        this.onWorkoutsModified = this.onWorkoutsModified.bind(this);
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        this.setWorkoutFromID();
        WorkoutsSave.Instance.attachOnWorkoutsModified(this.onWorkoutsModified);

        AdsPlayer.showBanner_WorkoutPlaying();

        Insomnia.keepAwake()
    }

    componentWillUnmount() {
        WorkoutsSave.Instance.dettachOnWorkoutsModified(this.onWorkoutsModified);

        AdsPlayer.hideBanner();

        this.setState({
            isLeaving: true
        });

        Insomnia.allowSleepAgain()
    }

    private onWorkoutsModified() {
        this.setWorkoutFromID();
    }

    private setWorkoutFromID() {
        if (WorkoutsSave.Instance.areWorkoutsLoaded == false) return;

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

    isOnRecapScreen() {
        return this.state.showComponentIndex + 1 == this.componentsStack.length;
    }

    getPromptMessage(): string {

        var progression = this.getProgressionPercent();

        const PREFIX = "Are you sure you want to stop this workout?";


        if (progression <= .30) {
            return PREFIX;
        }
        else if (progression <= .60) {
            return PREFIX + "\nYou are almost halfway! Slow progress is better than no progress."
        }
        else {
            return PREFIX + "\nYou're so close, don't you dare give up now.";
        }

    }

    getProgressionPercent(): number {
        return (this.state.showComponentIndex + 1) / this.componentsStack.length;
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

                            <IonTitle>Playing {this.state.workout.name ?? "Exercise name"}</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent>
                        {this.componentsStack[this.state.showComponentIndex]}

                        <Prompt
                            when={!this.isOnRecapScreen()}
                            message={this.getPromptMessage()}
                        />
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
