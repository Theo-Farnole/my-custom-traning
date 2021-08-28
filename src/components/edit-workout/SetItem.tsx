import { IonItem, IonButton, IonInput, IonReorder } from "@ionic/react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import { Set } from "../../services/Set";
import React from 'react';

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

        return (<IonItem key={set.uid} className="set-input" >
            <IonButton onClick={() => { this.onDeleteClick(); this.forceUpdate(); }} color="danger">delete</IonButton>

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
        </IonItem >);
    }
}

export default SetItem;
