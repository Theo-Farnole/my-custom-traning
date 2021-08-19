import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonReorder, IonReorderGroup } from '@ionic/react';
import { exception } from 'console';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useConstructor } from '../services/CustomHooks';
import { Workout } from '../services/Workout';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './EditWorkout.css';
import Workouts from './Workouts';
import { ItemReorderEventDetail } from '@ionic/core';


interface EditWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }

function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
}


const EditWorkout: React.FC<EditWorkoutProps> = ({ match }) => {

    const [workout, setWorkout] = useState<Workout>();
    const id: number = parseInt(match.params.id);

    // constructor equivalent
    useConstructor(() => {
        setWorkout(undefined);

        WorkoutsSave.Instance.attachOnWorkoutsModified(event => {
            try {
                setWorkout(WorkoutsSave.Instance.workouts[id]);
            }
            catch {

            }
        });
    });

    if (WorkoutsSave.Instance.areWorkoutsLoaded == true) {
        if (WorkoutsSave.Instance.workouts[id] != workout) {
            setWorkout(WorkoutsSave.Instance.workouts[id]);
        }
    }

    try {
        if (workout == undefined)
            throw "Workout in array is undefined.";

        return (
            <IonPage>
                <IonContent>
                    <h1 className="ion-text-center">
                        editing workout {workout.name}
                    </h1>

                    <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
                        <IonListHeader className="set-list-header">
                            <IonLabel className="exercice-header"><b>Exercice</b></IonLabel>
                            <IonLabel className="rep-header"><b>Rep count</b></IonLabel>
                            <IonLabel className="set-header"><b>Set count</b></IonLabel>
                        </IonListHeader>

                        <IonItem className="set-input">
                            <div className="exercice-input ion-input">
                                <IonInput placeholder="push up"></IonInput>
                            </div>

                            <div className="rep-input ion-input">
                                <IonInput placeholder="10"></IonInput>
                            </div>

                            <div className="set-count-input ion-input">
                                <IonInput type="number" placeholder="3"></IonInput>
                            </div>
                            <IonReorder slot="start" />
                        </IonItem>

                        <IonItem className="set-input">
                            <div className="exercice-input ion-input">
                                <IonInput placeholder="pull up"></IonInput>
                            </div>

                            <div className="rep-input ion-input">
                                <IonInput placeholder="3"></IonInput>
                            </div>

                            <div className="set-count-input ion-input">
                                <IonInput type="number" placeholder="3"></IonInput>
                            </div>
                            <IonReorder slot="start" />
                        </IonItem>

                        <IonItem className="set-input">
                            <div className="exercice-input ion-input">
                                <IonInput placeholder="😀"></IonInput>
                            </div>

                            <div className="rep-input ion-input">
                                <IonInput placeholder="Max-1"></IonInput>
                            </div>

                            <div className="set-count-input ion-input">
                                <IonInput type="number" placeholder="3"> </IonInput>
                            </div>
                            <IonReorder slot="start" />
                        </IonItem>

                    </IonReorderGroup>
                </IonContent>
            </IonPage >

        );
    }
    catch (err) {
        return (
            <IonPage>
                <IonContent>
                    <h1>Error, cannot load the workout of id "{id}" because it doesn't exit or is empty</h1>
                    <p>Please, return home.</p>
                    <p>{err}</p>
                </IonContent>
            </IonPage>
        )
    }
};

export default EditWorkout;
