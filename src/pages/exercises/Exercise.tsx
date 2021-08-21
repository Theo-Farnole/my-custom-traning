import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Workout } from "../../services/Workout";
import { WorkoutExamples } from "../../services/WorkoutExamples";
import { WorkoutsSave } from "../../services/WorkoutsSave";

interface EditWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }

class Exercise extends React.Component<EditWorkoutProps> {

    id: number;
    state = {
        workout: Workout.Empty // not sure if it a good idea
    }

    constructor(props: EditWorkoutProps | Readonly<EditWorkoutProps>) {
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
                                {this.state.workout.name}
                            </h1>

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

export default Exercise;
