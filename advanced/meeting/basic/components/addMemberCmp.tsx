import { type AddMemberCmpProp } from "@plaso-infi/whiteboard-sdk";
import "@plaso-infi/whiteboard-ext-tools/dist/esm/index.css";
import { getAllUsersInfo, getUserInfo } from "../utils/mock";
import React from "react";
import "@plaso-infi/whiteboard-ext-tools/dist/esm/index.css";
import { AddMember } from "./editMeeting/addMember";

export const AddMemberCmp = (props: AddMemberCmpProp) => {
  const { onSubmit, onCancel, curJoiners, listAll, getMeetingLink } = props;
  const userInfo = getUserInfo("user_0");
  return (
    <AddMember
      user={userInfo}
      onSubmit={onSubmit}
      onCancel={onCancel}
      /**
       * getTeamMembersInBoard - 配置白板内所有可邀请成员
       * 仅受邀请的成员能加入会议
       */
      getTeamMembersInBoard={getAllUsersInfo}
      curJoiners={curJoiners}
      listAll={listAll}
      getMeetingLink={getMeetingLink}
    />
  );
};
