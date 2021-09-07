import LLC from 'lightning-container';
import React from 'react';
import ReactDOM from 'react-dom';
import UIKit from './UIKit';

import './styles.css';
import './tabFocus.js';

const rootElement = document.getElementById('app');

const App = (props) => (
  <div>
    <UIKit user={props.user} />
  </div>
);

try {
  const clientState = 'READY';
  LLC.sendMessage(clientState);
  console.log('Lightning Container --> TO SALESFORCE --> Sent:', clientState);
} catch (e) {
  console.error('LLC NOT WORKING', e);
}

try {
  LLC.addErrorHandler((error) => console.log('LLC ERROR:', error));
  LLC.addMessageHandler((salesforceMessage) => {
    console.log('SALESFORCE --> Lightning Container --> Arrived:', salesforceMessage);
    ReactDOM.render(<App env={'salesforce'} user={salesforceMessage} />, rootElement);
  });
} catch (e) {
  console.error('Error from LLC!!', e);
}