import { IonReorderGroup, IonListHeader, IonLabel, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import React from "react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import SetItem from "./SetItem";
import { ItemReorderEventDetail } from '@ionic/core';
import "./SetsList.css"

interface SetsListProps {
    workout: Workout
}

class SetsList extends React.Component<SetsListProps> {

    generateWorkoutList() {
        const workout = this.props.workout;
        var components: JSX.Element[] = [];

        workout?.sets.forEach((set) => {
            components.push(
                <SetItem key={set.uid} set={set} workout={workout} />
            );
        });

        return components;
    }

    onReorder(event: CustomEvent<ItemReorderEventDetail>, workout: Workout) {
        event.detail.complete();

        workout.moveSet(event.detail.from - 1, event.detail.to - 1);
        WorkoutsSave.Instance.saveCurrentWorkouts();
    }

    render() {
        const sets_list = this.generateWorkoutList();
        const workout = this.props.workout;

        return (
            <IonReorderGroup
                className={"sets-list"}
                onIonItemReorder={(e) => this.onReorder(e, workout)}
                disabled={false}>

                {/* <IonListHeader hidden={workout.sets.length == 0 || this.props.isEditing} lines="none" className="headerContainer">
                    <IonLabel className="exerciceHeader"><b>Exercice</b></IonLabel>
                    <IonLabel><b>Rep</b></IonLabel>
                    <IonLabel><b>Set</b></IonLabel>
                </IonListHeader> */}

                <IonGrid hidden={workout.sets.length == 0}>
                    <IonRow class="gridHeader" >
                        <IonCol>
                            <IonLabel><b>Exercise</b></IonLabel>
                        </IonCol>

                        <IonCol size="2">
                            <IonLabel><b>Rep</b></IonLabel>
                        </IonCol>

                        <IonCol size="2">
                            <IonLabel><b>Set</b></IonLabel>
                        </IonCol>
                    </IonRow>

                    {sets_list}
                </IonGrid>

            </IonReorderGroup>);
    }
}

export default SetsList;