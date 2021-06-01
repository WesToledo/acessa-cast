import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "src/navigation.component";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from 'redux-persist';

import store from "src/store";

const persistedStore = persistStore(store);

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <AppNavigator />
        </ApplicationProvider>
      </>
    </PersistGate>
  </Provider>
);
