import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import CreateWorkoutPrompt from "../prompt/CreateWorkoutPrompt";


const CreateWorkoutButton: React.FC = () => {
    const [isCreateOpen, openCreatePrompt] = useState(false);

    return (
        <>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => openCreatePrompt(true)}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

            <CreateWorkoutPrompt isOpen={isCreateOpen} onDismiss={() => openCreatePrompt(false)} />
        </>
    );
};

export default CreateWorkoutButton;
