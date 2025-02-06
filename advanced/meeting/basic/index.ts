import { getInfiWebsdkQuery } from "@plaso-infi/whiteboard-ext-tools";
import InfiWebSdk from "@plaso-infi/whiteboard-sdk";
// 需要引入画布样式文件，此文件有做类命名 scoped 处理，所以不用担心样式类名冲突
import "@plaso-infi/whiteboard-sdk/dist/esm/index.css";
import { getUserInfo, getUsersInfo } from "./utils/mock";
import { EditMeetingCmp } from "./components/editMeetingCmp";
import { InviteMeetingCmp } from "./components/inviteMeetingUserCmp";

/**
 * 选择一个账号并模拟登陆
 * user_0: 画布创建者
 * user_1: 画布编辑者
 * user_2: 画布访客
 * 其他loginName: 未知画布访客
 */
const defaultLoginName = "user_1";

/**
 * 开发者中心-控制台提供生成画布连接参数的工具
 * 工具拼接了必要的参数供开发者快速体验画布功能
 */
let searchString = new URLSearchParams(window.location.search);
const loginName = searchString.get("loginName") || defaultLoginName;

sessionStorage.setItem("SDK_USER", JSON.stringify(getUserInfo(loginName)));

/**
 * 从链接中获取会议id信息
 */
const autoJoinMeetingId = searchString.get("meetingId") ?? undefined;

// 画布连接参数数据示例，仅作 demo 演示
const devQuerySample = {
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
  // 画布访问用户的用户 ID，由开发者自行定义，同样的 loginName 在同一块画布内，会被人为是同一名用户
  // 在创建快速会议时， userName 会被显示在会议标题中， 不会影响体验画布
  // userType 为访客时，无法正常创建会议
  loginName,
  userName: getUserInfo(loginName).userName,
  userType: getUserInfo(loginName).userType,
};

/**
 * 通常 getQuery 函数是需要请求您的服务端来获取画布, 在这个demo中，
 * 借助  @plaso-infi/whiteboard-ext-tools 的协助，在前端快速生成画布连接参数
 * **注：**
 * 非常不推荐在前端生成画布连接参数，因为这样做就意味着前端会获取到 appSecret,
 * 出于安全考虑，应该尽可能确保 appSecret 不会于网络上传输
 */
const getQuery = async () => {
  /**
   * meetingId参数仅作为会议邀请链接标识
   * - 会议邀请链接功能仅作为参考
   **/
  searchString.delete("meetingId");
  // 优先解析url内的searchParams
  const queryString = Promise.resolve(
    searchString.toString() || getInfiWebsdkQuery(devQuerySample)
  );
  return queryString;
};

window.onload = async () => {
  // 获取画布容器 dom
  const container = document.getElementById("board-app") as HTMLDivElement;
  // 初始化画布实例
  const initRes = await InfiWebSdk.getSdkInstance({
    getQueryString: getQuery,
    /**
     * 给入画布用户的信息，包括用户ID loginName，与用户名称 userName。
     * 对于不同用户，loginName 应尽可能保证不同，而 userName 则只会影响显示
     */
    userInfo: getUserInfo(loginName),
    /** 给入画布即将挂在的 DOM 节点 */
    containerDom: container,
    /**
     * 画布用来根据用户 loginName 读取远端用户数据，并用户本地显示的函数
     */
    getUsersInfo: getUsersInfo,
    /**
     * 配置画布的工具栏显隐，启用或关闭工具栏的功能
     */
    toolbarWidgetsConfigs: {
      /** 在工具栏打开会议功能入口 */
      meeting: true,
    },
    /**
     * 配置会议参数
     */
    meetingConfigs: {
      /** 是否可以发起会议，访客无法正常创建会议 */
      couldCreateMeeting: getUserInfo(loginName).userType !== "visitor",
      /** 是否能在会议中查看成员列表，及是否可以直接添加参会人员 */
      couldCheckMemberList: true,
      /** 预定/编辑会议时调整参数的组件 */
      EditMeetingCmp: EditMeetingCmp,
      /** 会议邀请组件 */
      InviteMemberCmp: InviteMeetingCmp,
      /** 直接进入会议 */
      autoJoinId: autoJoinMeetingId,
    },
  });
  /**
   * 检查画布初始化的结果：
   * - code 为 0 时，表示初始化成功，此时 payload 为 Web SDK 实例对象
   * - code 不为 0 时，表示初始化失败，此时 payload 为错误消息提示字符串
   */
  const { code, payload } = initRes;
  console.log(code, payload);
};
