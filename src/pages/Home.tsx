import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabButton, IonButton, IonIcon, IonLabel, IonItem, IonSelect, IonSelectOption, IonText, IonImg } from '@ionic/react';
import './Home.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonText>
          Custom Workouts
        </IonText>

        <IonItem>
          <IonLabel>Select workout</IonLabel>
          <IonSelect value="Select" placeholder="Select One">
            <IonSelectOption value="workout-01">Custom Workout 01</IonSelectOption>
            <IonSelectOption value="workout-02">Morning Workout 02</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton color="primary">
          <IonLabel>Start workout</IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
