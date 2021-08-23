import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React from "react";
import Timer from "./Timer";
import "./RepExercise.css"

interface RepExerciceProps {
    exerciceName: string,
    currentSet: number,
    totalSet: number,
    repCount: number
}

class RepExercise extends React.Component<RepExerciceProps> {

    render() {
        return (
            <div>

                <header className="page-header">
                    <p className="pre-page-title">Current exercise</p>
                    <h1 className="page-title">{this.props.exerciceName ?? "Exercise name"}</h1>
                </header>

                <p>Rep {this.props.repCount ?? 10}</p>
                <p>Set {this.props.currentSet ?? 1}/{this.props.totalSet ?? 3}</p>

            </div>
        )
    }
}

export default RepExercise;
