import LLC from "lightning-container";

export const tabFocused = (function () {
  var stateKey,
    eventKey,
    keys = {
      hidden: "visibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      msHidden: "msvisibilitychange"
    };
  for (stateKey in keys) {
    if (stateKey in document) {
      eventKey = keys[stateKey];
      break;
    }
  }
  return function (c) {
    if (c) document.addEventListener(eventKey, c);
    return !document[stateKey];
  };
})();

const resetUnreadMessageCountInSalesforceBottomBar = () => {
  const eventMessage = {
    event: "NEWMESSAGE",
    unreadCount: 0
  };
  LLC.sendMessage(eventMessage);
};

tabFocused(() => {
  if (tabFocused()) {
    console.log("Sendbird tab gained focus! Reset message count");
    resetUnreadMessageCountInSalesforceBottomBar();
  } else {
    console.log("Sendbird Lost focus");
  }
});

window.addEventListener(
  "focus",
  function (event) {
    console.log("Sendbird window gained focus! Reset message count");
    resetUnreadMessageCountInSalesforceBottomBar();
  },
  false
);
