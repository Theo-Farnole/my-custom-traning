import { IonReorderGroup, IonListHeader, IonLabel, IonCol, IonGrid, IonInput, IonRow, IonReorder, IonIcon, useIonPopover } from "@ionic/react";
import React from "react";
import { Workout } from "../../services/Workout";
import { WorkoutsSave } from "../../services/WorkoutsSave";
import EditSetItem from "./EditSetItem";
import { ItemReorderEventDetail } from '@ionic/core';
import "./EditSetsList.css"
import { help, helpCircle, helpCircleOutline, helpCircleSharp } from "ionicons/icons";

interface SetsListProps {
    workout: Workout
}

const PopoverList: React.FC = () => (

    <div className="setTooltip">
        <IonLabel>The set count is the amount of repetitions of an exercise following by a rest.</IonLabel>
    </div>

);

const EditSetsList: React.FC<SetsListProps> = ({ workout }) => {

    const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });


    var sets_list: JSX.Element[] = [];

    workout?.sets.forEach((set) => {
        sets_list.push(
            <EditSetItem key={set.uid} set={set} workout={workout} />
        );
    });

    return (
        <IonGrid className="sets-list-editing-grid" hidden={workout.sets.length == 0}>
            <IonRow class="gridHeader" >
                <IonCol>
                    <IonLabel><b>Exercise</b></IonLabel>
                </IonCol>

                <IonCol size="2" >
                    <IonLabel><b>Rep</b></IonLabel>
                </IonCol>

                <IonCol size="2" onClick={(e) => { present({ event: e.nativeEvent }) }}>
                    <IonLabel className="setLabel"><b>Set </b>
                        <IonIcon icon={helpCircleOutline}></IonIcon>
                    </IonLabel>
                </IonCol>

                <IonCol>
                    <IonLabel><b>Actions</b></IonLabel>
                </IonCol>
            </IonRow>


            <IonReorderGroup
                className="sets-list-editing"
                onIonItemReorder={(e) => {
                    e.detail.complete();

                    workout.moveSet(e.detail.from, e.detail.to);
                    WorkoutsSave.Instance.saveCurrentWorkouts();
                }}
                disabled={false} >
                {sets_list}
            </IonReorderGroup >
        </IonGrid>

    );
}

export default EditSetsList;