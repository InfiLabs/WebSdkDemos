import InfiWebSdk, {
  GroupTalkPlugin,
  InfiWebsdkInstanceType,
} from '@plaso-infi/whiteboard-sdk';
import {
  getInfiWebsdkQuery,
  type WebsdkQueryParams,
} from '@plaso-infi/whiteboard-ext-tools';
import '@plaso-infi/whiteboard-sdk/dist/esm/index.css';

const userInfo = {
  loginName: '64effe72f80848446b7d5489',
  userName: 'user_0',
};

const devQuerySample: WebsdkQueryParams = {
  /**
   * 画布 id，通常情况下为英飞服务端生成的 uuid，这里使用的是创建 app 后,
   * 英飞服务端自动帮忙创建的一块 Hello World 画布，以方便开发者能仅基于前端
   * 就能访问画布，而不是首先要基于 restful 接口创建画布，记录 recordId，再基于
   * recordId 来生成画布连接参数。
   */
  recordId: 'HelloWorld',
  // 您注册的应用 appId
  appId: 'APPID',
  // 您注册的应用 appSecret，注：此字段为敏感信息，请尽量不要放在前端项目中
  appKey: 'APP_SECRET',
  loginName: userInfo.loginName,
  userType: 'editor',
};

// 获取完整画布连接参数
const getQuery = async () =>
  Promise.resolve(getInfiWebsdkQuery(devQuerySample));

const container = document.getElementById('app') as HTMLDivElement;
let ins: InfiWebsdkInstanceType;

const setup = async () => {
  const initRes = await InfiWebSdk.getSdkInstance({
    getQueryString: getQuery,
    userInfo: userInfo,
    containerDom: container,
    plugins: [
      // 分组讨论插件
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
  });

  if (initRes.code) {
    console.error(initRes.payload);
    return;
  }

  ins = initRes.payload;

  ins.on('connected', () => {
    console.log('whiteboard connected');
  });
  ins.on('presentation_change', (value) => {
    console.log(value);
  });
  ins.on('connectInfoUpdated', (v) => console.log('connect info updated', v));
};
window.onload = async () => {
  setup();
};
