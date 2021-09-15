import { IonItem, IonButton, IonInput, IonReorder, IonIcon, IonLabel, IonCol, IonGrid, IonRow, IonItemOption, IonItemOptions, IonItemSliding } from "@ionic/react";
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

        if (this.props.isEditing == true) {

            return (
                <IonItem lines="none" key={set.uid} className="setContainer">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonRow>
                                    <IonLabel className="inputLabel ex">Exercise</IonLabel>
                                    <IonInput disabled={!this.props.isEditing} className="input text" placeholder="exercise" onIonChange={e => { set.exercise = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.exercise}></IonInput>
                                </IonRow>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonRow>
                                    <IonLabel className="inputLabel rep">Rep</IonLabel>
                                    <IonInput disabled={!this.props.isEditing} className="input number rep" placeholder="1" onIonChange={e => { set.repetitionsPerSet = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.repetitionsPerSet}></IonInput>
                                </IonRow>
                            </IonCol>

                            <IonCol>
                                <IonRow>
                                    <IonLabel className="inputLabel">Set</IonLabel>
                                    <IonInput disabled={!this.props.isEditing} className="input number set" placeholder="1" type="number" onIonChange={e => { set.setCount = parseInt(e.detail.value as string); WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.setCount}></IonInput>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonReorder hidden={!this.props.isEditing} slot="end" />
                </IonItem >
            );
        }
        else {
            return (
                <>
                    <IonItem lines="none" key={set.uid} className="setContainer">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonInput disabled={!this.props.isEditing} className="input text" placeholder="exercise" onIonChange={e => { set.exercise = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.exercise}></IonInput>
                                </IonCol>

                                <IonCol>
                                    <IonInput disabled={!this.props.isEditing} className="input number rep" placeholder="1" onIonChange={e => { set.repetitionsPerSet = e.detail.value as string; WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.repetitionsPerSet}></IonInput>
                                </IonCol>

                                <IonCol>
                                    <IonInput disabled={!this.props.isEditing} className="input number set" placeholder="1" type="number" onIonChange={e => { set.setCount = parseInt(e.detail.value as string); WorkoutsSave.Instance.saveCurrentWorkouts(); }} value={set.setCount}></IonInput>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                        <IonReorder hidden={!this.props.isEditing} slot="end" />
                    </IonItem >
                </>
            )
        }
    }
}

export default SetItem;
