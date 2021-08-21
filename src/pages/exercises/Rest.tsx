import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonPage, IonRow, IonToolbar } from "@ionic/react"
import Timer from "../../components/Timer";
import "./Rest.css"

const Rest: React.FC = () => {

    return (
        <IonPage>
            <IonContent className="ion-text-center">
                <h1 className="ion-text-center">Rest</h1>
                <Timer duration={10}></Timer>
            </IonContent>

            <IonFooter>
                <IonButton expand="block" size="large" color="light">Pause</IonButton>
                <IonButton expand="block" size="large" color="danger">Skip</IonButton>
            </IonFooter>
        </IonPage >
    )
};

export default Rest;
