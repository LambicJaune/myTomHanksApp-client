import { createRoot } from 'react-dom/client';

//import the MainView React component
import { MainView } from "./components/main-view/main-view";

//import container component from Bootstrap
import Container from "react-bootstrap/Container";

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import "bootstrap/dist/css/bootstrap.min.css";

// Import statement indicating `./index.scss` needs to be bundled
import "./index.scss";

/**
 * Main app component that wraps MainView inside a Bootstrap Container.
 */
const App = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

// Finds the root element in the DOM and mounts the app
const container = document.getElementById('root');
const root = createRoot(container);

/**
 * Renders the App inside Redux <Provider> so all components can access the store.
 */
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);