import { type AddMemberCmpProp } from "@plaso-infi/whiteboard-sdk";
import { AddMember, TeamMemberInfo } from "@plaso-infi/whiteboard-ext-tools";
import { getAllUsersInfo } from "../utils/mock";
import "@plaso-infi/whiteboard-ext-tools/dist/esm/index.css";
import React from "react";

export const AddMemberCmp = (props: AddMemberCmpProp) => {
  const { onSubmit, onCancel, curJoiners, listAll, getMeetingLink } = props;
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  ) as TeamMemberInfo;
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
