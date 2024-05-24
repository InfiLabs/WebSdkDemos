import InfiWebSdk, {
  VotingPlugin,
  GroupTalkPlugin,
  InfiWebsdkInstanceType,
} from "@plaso-infi/whiteboard-sdk";
import {
  getInfiWebsdkQuery,
  type WebsdkQueryParams,
  TeamMemberInfo,
  getUrlSearchParams,
} from "@plaso-infi/whiteboard-ext-tools";
import { getUsers } from "./utils/mock";
import "@plaso-infi/whiteboard-sdk/dist/esm/index.css";
import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import QrCodeModal from "./components/QrCodeModal/QrCodeModal";

const devQuerySample: WebsdkQueryParams = {
  /**
   * 画布 id，通常情况下为英飞服务端生成的 uuid，这里使用的是创建 app 后,
   * 英飞服务端自动帮忙创建的一块 Hello World 画布，以方便开发者能仅基于前端
   * 就能访问画布，而不是首先要基于 restful 接口创建画布，记录 recordId，再基于
   * recordId 来生成画布连接参数。
   */
  recordId: "HelloWorld",
  // 您注册的应用 appId
  appId: "APPKEY",
  // 您注册的应用 appSecret，注：此字段为敏感信息，请尽量不要放在前端项目中
  appKey: "APP_SECRET",
  loginName: "",
  userType: "editor",
};

const getQuery = async () =>
  Promise.resolve(getInfiWebsdkQuery(devQuerySample));

const initUser = async () => {
  const members: TeamMemberInfo[] = await getUsers();
  userInfo = members[0];
  devQuerySample.loginName = userInfo.userId;
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

const getVoteId = (): string => getUrlSearchParams("voteId");
const getBoardId = (): string => devQuerySample.recordId ?? "";

const getInviteVotingUrl = async (params: {
  voteId: string;
  voteName: string;
  creator: string;
  endTime?: number;
}) => {
  const { voteId, voteName, creator, endTime } = params;
  const url = `${location.href}?boardId=${getBoardId()}&voteId=${voteId}`;
  function getExpirationTime() {
    if (endTime) {
      const str = moment(endTime)
        .format("YYYY-MM-DD HH:mm")
        .replaceAll("-", "/");
      return str;
    }
  }
  const expirationTime = getExpirationTime();
  const copyText = expirationTime
    ? `${creator}发起了【${voteName}】投票，截止时间 ${expirationTime}，点击参与：${url}`
    : "${creator}发起了【${voteName}】投票，点击参与：";
  return copyText;
};
const showVotingQrCode = (params: { voteId: string }) => {
  const modalContainer = document.getElementById(
    "voting-modal-container"
  ) as HTMLDivElement;
  const props = {
    ...params,
    show: true,
    boardId: getBoardId(),
    onClose: () => {
      ReactDOM.unmountComponentAtNode(modalContainer);
    },
  };
  ReactDOM.render(React.createElement(QrCodeModal, props), modalContainer);
  ins?.disableShortCut();
};
const onJoinVoting = (params: { voteId: string; success: boolean }) => {
  console.log("call onJoinVoting", params);
};
const didLeaveVoting = (params: { voteId: string }) => {
  console.log("call didLeaveVoting", params);
};
const handleVotingEnded = (params: { voteId: string }) => {
  console.log("call handleVotingEnded", params);
};

const container = document.getElementById("app") as HTMLDivElement;
let userInfo;
let ins: InfiWebsdkInstanceType;

const setup = async () => {
  const initRes = await InfiWebSdk.getSdkInstance({
    env: "dev",
    getQueryString: getQuery,
    userInfo: {
      loginName: userInfo.userId,
      userName: userInfo.userName,
    },
    containerDom: container,
    plugins: [
      {
        pluginConstructor: GroupTalkPlugin,
        config: {
          defaultGroupsNumber: 2,
          maxGroupsNumber: 50,
          canCreateTalk: true,
        },
      },
      // {
      //   pluginConstructor: Voting,
      //   config: {
      //     autoJoinId: getVoteId(),
      //     canCreateVoting: true,
      //     canEndVoting: true,
      //     getInviteVotingUrl,
      //     showVotingQrCode,
      //     onJoinVoting,
      //     didLeaveVoting,
      //   },
      // },
      {
        pluginConstructor: VotingPlugin,
        config: {
          votingId: getVoteId(),
          canCreate: true,
          canEnd: true,
          canShare: true,
          getInviteUrl: getInviteVotingUrl,
          showQrCode: showVotingQrCode,
          onJoin: onJoinVoting,
          onLeave: didLeaveVoting,
          onEnded: handleVotingEnded,
        },
      },
    ],
    getUsersInfo: async () => [],
    toolbarWidgetsConfigs: {
      titleBarVisible: true,
      optionBarVisible: true,
      floatBarVisible: true,
      fullscreen: false,
      meeting: false,
      ai: false,
      toolbarConfig: {
        sticker: true,
        upload: true,
        stickyNote: true,
        connectLine: true,
        frame: true,
      },
    },

    meetingConfigs: {},
  });

  if (initRes.code) {
    console.error(initRes.payload);
    return;
  }

  ins = initRes.payload;

  ins.on("connected", () => {
    console.log("whiteboard connected");
  });
  ins.on("presentation_change", (value) => {
    console.log(value);
  });
  ins.on("connectInfoUpdated", (v) => console.log("connect info updated", v));
};
window.onload = async () => {
  await initUser();
  setup();
};
