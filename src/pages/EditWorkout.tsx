import { IonPage } from '@ionic/react';
import { exception } from 'console';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useConstructor } from '../services/CustomHooks';
import { Workout } from '../services/Workout';
import { WorkoutsSave } from '../services/WorkoutsSave';
import './EditWorkout.css';
import Workouts from './Workouts';


interface EditWorkoutProps extends RouteComponentProps<{
    id: string;
}> { }


const EditWorkout: React.FC<EditWorkoutProps> = ({ match }) => {

    const [workout, setWorkout] = useState<Workout>();
    const id: number = parseInt(match.params.id);

    // constructor equivalent
    useConstructor(() => {
        setWorkout(undefined);

        WorkoutsSave.Instance.attachOnWorkoutsModified(event => {
            try {
                setWorkout(WorkoutsSave.Instance.workouts[id]);
            }
            catch {

            }
        });
    });

    if (WorkoutsSave.Instance.areWorkoutsLoaded == true) {
        if (WorkoutsSave.Instance.workouts[id] != workout) {
            setWorkout(WorkoutsSave.Instance.workouts[id]);
        }
    }

    try {
        if (workout == undefined)
            throw "Workout in array is undefined.";

        return (
            <IonPage>
                <h1 className="ion-text-center">
                    editing workout {workout.name}
                </h1>
            </IonPage>

        );
    }
    catch (err) {
        return (
            <IonPage>
                <h1>Error, cannot load the workout of id "{id}" because it doesn't exit or is empty</h1>
                <p>Please, return home.</p>
                <p>{err}</p>
            </IonPage>
        )
    }
};

export default EditWorkout;
