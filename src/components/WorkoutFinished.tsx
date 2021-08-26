import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React from "react";
import Timer from "./Timer";
import "./WorkoutFinished.css"

class Rest extends React.Component {

    render() {
        return (
            <IonPage>
                <IonContent>
                    {/* source https://blog.prototypr.io/delighting-students-with-a-twitter-like-css-only-animation-diy-kit-included-a5fcae0d6017#.thzx6cmbd */}

                    <div className="success-animation">
                        <div className="success-checkmark">
                            <div className="check-icon">
                                <span className="icon-line line-tip"></span>
                                <span className="icon-line line-long"></span>
                                <div className="icon-circle"></div>
                                <div className="icon-fix"></div>
                            </div>
                        </div>
                    </div>

                    <div className="informations">
                        {/* <img src="./assets/party-popper.png" alt="party popper" /> */}
                        <h1 className="ion-text-center">Great job! 🎉</h1>
                        <p className="ion-text-center">
                            You have completed your workout.<br />
                            Keep it up!
                        </p>
                        <IonButton class="action-button" expand="block">Continue</IonButton>
                    </div>


                </IonContent>
            </IonPage>
        )
    }
}

export default Rest;
