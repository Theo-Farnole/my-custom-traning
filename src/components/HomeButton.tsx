import { IonButton, IonIcon } from "@ionic/react"
import { chevronBack, arrowBack } from "ionicons/icons";

const HomeButton: React.FC = () => {
    return <IonButton routerLink="/home" fill="clear" color="light">
            <IonIcon icon={arrowBack} />
    </IonButton>;
};

export default HomeButton;
