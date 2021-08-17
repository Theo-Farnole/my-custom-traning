import { IonAvatar, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { pin, heart, closeCircle } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Settings.css';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <h1 className="ion-text-center">
          Settings
        </h1>

        <IonList>

          { /* <IonItemDivider>Toggles in a List</IonItemDivider> */}

          <IonItem>
            <IonLabel>Dark mode</IonLabel>
            <IonToggle checked value="dark-mode" />
          </IonItem>

          <IonItem>
            <IonLabel>Sound alert when timer over</IonLabel>
            <IonToggle checked value="sound" />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
