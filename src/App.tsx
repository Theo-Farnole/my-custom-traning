import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
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
import Workouts from './pages/Workouts';
import Settings from './pages/Settings';
import EditWorkout from './pages/EditWorkout';
import PlayWorkout from './pages/PlayWorkout';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

      <IonTabs>
        <IonRouterOutlet>
          <Switch>

            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/workouts">
              <Workouts />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/edit-workout/:id" component={EditWorkout} />
            <Route path="/play-exercise/:id" component={PlayWorkout} />

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/workouts">
            <IonIcon icon={create} />
            <IonLabel>Workouts</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
