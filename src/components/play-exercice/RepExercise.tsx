import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import React from "react";
import Timer from "./Timer";
import "./RepExercise.css"
import HomeButton from "../HomeButton";

interface RepExerciceProps {
    exerciceName: string,
    currentSet: number,
    totalSet: number,
    repCount: string,
    onDone: () => void
}

class RepExercise extends React.Component<RepExerciceProps> {

    render() {
        return (
            <>
                <div className="content">

                    <header className="page-header">
                        <p className="pre-page-title">Current exercise</p>
                        <h1 className="page-title">{this.props.exerciceName}</h1>
                    </header>

                    <div className="center">
                        <div className="repCount">{this.props.repCount}x reps</div>
                        <div className="setCount">set <b>{this.props.currentSet}/{this.props.totalSet}</b></div>
                    </div>
                </div>

                <IonButton onClick={this.props.onDone} expand="block" className="action" id="done-btn">Set achieved</IonButton>
            </>
        );
    }
}

export default RepExercise;
