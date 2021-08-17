import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabButton, IonButton, IonIcon, IonLabel, IonItem, IonSelect, IonSelectOption, IonText, IonImg } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>

        <h1 className="ion-text-center">
          Custom Workouts
        </h1>

        <IonItem>
          <IonLabel>Select workout</IonLabel>
          <IonSelect value="Select" placeholder="Select One">
            <IonSelectOption value="workout-01">Custom Workout 01</IonSelectOption>
            <IonSelectOption value="workout-02">Morning Workout 02</IonSelectOption>
          </IonSelect>
        </IonItem>

        <div className="ion-text-center">
          <IonButton color="primary" className="ion-text-center">
            <IonLabel>Start workout</IonLabel>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
