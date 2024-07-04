import {
  type EditMeetingCmpProp,
  useInfiWebSDK,
} from "@plaso-infi/whiteboard-sdk";
import React, { useEffect } from "react";
import { EditMeeting, TeamMemberInfo } from "@plaso-infi/whiteboard-ext-tools";
import { getAllUsersInfo, getUserInfo } from "../utils/mock";
import "@plaso-infi/whiteboard-sdk/dist/esm/index.css";

export const EditMeetingCmp = (props: EditMeetingCmpProp) => {
  const { data, onSubmit, onFormChanged, getCurServerTime } = props;
  const { disableShortCut, enableShortCut } = useInfiWebSDK();
  const userInfo = getUserInfo("user_0");

  const getTeamMembersInBoard = async () => {
    const members: TeamMemberInfo[] = await getAllUsersInfo();
    return members;
  };
  const preCheckMeetingAccessibility = async (
    type?: "fast" | "reserve",
    meetingId?: string,
    teamId?: string
  ) => {
    return true;
  };
  useEffect(() => {}, []);

  return (
    <EditMeeting
      user={userInfo}
      data={data}
      onSubmit={onSubmit}
      onFormChanged={onFormChanged}
      getCurServerTime={getCurServerTime}
      getTeamMembersInBoard={getTeamMembersInBoard}
      preCheckMeetingAccessibility={preCheckMeetingAccessibility}
      safeDisableShortCut={disableShortCut}
      safeEnableShortCut={enableShortCut}
    />
  );
};
