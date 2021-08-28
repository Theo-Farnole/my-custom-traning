import { IonLabel, IonList, IonListHeader } from '@ionic/react';
import { WorkoutsSave } from '../services/WorkoutsSave';
import { Workout } from "../services/Workout";
import './WorkoutsList.css';
import React from 'react';
import WorkoutItem from './WorkoutItem';


class WorkoutsList extends React.Component {

  state = {
    workouts: [] as Workout[]
  }

  isComponentedMounted: boolean = false;
  reloadWorkoutOnMounted: boolean = false;

  constructor(props: {} | Readonly<{}>) {
    super(props);

    WorkoutsSave.Instance.attachOnWorkoutsModified(event => {
      this.setWorkoutsFromSave();
    });
  }

  setWorkoutsFromSave() {
    if (this.isComponentedMounted == true && WorkoutsSave.Instance.areWorkoutsLoaded) {
      this.setState(
        {
          workouts: WorkoutsSave.Instance.workouts
        });
    }
    else {
      this.reloadWorkoutOnMounted = true;
    }
  }

  buildWorkoutsList(workouts: Workout[]) {
    const output: JSX.Element[] = [];

    for (var i = 0; i < workouts.length; i++) {
      const workout = workouts[i];

      output.push(<WorkoutItem editID={i} key={workout.uid} workout={workout} />)
    }

    return output;
  }

  componentDidMount() {
    this.isComponentedMounted = true;

    if (this.reloadWorkoutOnMounted == true) {
      this.reloadWorkoutOnMounted = false;
      this.setWorkoutsFromSave();
    }

    if (WorkoutsSave.Instance.areWorkoutsLoaded) {
      this.setWorkoutsFromSave();
    }
  }

  componentWillUnmount() {
    this.isComponentedMounted = false;
  }

  render() {
    const workoutsList: JSX.Element[] = this.buildWorkoutsList(this.state.workouts);

    return (
      <IonList>
        <IonListHeader class="list-header">
          <IonLabel><b>Name</b></IonLabel>
          <IonLabel class="ion-text-right"><b>Actions</b></IonLabel>
        </IonListHeader>

        {workoutsList}
      </IonList>
    );
  }
}

export default WorkoutsList;