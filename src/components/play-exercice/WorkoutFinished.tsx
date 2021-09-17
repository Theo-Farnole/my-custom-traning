import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React from "react";
import { AdsPlayer } from "../../services/AdsPlayer";
import Timer from "./Timer";
import "./WorkoutFinished.css"

class Rest extends React.Component {

    render() {
        AdsPlayer.prepareInterstitial_WorkoutEnded();

        return (
            <>
                {/* source https://blog.prototypr.io/delighting-students-with-a-twitter-like-css-only-animation-diy-kit-included-a5fcae0d6017#.thzx6cmbd */}

                <div className="informations flex-container">
                    <div className="success-animation flex-item">
                        <div className="success-checkmark">
                            <div className="check-icon">
                                <span className="icon-line line-tip"></span>
                                <span className="icon-line line-long"></span>
                                <div className="icon-circle"></div>
                                <div className="icon-fix"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-item">
                        <h1 className="ion-text-center">Great job! 🎉</h1>
                        <p className="ion-text-center">
                            You have completed your workout.<br />
                            Keep it up!
                        </p>
                        <IonButton routerLink="/home/" onClick={() => {
                            FirebaseAnalytics.logEvent({
                                name: "workout_completed",
                                params: {}
                            });
                            AdsPlayer.interstitial()
                        }} className="action continue" expand="block">Continue</IonButton>
                    </div>
                </div>
            </>
        )
    }
}

export default Rest;
