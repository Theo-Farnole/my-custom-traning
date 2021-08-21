import { IonContent, IonPage } from "@ionic/react"
import Timer from "../../components/Timer";

const Rest: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <Timer duration={20}></Timer>
            </IonContent>
        </IonPage>
    )
};

export default Rest;
