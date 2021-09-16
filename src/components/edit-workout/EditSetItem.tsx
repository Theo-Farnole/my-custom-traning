import { IonItem, IonButton, IonInput, IonReorder, IonIcon, IonLabel, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding, useIonAlert } from "@ionic/react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import { Set } from "../../services/Set";
import React from 'react';
import { trashOutline, reorderThreeOutline, trash } from "ionicons/icons"
import "./EditSetItem.css"
import { Utilities } from "../../utilities/utilities";

interface SetItemProps {
    set: Set,
    workout: Workout
}

const EditSetItem: React.FC<SetItemProps> = ({ set, workout }) => {

    const [present] = useIonAlert();

    return (
        <IonRow className="setContainer">
            <IonCol>
                <IonInput className="input text" placeholder="exercise" onIonChange={e => { set.exercise = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.exercise}></IonInput>
            </IonCol>

            <IonCol size="2">
                <IonInput className="input number rep" placeholder="1" onIonChange={e => { set.repetitionsPerSet = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.repetitionsPerSet}></IonInput>
            </IonCol>

            <IonCol size="2">
                <IonInput className="input number set" placeholder="1" type="number" onIonChange={e => { set.setCount = parseInt(e.detail.value as string); WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.setCount}></IonInput>
            </IonCol>

            <IonCol className="action">
                <IonRow>
                    <IonIcon color="danger" size="large" onClick={() =>
                        present({
                            header: 'Delete exercise ' + Utilities.truncateString(set.exercise, 30) + '?',
                            message: 'It cannot be reverted.',
                            buttons: [
                                'Cancel',
                                {
                                    text: 'Ok', handler: (d) => {
                                        workout.removeSet(set);
                                        WorkoutsSave.Instance.saveCurrentWorkouts();
                                    }
                                },
                            ]
                        })
                    } icon={trash} />
                    <IonReorder />
                </IonRow>
            </IonCol>
        </IonRow>
    );
}

export default EditSetItem;
