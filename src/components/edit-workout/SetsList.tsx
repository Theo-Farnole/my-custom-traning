import { IonReorderGroup, IonListHeader, IonLabel } from "@ionic/react";
import React from "react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import SetItem from "./SetItem";
import { ItemReorderEventDetail } from '@ionic/core';
import "./SetsList.css"

interface SetsListProps {
    workout: Workout,
    isEditing: boolean
}

class SetsList extends React.Component<SetsListProps> {

    generateWorkoutList() {
        const workout = this.props.workout;
        var components: JSX.Element[] = [];

        workout?.sets.forEach((set) => {
            components.push(
                <SetItem isEditing={this.props.isEditing} key={set.uid} set={set} workout={workout} />
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
                className={"sets-list" + (this.props.isEditing ? " editing" : "")}
                onIonItemReorder={(e) => this.onReorder(e, workout)}
                disabled={false}>

                <IonListHeader lines="none" className="headerContainer">
                    <IonLabel className="exerciceHeader"><b>Exercice</b></IonLabel>
                    <IonLabel className="repHeader"><b>Rep</b></IonLabel>
                    <IonLabel className="setHeader"><b>Set</b></IonLabel>
                </IonListHeader>

                {sets_list}
            </IonReorderGroup>);
    }
}

export default SetsList;