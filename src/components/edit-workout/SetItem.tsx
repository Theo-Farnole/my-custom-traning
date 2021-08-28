import { IonItem, IonButton, IonInput, IonReorder, IonIcon, IonLabel } from "@ionic/react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import { Set } from "../../services/Set";
import React from 'react';
import { trashOutline as deleteIcon, reorderThreeOutline } from "ionicons/icons"
import "./SetItem.css"

interface SetItemProps {
    set: Set,
    workout: Workout
}

class SetItem extends React.Component<SetItemProps> {

    onDeleteClick() {
        this.props.workout.removeSet(this.props.set);
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    render() {
        const set = this.props.set;

        return (<IonItem key={set.uid} className="setContainer" >
            {/* <IonButton onClick={() => { this.onDeleteClick(); this.forceUpdate(); }} color="danger">
                <IonIcon icon={deleteIcon} />
            </IonButton> */}

            <IonInput className="input text" placeholder="exercise" onIonChange={e => { set.exercise = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.exercise}></IonInput>
            <IonInput className="input number" placeholder="1" onIonChange={e => { set.repetitionsPerSet = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.repetitionsPerSet}></IonInput>

            <IonInput className="input number" placeholder="1" type="number" onIonChange={e => { set.setCount = parseInt(e.detail.value as string); WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.setCount}></IonInput>

            <IonReorder slot="start" />
        </IonItem >);
    }
}

export default SetItem;
