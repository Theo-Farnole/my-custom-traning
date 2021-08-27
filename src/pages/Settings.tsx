import { IonAvatar, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { pin, heart, closeCircle } from 'ionicons/icons';
import { useState } from 'react';
import EraseAllWorkoutsPrompt from '../components/prompt/EraseAllWorkoutsPrompt';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './Settings.css';

const Settings: React.FC = () => {
  const [isErasePromptOpen, setIsErasePromptOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
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

        <EraseAllWorkoutsPrompt isOpen={isErasePromptOpen} onDismiss={() => setIsErasePromptOpen(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
