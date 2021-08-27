import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, settings, settingsOutline, home, create } from 'ionicons/icons';

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
import './theme/variables.css';
import './theme/global-rules.css'

/* My imports*/
import Home from './pages/Home';
import Settings from './pages/Settings';
import EditWorkout from './pages/EditWorkout';
import PlayWorkout from './pages/PlayWorkout';
import WorkoutFinished from './components/exercices/WorkoutFinished';
import Menu from './components/Menu';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

      <IonSplitPane contentId="main">
        <Menu />

        <IonRouterOutlet id="main">
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/edit-workout/:id" component={EditWorkout} />
            <Route path="/play-workout/:id" component={PlayWorkout} />

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
