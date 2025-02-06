import {
  AddMember,
  type TeamMemberInfo,
} from "@plaso-infi/whiteboard-ext-tools";
import { Modal } from "antd";
import React from "react";
import { getAllUsersInfo } from "../utils/mock";

export function AddMemberCmp(props: {
  onClose: () => void;
  getMeetingLink: () => void;
  setJoiners: (loginNames: string[]) => void;
  curJoiners: string[];
  getContainer?: false | HTMLElement;
}) {
  const { curJoiners, onClose, setJoiners, getMeetingLink, getContainer } =
    props;

  const userInfo = JSON.parse(
    sessionStorage.getItem("SDK_USER") || "{}"
  ) as TeamMemberInfo;
  return (
    <Modal
      width={640}
      centered
      destroyOnClose
      footer={null}
      closable={false}
      open={true}
      onCancel={onClose}
      className="addMemberModal"
      getContainer={getContainer}
    >
      <AddMember
        user={userInfo}
        onSubmit={(data) => {
          setJoiners(data);
          onClose();
        }}
        onCancel={onClose}
        /**
         * getTeamMembersInBoard - 配置白板内所有可邀请成员
         * 仅受邀请的成员能加入会议
         */
        getTeamMembersInBoard={getAllUsersInfo}
        curJoiners={curJoiners}
        listAll={false}
        getMeetingLink={getMeetingLink}
      />
    </Modal>
  );
}
