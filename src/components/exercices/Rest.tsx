import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React from "react";
import Timer from "./Timer";
import "./Rest.css"
import { pauseOutline } from "ionicons/icons"

interface RestProps {
    duration: number;
    onSkip: () => void;
    onTimerOver: () => void;
}

class Rest extends React.Component<RestProps> {

    constructor(props: RestProps | Readonly<RestProps>) {
        super(props);
    }

    render() {
        return (
            <>
                <header className="page-header">
                    <h1 className="page-title">Rest</h1>
                </header>

                <Timer onTimerOver={this.props.onTimerOver} duration={this.props.duration} />

                <div className="buttons">
                    <IonButton id="pause-button" color="light">
                        <IonIcon slot="icon-only" icon={pauseOutline} />
                    </IonButton>
                    <IonButton id="skip-button" onClick={this.props.onTimerOver} expand="block" size="large" color="danger" className="action">Skip</IonButton>
                </div>
            </>
        )
    }
}

export default Rest;
