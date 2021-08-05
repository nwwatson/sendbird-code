const renderUIKit = (location, message) => {
  if(location === "SALESFORCE") {
    console.warn("SALESFORCE --> Lightning Container --> Arrived");
    ReactDOM.render( <App env={"salesforce"} user={ message} />,rootElement);
   }
}



LLC.addMessageHandler((salesforceMessage) => {
   clearInterval(retryInit);
   renderUIKit("SALESFORCE", salesforceMessage)
});