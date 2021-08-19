import { Workout } from '../services/Workout';
import './EditWorkout.css';

interface EditWorkoutProps {
    workout: Workout;
}

const EditWorkout: React.FC<EditWorkoutProps> = ({ workout }) => {
    return (
        <h1 className="ion-text-center">
            {workout.name}
        </h1>

    );
};

export default EditWorkout;
