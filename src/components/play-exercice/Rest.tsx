import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React from "react";
import Timer from "./Timer";
import "./Rest.css"
import { pauseOutline, play as playIcon } from "ionicons/icons"

interface RestProps {
    duration: number;
    onSkip: () => void;
    onTimerOver: () => void;
}

class Rest extends React.Component<RestProps> {

    state = {
        isPaused: false
    };

    constructor(props: RestProps | Readonly<RestProps>) {
        super(props);
    }

    togglePause() {
        this.setState({
            isPaused: !this.state.isPaused
        });
    }

    render() {
        return (
            <>
                <header className="page-header">
                    <h1 className="page-title">Rest</h1>
                </header>

                <Timer onTimerOver={this.props.onTimerOver} duration={this.props.duration} isPaused={this.state.isPaused} />

                <div className="buttons">
                    <IonButton id="pause-button" color="light" onClick={() => this.togglePause()}>
                        <IonIcon slot="icon-only" icon={this.state.isPaused ? playIcon : pauseOutline} />
                    </IonButton>
                    <IonButton id="skip-button" onClick={this.props.onTimerOver} expand="block" size="large" color="danger" className="action">Skip</IonButton>
                </div>
            </>
        )
    }
}

export default Rest;
