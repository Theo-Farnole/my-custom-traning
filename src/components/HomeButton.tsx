import { IonButton, IonIcon } from "@ionic/react"
import { chevronBack } from "ionicons/icons";

const HomeButton: React.FC = () => {
    return <IonButton routerLink="/home" fill="clear" color="dark">
            <IonIcon icon={chevronBack} />
    </IonButton>;
};

export default HomeButton;
