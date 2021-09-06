import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables-light-theme.css';
// import './theme/variables-dark-theme.css'; // DARK THEME IS DISABLED
import './theme/global-rules.css'

/* My imports*/
import Home from './pages/Home';
import Settings from './pages/Settings';
import EditWorkout from './pages/EditWorkout';
import PlayWorkout from './pages/PlayWorkout';
import Menu from './components/home/Menu';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>


          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/edit-workout/:id" component={EditWorkout} />
          <Route path="/play-workout/:id" component={PlayWorkout} />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
