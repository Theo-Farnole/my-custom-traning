import { IonButton, IonContent, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonReorder, IonReorderGroup } from '@ionic/react';
import { exception } from 'console';
import { useReducer, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useConstructor } from '../services/CustomHooks';
import { Workout } from '../services/Workout';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './EditWorkout.css';
import Workouts from './Workouts';
import { ItemReorderEventDetail } from '@ionic/core';
import { WorkoutExamples } from '../services/WorkoutExamples';
import { refresh } from 'ionicons/icons';
import { forceUpdate } from 'ionicons/dist/types/stencil-public-runtime';
import { Set } from '../services/Set';


interface EditWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }

function doReorder(event: CustomEvent<ItemReorderEventDetail>, workout: Workout) {
    event.detail.complete();

    workout.moveSet(event.detail.from - 1, event.detail.to - 1);
    WorkoutsSave.Instance.saveCurrentWorkouts();
}

function addSetClicked(w: Workout) {
    if (w == undefined) throw "Add set to an undefined workout";
    if (w == null) throw "Add set to a null workout"

    w.addEmptySet();
    WorkoutsSave.Instance.saveCurrentWorkouts();
}

function onDeleteSetClick(w: Workout, s: Set) {
    w.removeSet(s);
    WorkoutsSave.Instance.saveCurrentWorkouts();
}

const EditWorkout: React.FC<EditWorkoutProps> = ({ match }) => {

    const [workout, setWorkout] = useState<Workout>();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0); // Official FAQ ( https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate ) now recommends this way if you really need to do it:
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

    var workout_component: JSX.Element[] = [];

    workout?.sets.forEach((set) => {
        workout_component.push(
            <IonItem key={set.uid} className="set-input">
                <IonButton onClick={() => { onDeleteSetClick(workout, set); forceUpdate(); }} color="danger">delete</IonButton>

                <div className="exercice-input ion-input">
                    <IonInput placeholder="exercise" onIonChange={e => { set.exercise = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.exercise}></IonInput>
                </div>

                <div className="rep-input ion-input">
                    <IonInput placeholder="1" onIonChange={e => { set.repetitionsPerSet = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.repetitionsPerSet}></IonInput>
                </div>

                <div className="set-count-input ion-input">
                    <IonInput placeholder="1" type="number" onIonChange={e => { set.setCount = parseInt(e.detail.value as string); WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.setCount}></IonInput>
                </div>

                <IonReorder slot="end" />
            </IonItem >
        );
    });

    try {
        if (workout == undefined)
            throw "Workout in array is undefined.";

        return (
            <IonPage>
                <IonContent fullscreen>
                    <h1 className="ion-text-center">
                        editing workout {workout.name}
                    </h1>

                    <IonReorderGroup disabled={false} onIonItemReorder={(e) => doReorder(e, workout)}>
                        <IonListHeader className="set-list-header">
                            <IonLabel className="exercice-header"><b>Exercice</b></IonLabel>
                            <IonLabel className="rep-header"><b>Rep count</b></IonLabel>
                            <IonLabel className="set-header"><b>Set count</b></IonLabel>
                        </IonListHeader>

                        {workout_component}
                    </IonReorderGroup>

                    <IonButton onClick={() => { addSetClicked(workout); forceUpdate(); }} expand="block">
                        Add a set
                    </IonButton>

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
