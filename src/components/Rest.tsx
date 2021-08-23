import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React from "react";
import Timer from "./Timer";
import "./Rest.css"

interface RestProps {
    duration: number;
    onClick: () => void;
    onTimerOver: () => void;
}

class Rest extends React.Component<RestProps> {

    constructor(props: RestProps | Readonly<RestProps>) {
        super(props);
    }

    render() {
        return (
            <div>
                <IonContent className="ion-text-center">
                    <h1 className="ion-text-center">Rest</h1>
                    <Timer onTimerOver={this.props.onTimerOver} duration={this.props.duration}></Timer>
                </IonContent>

                <IonFooter>
                    <IonButton expand="block" size="large" color="light">Pause</IonButton>
                    <IonButton onClick={this.props.onTimerOver} expand="block" size="large" color="danger">Skip</IonButton>
                </IonFooter>
            </div>
        )
    }
}

export default Rest;
