import React, { useState } from "react";
import "./styles.css";
import LLC from "lightning-container";

import {
  SendBirdProvider,
  ChannelList,
  Channel,
  ChannelSettings
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

import ComponentWithSendBird from "./EventListener";

import { APP_ID } from "./const";

function UIKit(user) {

  console.log(user);

  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);

  if (currentChannelUrl) {
    console.log("Sending channel to Salesforce: ", currentChannelUrl);
    const event = {
      event: "CURRENTCHANNEL",
      channelUrl: currentChannelUrl
    };
    LLC.sendMessage(event);
  }

  return (
    <div className="App" style={{ height: "95vh" }}>
      <SendBirdProvider
        appId={APP_ID}
        userId={user.user.userId}
        nickname={user.user.nickname}
        accessToken={user.user.accessToken}
      >
        <div className="sendbird-app__wrap">
          <ChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
          />
          <div className="sendbird-app__conversation-wrap">
            <Channel
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
            />
          </div>
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <ChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
        <ComponentWithSendBird />
      </SendBirdProvider>
    </div>
  );
}

export default UIKit;
