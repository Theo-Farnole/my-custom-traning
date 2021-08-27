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
                        <h1 className="page-title">{this.props.exerciceName ?? "Exercise name"}</h1>
                    </header>


                    <div className="container">
                        <div className="setLabel">Set</div>
                        <div className="setCount">{this.props.currentSet ?? 999}/{this.props.totalSet ?? 999}</div>
                        <div className="repCount">{this.props.repCount ?? 999}</div>
                        <div className="repLabel">Rep</div>
                    </div>
                </div>

                <IonButton onClick={this.props.onDone} expand="block" className="action" id="done-btn">Mark as done</IonButton>
            </>
        );
    }
}

export default RepExercise;
