import React, { useEffect } from "react";
import {
  getInfiWebsdkQuery,
  type WebsdkQueryParams,
  type TeamMemberInfo,
} from "@plaso-infi/whiteboard-ext-tools";
import InfiWebSdk, {
  type InfiWebsdkInstanceType,
  GroupTalkPlugin,
  UploadRejectInfo,
} from "@plaso-infi/whiteboard-sdk";
import "@plaso-infi/whiteboard-sdk/dist/cjs/index.css";
import "@plaso-infi/whiteboard-ext-tools/dist/cjs/index.css";
import styles from "./index.module.less";
import { getUsers } from "../utils/mock";

const ReactDemo: React.FC = () => {
  let ins: InfiWebsdkInstanceType;
  let userInfo;
  const devQuerySample: WebsdkQueryParams = {
    /**
     * 画布 id，通常情况下为英飞服务端生成的 uuid，这里使用的是创建 app 后,
     * 英飞服务端自动帮忙创建的一块 Hello World 画布，以方便开发者能仅基于前端
     * 就能访问画布，而不是首先要基于 restful 接口创建画布，记录 recordId，再基于
     * recordId 来生成画布连接参数。
     */
    recordId: "HelloWorld",
    // 您注册的应用 appId
    appId: "APP_ID_HERE",
    // 您注册的应用 appSecret，注：此字段为敏感信息，请尽量不要放在前端项目中
    appKey: "APP_SECRET_HERE",
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

  const onUploadFailed = async (info: UploadRejectInfo) => {
    const { message } = info;
    alert(message);
  };
  const setup = async () => {
    const container = document.getElementById("root") as HTMLDivElement;

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

  const init = async () => {
    await initUser();
    setup();
  };

  useEffect(() => {
    init();
  }, []);

  return <div id="root"></div>;
};

export default ReactDemo;
