import LLC from "lightning-container";
import React from "react";
import ReactDOM from "react-dom";
import { USER_ID, YOUR_SALESFORCE_CONTAINER_URL } from "./const";
import UIKit from "./UIKit";

import "./styles.css";
import "./tabFocus.js";

const rootElement = document.getElementById("app");

const App = (props) => (
  <div>
    <UIKit user={props.user} />
  </div>
);

if (window.location.origin != YOUR_SALESFORCE_CONTAINER_URL) {

  console.warn(`If rendering in Salesforce, 
  YOUR_SALESFORCE_CONTAINER_URL should be: 
  ${window.location.origin}`);

  ReactDOM.render(<App env={"dev"} user={{ userId: USER_ID }} />, rootElement);

} else {
  try {
    const clientState = "READY"
    LLC.sendMessage(clientState);
    console.warn("Lightning Container --> TO SALESFORCE --> Sent:", clientState)
  } catch (e) {
    console.error("LLC NOT WORKING", e)
  }
}

try {
  LLC.addErrorHandler((error) => console.log("LLC ERROR:", error));
  LLC.addMessageHandler((salesforceMessage) => {
    console.warn("SALESFORCE --> Lightning Container --> Arrived:", salesforceMessage);
    ReactDOM.render(
      <App env={"salesforce"} user={salesforceMessage} />,
      rootElement
    );
  });
} catch (e) {
  console.error("Error from LLC!!", e)
}

