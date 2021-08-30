import { IonLabel, IonList, IonListHeader } from '@ionic/react';
import { WorkoutsSave } from '../../services/WorkoutsSave';
import { Workout } from "../../services/Workout";
import './WorkoutsList.css';
import React from 'react';
import WorkoutItem from './WorkoutItem';


class WorkoutsList extends React.Component {

  state = {
    workouts: [] as Workout[]
  }

  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.onWorkoutsModified = this.onWorkoutsModified.bind(this);
    this.setWorkoutsFromSave = this.setWorkoutsFromSave.bind(this);

    this.setWorkoutsFromSave();
  }


  componentDidMount() {
    this.setWorkoutsFromSave();
    WorkoutsSave.Instance.attachOnWorkoutsModified(this.onWorkoutsModified);
  }

  componentWillUnmount() {
    WorkoutsSave.Instance.dettachOnWorkoutsModified(this.onWorkoutsModified);
  }

  onWorkoutsModified() {
    this.setWorkoutsFromSave();
  }

  setWorkoutsFromSave() {
    if (WorkoutsSave.Instance.areWorkoutsLoaded) {
      this.setState(
        {
          workouts: WorkoutsSave.Instance.workouts
        });
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

  render() {
    const workoutsList: JSX.Element[] = this.buildWorkoutsList(this.state.workouts);

    return (
      <IonList>
        {/* <IonListHeader class="list-header">
          <IonLabel>My workouts</IonLabel>
        </IonListHeader> */}

        {workoutsList}
      </IonList>
    );
  }
}

export default WorkoutsList;