import { IonItem, IonButton, IonInput, IonReorder, IonIcon, IonLabel, IonCol, IonGrid, IonRow } from "@ionic/react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import { Set } from "../../services/Set";
import React from 'react';
import { trashOutline, reorderThreeOutline, trash } from "ionicons/icons"
import "./SetItem.css"

interface SetItemProps {
    set: Set,
    workout: Workout,
    isEditing: boolean
}

class SetItem extends React.Component<SetItemProps> {

    onDeleteClick() {
        this.props.workout.removeSet(this.props.set);
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    render() {
        const set = this.props.set;

        return (
            <IonItem lines="none" key={set.uid} className="setContainer">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonInput disabled={!this.props.isEditing} className="input text" placeholder="exercise" onIonChange={e => { set.exercise = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.exercise}></IonInput>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonRow>
                                <IonLabel className="inputLabel">Rep</IonLabel>
                                <IonInput disabled={!this.props.isEditing} className="input number rep" placeholder="1" onIonChange={e => { set.repetitionsPerSet = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.repetitionsPerSet}></IonInput>
                            </IonRow>
                        </IonCol>

                        <IonCol>
                            <IonRow>
                                <IonLabel>Set</IonLabel>
                                <IonInput disabled={!this.props.isEditing} className="input number" placeholder="1" type="number" onIonChange={e => { set.setCount = parseInt(e.detail.value as string); WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.setCount}></IonInput>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonIcon color="danger" hidden={!this.props.isEditing} onClick={() => this.onDeleteClick()} icon={trash} slot="start" />
                <IonReorder hidden={!this.props.isEditing} slot="end" />
            </IonItem >);
    }
}

export default SetItem;
