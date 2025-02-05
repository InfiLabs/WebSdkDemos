import { MeetingConfigs } from "@plaso-infi/whiteboard-sdk";
import React, { CSSProperties } from "react";
import "@plaso-infi/whiteboard-ext-tools/dist/esm/index.css";
import ReactDOM from "react-dom";
import { AddMemberCmp } from "./addMemberCmp";

const containerStyle: CSSProperties = {
  whiteSpace: "nowrap",
  padding: "0 8px",
};

const itemStyle: CSSProperties = {
  lineHeight: "2em",
  cursor: "pointer",
};

type InviteMeetingCmpProps = MeetingConfigs["InviteMemberCmp"];

export const InviteMeetingCmp: InviteMeetingCmpProps = (props) => {
  const { meetingData, onClose, setJoiners } = props;
  const getMeetingLink = () => {
    let searchString = new URLSearchParams(window.location.search);
    searchString.set("meetingId", meetingData.id);
    return location.origin + location.pathname + "?" + searchString;
  };

  const openAddMemberModal = () => {
    const div = document.createElement("div");
    const root = document.getElementById("board-app");
    root?.appendChild(div);
    /**
     * 您还可以基于 usePortal 和 initPortal 配置，使websdk组件 与 您的项目组件共享React状态，通过useContext等方法传递组件状态
     * 具体请参考 https://developer.infi.cn/docs/websdk/init/intro#useportal
     **/
    ReactDOM.render(
      <AddMemberCmp
        onClose={() => div.remove()}
        getMeetingLink={getMeetingLink}
        setJoiners={setJoiners}
        curJoiners={meetingData.planJoiners}
        getContainer={div}
      />,
      div
    );
    onClose();
  };

  return (
    <div style={containerStyle}>
      <div
        style={itemStyle}
        onClick={() => {
          alert(getMeetingLink());
          onClose();
        }}
      >
        复制邀请链接
      </div>
      <div style={itemStyle} onClick={openAddMemberModal}>
        选择会议成员
      </div>
    </div>
  );
};
