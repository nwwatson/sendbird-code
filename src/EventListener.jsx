import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash/fp";
import { withSendBird } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import LLC from "lightning-container";

const updateSalesForceWithUnreadMessageCount = (sdk) => {
  sdk.getTotalUnreadMessageCount(function (unreadCount, error) {
    if (error) return;
    console.log("Sending unread count:", unreadCount);
    LLC.sendMessage({ event: "NEWMESSAGE", unreadCount });
  });
};

const MyComponent = (props) => {
  const { sdk } = props;
  const [uniqId, setUniqID] = useState(uuidv4());

  useEffect(() => {
    if (!sdk.ChannelHandler) return;

    try {
      const ChannelHandler = new sdk.ChannelHandler();
      ChannelHandler.onMessageReceived = (channel, message) => {
        console.warn("New Message arrived:", message);
        updateSalesForceWithUnreadMessageCount(sdk);
      };
      sdk.addChannelHandler(uniqId, ChannelHandler);
      setUniqID(uniqId);
      console.warn("created channel event handler withID:", uniqId);
    } catch (error) {
      console.warn("something went wrong in creating handler", error);
    }
    // cleanup for useEffect
    return () => {
      try {
        sdk.removeChannelHandler(uniqId);
        console.warn("removed event handler withID:", uniqId);
      } catch (error) {
        console.warn("something went wrong in removing handler", error);
      }
    };
  }, [sdk]);
  return <div></div>;
  // const userId = _.get("currentUser.userId")(sdk);
  // return <div style={{ position: "fixed", fontSize:"0.6rem"}}>Logged in as {userId}</div>;
};

const sdkSelector = _.compose(_.get("stores.sdkStore.sdk"), _.defaultTo({}));

export default withSendBird(MyComponent, (state) => ({
  sdk: sdkSelector(state)
}));
