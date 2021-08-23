import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Workout } from "../services/Workout";
import { WorkoutsSave } from "../services/WorkoutsSave";

interface PlayWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }

class PlayWorkout extends React.Component<PlayWorkoutProps> {

    id: number;
    state = {
        workout: Workout.Empty // not sure if it a good idea
    }

    constructor(props: PlayWorkoutProps | Readonly<PlayWorkoutProps>) {
        super(props);

        this.id = parseInt(props.match.params.id);

        WorkoutsSave.Instance.attachOnWorkoutsModified(e => {
            this.setWorkoutFromID();
        });

        if (WorkoutsSave.Instance.areWorkoutsLoaded == true && WorkoutsSave.Instance.workouts[this.id] != this.state.workout) {
            this.setWorkoutFromID();
        }
    }

    private setWorkoutFromID() {
        this.setState({ workout: WorkoutsSave.Instance.workouts[this.id] });
    }

    render() {
        try {
            if (this.state.workout == undefined)
                throw "Workout in array is undefined.";
            else {
                return (
                    <IonPage>
                        <IonContent fullscreen>
                            <h1 className="ion-text-center">
                                editing "{this.state.workout.name}"
                            </h1>

                            <p>test</p>
                        </IonContent>
                    </IonPage >

                );
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
