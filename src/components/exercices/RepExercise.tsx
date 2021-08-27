import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React from "react";
import Timer from "./Timer";
import "./RepExercise.css"

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
            <IonPage>
                <IonContent>
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

                </IonContent>

                <IonFooter>
                    <IonButton onClick={this.props.onDone} expand="block">Mark as done</IonButton>
                </IonFooter>
            </IonPage>
        )
    }
}

export default RepExercise;
