import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppRoutes from './Routes';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AppRoutes />
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
