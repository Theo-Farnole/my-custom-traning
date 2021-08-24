import { IonAvatar, IonButton, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { pin, heart, closeCircle } from 'ionicons/icons';
import { useState } from 'react';
import EraseAllWorkoutsPrompt from '../components/EraseAllWorkoutsPrompt';
import ExploreContainer from '../components/ExploreContainer';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './Settings.css';

const Settings: React.FC = () => {
  const [isErasePromptOpen, setIsErasePromptOpen] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen>
        <h1 className="ion-text-center">
          Settings
        </h1>

        <IonList>
          <IonItem>
            <IonLabel>Dark mode</IonLabel>
            <IonToggle checked value="dark-mode" />
          </IonItem>

          <IonItem>
            <IonLabel>Sound alert when timer over</IonLabel>
            <IonToggle checked value="sound" />
          </IonItem>

          <IonItem>
            <IonLabel>Reset save?</IonLabel>
            <IonButton color="danger" onClick={() => setIsErasePromptOpen(true)}>Reset save</IonButton>
          </IonItem>
        </IonList>

        <EraseAllWorkoutsPrompt isOpen={isErasePromptOpen} onDismiss={() => setIsErasePromptOpen(false)}/>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
