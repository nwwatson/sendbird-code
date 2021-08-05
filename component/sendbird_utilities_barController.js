({
  handleError: function(component, event, helper) {
    var error = event.getParams();
    console.log("Error from Utilities Bar:", error);
  },
  handleMessage: function(component, message, helper) {
    var payload = message.getParams().payload;
    var event = payload.event;
    console.log("MESSAGE ARRIVED IN UTILITIES BAR", message);
    if (payload === "READY") helper.initUIKit(component, message, helper);
    if (event === "NEWMESSAGE")
      helper.newSendbirdUserMessageArrived(component, message, helper);
  }
});