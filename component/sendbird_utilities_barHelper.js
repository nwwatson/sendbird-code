({
  initUIKit: function(component, message, helper) {
    var userId = $A.get("$SObjectType.CurrentUser.Id");
    var message = { userId: userId };
    try {
      component.set("v.toggleSpinner", false);
      component.find("SendBird_Bar").message(message);
      console.warn("SALEFORCE --> Lightning Component --> Sent:", message);
    } catch (err) {
      console.error("Error from Utilities Bar:", err);
    }
  },
  newSendbirdUserMessageArrived: function(component, message, helper) {
    var payload = message.getParams().payload;
    var unreadCount = payload.unreadCount;
    console.warn(
      "Lightning Container --> SALESFORCE --> unread count arrived:",
      unreadCount
    );
    var utilityAPI = component.find("utilitybar");
    console.log(utilityAPI)
    utilityAPI.setUtilityLabel({
      label: "Unread Messages"
    });
    utilityAPI.setUtilityIcon({
      icon: "chat",
      options: { iconVariant: "success", fill: "green" }
    });
  }
});