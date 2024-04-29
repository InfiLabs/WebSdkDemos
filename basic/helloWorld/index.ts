import { getInfiWebsdkQuery } from "@plaso-infi/whiteboard-ext-tools";
import InfiWebSdk from "@plaso-infi/whiteboard-sdk";
// 需要引入画布样式文件，此文件有做类命名 scoped 处理，所以不用担心样式名称冲突
import "@plaso-infi/whiteboard-sdk/dist/cjs/index.css";

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
  appId: "YOUR_APP_ID_HERE",
  // 您注册的应用 appSecret，注：强烈推荐不要放在前端项目中
  appKey: "YOUR_APP_SECRET_HERE",
  // 画布访问用户的用户 ID，由开发者自行定义，同样的 loginName 在同一块画布内，会被人为是同一名用户
  loginName: "user_0",
};

/**
 * 通常 getQuery 函数是需要请求您的服务端来获取画布, 在这个demo中，
 * 借助  @plaso-infi/whiteboard-ext-tools 的协助，在前端快速生成画布连接参数
 * **注：**
 * 非常不推荐在前端生成画布连接参数，因为这样做就意味着前端会获取到 appSecret,
 * 出于安全考虑，应该尽可能确保 appSecret 不会于网络上传输
 */
const getQuery = async () =>
  Promise.resolve(getInfiWebsdkQuery(devQuerySample));

window.onload = async () => {
  // 获取画布容器 dom
  const container = document.getElementById("board-app") as HTMLDivElement;
  // 初始化画布实例
  const initPromise = await InfiWebSdk.getSdkInstance({
    getQueryString: getQuery,
    /**
     * 给入画布用户的信息，包括用户ID loginName，与用户名称 userName。
     * 对于不同用户，loginName 应尽可能保证不同，而 userName 则只会影响显示
     */
    userInfo: {
      loginName: "user_0",
      userName: "User 0",
    },
    /** 给入画布即将挂在的 DOM 节点 */
    containerDom: container,
    /**
     * 画布用来根据用户 loginName 读取远端用户数据，并用户本地显示的函数，
     * 因为当前是单人使用画布 demo，故传入空函数即可
     */
    getUsersInfo: async () => [],
  });
  /**
   * 检查画布初始化的结果：
   * - code 为 0 时，表示初始化成功，此时 payload 为 Web SDK 实例对象
   * - code 不为 0 时，表示初始化失败，此时 payload 为错误消息提示字符串
   */
  const { code, payload } = initPromise;
  if (code) {
    /** 打印初始化错误消息 */
    console.error(payload);
    return;
  }
  /** 初始化成功 */
  console.log(code, payload);
};
