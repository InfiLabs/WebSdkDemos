import * as React$1 from 'react';
import React__default, { FC, CSSProperties } from 'react';

type PositionLike = {
    x: number;
    y: number;
};
type Viewbox = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    scale: number;
};
type ViewRect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
type BorderBox = Omit<Viewbox, 'scale'>;

type eventHandler<E> = (evt: E) => void;
interface EventManagerT<ET = any> {
    subscribe<T extends keyof ET>(topic: T, cb: eventHandler<ET[T]>): CB;
    once<T extends keyof ET>(topic: T, cb: eventHandler<ET[T]>): CB;
    publish<T extends keyof ET>(topic: T, evt: ET[T]): void;
}

type DocumentType = 'ppt' | 'pdf' | 'excel' | 'word';
type FileType = 'image' | 'document' | 'video' | 'audio';

type WebsdkEngineType = {
    customFoldableTools?: SdkPluginSlotType[];
    customBottomRightTools?: SdkBottomRightPluginSlotType[];
};
type ComponentProps = {
    iconClassName?: string;
};
/**
 *  提供给外部放置右下方自定义工具的插件，可参考该声明书写你的代码
 */
type SdkBottomRightPluginSlotType = {
    /** 插件 key，需要保证唯一 */
    key: string;
    /** 插件名称，会给予 hover tooltip 展示字段名，不存在则不展示 */
    name?: string;
    /** 图标，可以是自定义组件也可以是画布提供的 svg  */
    icon: string | FC<ComponentProps>;
    /** 点击行为 */
    onClick?: CB;
    /** 类名 */
    className?: string;
    /** 样式 */
    style?: CSSProperties;
};
/** 在使用画布插件提供给外部的插件 UI 容器，如果需要插件在画布右上方出现功能入口，可以参考本类型声明来书写你的插件代码 */
type SdkPluginSlotType = {
    /** 画布 svg 通用使用规范名称 */
    icon: string;
    /** 插件名称，会给予 hover tooltip 展示字段名 */
    name: string;
    /** 插件 key，需要保证唯一 */
    key: string;
    /**
     * 可以基于画布自带的 popup 面板进行插件内容的承载；在给入这个配置组件后，
     * 在画布点击插件入口时，会自动弹出 popup 来承载这个配置组件
     */
    SubWinContent?: React.FC<{
        closeSubWin: CB;
    } & any>;
};
interface InfiSdkPluginType {
    pluginId: string;
    /** 插件初始化逻辑，可以选择在这里加载 SdkPluginSlotType 来在画布右上角显示你的插件  */
    init(config?: GroupTalkConfig | undefined): void;
    /** 插件销毁逻辑，该方法在画布销毁时会被自动执行 */
    destroy(): void;
}
interface ISdkPluginConstructor {
    new (websdkEngine: WebsdkEngineType): InfiSdkPluginType;
}
type InfiWebSdkPlugin = {
    pluginConstructor: ISdkPluginConstructor;
    beforeInit?: (plugin: InfiSdkPluginType) => void;
    /** 当前仅官方 Plugin 可用，详情请参考官方插件文档 */
    config?: GroupTalkConfig | undefined;
};

type ToolBarType = 'sticker' | 'template' | 'shapes' | 'upload' | 'stickyNote' | 'draw' | 'frame' | 'connectLine' | 'table' | 'timer' | 'mindMap' | 'text' | 'comment' | 'webpage' | 'kanban';
interface InfiUserInfoT {
    loginName: string;
    userName: string;
    avatarUrl?: string;
}
type PreDownloadInfo = any;
type DownloadConfigT = {
    enable: boolean;
    fileEnable?: boolean;
    imageEnable?: boolean;
    preCheck?: (event: string) => Promise<PreDownloadInfo>;
};
type FullToolBarWidgetsConfigs = {
    meeting: boolean;
    boardMemberList: boolean;
    cursor: boolean;
    frameListBar: boolean;
    timer?: boolean;
    laser?: boolean;
    ai: boolean;
    miniMap: boolean;
    fullscreen: boolean;
    helpCenter: boolean;
    search: boolean;
    download: boolean;
    optionBarVisible?: boolean;
    floatBarVisible?: boolean;
    titleBarVisible?: boolean;
    toolBarVisible?: boolean;
    bottomLeftBarVisible?: boolean;
    bottomRightBarVisible?: boolean;
    toolbarConfig?: Partial<Record<ToolBarType, boolean>>;
};
type HistoryType = 'browser' | 'hash';
type RouteConfigT = {
    /** 设置路由history的类型（默认为browser）*/
    historyType: HistoryType;
    /** 路由中指定标识画布唯一性的字段，用于判断是否是跳转至本画布内的其他元素*/
    boardCompositeKey?: string[];
};
type ToolBarWidgetsConfigsT = Partial<FullToolBarWidgetsConfigs>;
type CanUploadInfo = {
    canUpload: boolean;
    reason?: string;
};
declare enum UploadFailedCode {
    EXCEEDS_STORAGE_LIMIT = 1
}
type UploadRejectInfo = {
    code: UploadFailedCode;
    message?: string;
};
/** 获取白板 websdk 实例的配置参数  */
interface GetSdkInstanceConfigs {
    /** 当前白板的用户信息 */
    userInfo: InfiUserInfoT;
    editable?: boolean;
    /** 用以挂载白板 DOM 的 HTML DOM 元素, 白板相关元素会自动 appendChild 至这个元素之内 */
    containerDom: HTMLDivElement;
    /** 是否应用上一次用户偏好（背景设置、工具栏顺序、视野、颜料色板） */
    preferenceConfigs?: object;
    /** 画布天然提供若干 UI 插槽，分别位于画布页面的左上角与右上角，目前仅支持基于 React 实现 */
    uiSlots?: {
        /**
         * 画布左上角的标题栏插槽，React 组件 maxHeight 为 48px; 与画布自带的搜索、下载等 UI 毗邻
         * 通常可以用于展示 logo 或呈现 “返回” 按键等。
         */
        titleSlot?: (w?: number, cb?: (w: number) => void) => React.ReactNode;
        /**
         * 画布右上角的 UI 插槽，React 组件 maxHeight 为 48px; 与画布自身的在线成员展示等 UI 毗邻
         */
        topRightSlot?: React.ReactNode;
    };
    /** 画布初始化后默认的行为 */
    defaultBehaviors?: {
        /** 默认显示帧框列表 */
        showFrameList?: boolean;
        /** 默认进入帧框播放模式 */
        presentationMode?: boolean;
        /** 默认启用激光笔 */
        laserMode?: boolean;
        /** 默认的画布网格设置，会被用户自己的使用习惯数据覆盖 */
        defaultGrid?: GridType;
        /**
         * 画布内默认画笔偏好，包括颜色、粗细、不透明度等
         * @param lineColor 画布颜色，Hex 数值，e.g. 0xff0000
         * @param lineWidth 画笔粗细 [0, 30] 之间
         * @param lineOpacity 马克笔不透明度 [0.1, 1]
         * 注：
         * - 请确保设置的颜色是画布默认颜色，包括：0xffffff, 0xfef445, 0xfac710, 0xf24726, 0xe6e6e6, 0xcee741, 0x8fd14f, 0xda0063,
         *   0x808080, 0x12cdd4, 0x0ca789, 0x9510ac, 0x1a1a1a, 0x2d9bf0, 0x414bb2, 0x652cb3
         * - pen 及 mark 的默认配置数组长度应 <= 3。
         * - 手机或大屏模式下，仅第一个配置有效。
         *
         * **TODO: 后续会增加配置项以控制：默认画笔样式是否会被 websdk 用户自己的画笔使用行为记录覆盖**
         **/
        defaultDrawStyles?: {
            pen?: {
                lineColor?: number;
                lineWidth?: number;
            }[];
            mark?: {
                lineColor?: number;
                lineWidth?: number;
                lineOpacity?: number;
            }[];
        };
    };
    /** 进入画布时，如果给入该值，则会向 x:0, y:0 处插入模板内容，并尝试移动视野至该位置 */
    initTemplate?: string | {
        templateId: string;
        select?: boolean;
        show?: boolean;
    };
    customizeUploaders?: CustomizeUploader;
    /**
     * 画布内各项功能开关：可以显示/隐藏部分功能的 UI 入口
     * - toolbarConfig:用于配置左侧工具栏中显示的工具，不配置时显示默认工具
     */
    toolbarWidgetsConfigs?: ToolBarWidgetsConfigsT;
    /**
     * 文件下载配置，enable表示文件下载功能是否开启，preCheck用于获取自定义的文件下载签名
     */
    downloadConfig?: DownloadConfigT;
    /**
     * 文件上传配置
     */
    uploadConfig?: {
        /** 是否启用动态ppt */
        enableDynamicPPT?: boolean;
    };
    /** 向画布内注入拆件能力，插件可以在画布内部显示， */
    plugins?: InfiWebSdkPlugin[];
    /**
     * @deprecated 画布环境配置；因画布 websdk 处于早期试用阶段，
     * 尚提供可以切换不同的画布侧环境的配置项入口。后期会移除该配置项，websdk 仅能使用线上环境
     */
    env?: 'prod' | 'dev' | 'test';
    /**
     * 路由配置，包括设置路由history的类型（默认为browser）、标识画布唯一性的search联合字段（默认为所有search字段）等
     */
    routeConfig?: RouteConfigT;
    /**
     * 显示模式设置，请在画布初始化时设置, 默认为 normal 模式
     * - bigScreen: 大屏模式，主要聚焦于画布批注场景
     * - phone: 手机模式，工具栏显示更加紧凑
     * - normal: 常规模式，PC、Laptop、PAD 上推荐使用本模式
     */
    displayMode?: 'bigScreen' | 'normal' | 'phone';
    meetingConfigs?: MeetingConfigs;
    getElementLink?: (encodeId: string, id: string) => string;
    /** 链接跳转，返回值为string表示跳转元素id */
    gotoLink?: (link: string) => string | undefined;
    /** 获取画布连接参数的请求函数，画布连接参数为初始化 & 链接服务器使用的加密字符串, 内含应用、白板、用户等信息 */
    getQueryString: () => Promise<string>;
    /** 获取AI 鉴权所必要参数 boardId, userId, appid, ts, sign, key */
    getAiCheckInfo?: () => Promise<AiCheckInfo>;
    /**
     * 启用画布影子链接能力，影子链接会额外建立一条链接，用以将其他 recordId 对应画布内的内容同步到当前的画布中
     * 但需要注意的是，通过影子链接同步过来的元素全部都都处于静止状态，无法选中，无法编辑，但是可以进行文档翻页等
     * 非常基本的交互
     */
    getShadowBoardQuery?: () => Promise<string>;
    /** 基于 loginName 获取该用户的用户名与头像 url 的方法，由用户提供，方法返回的用户信息用以于白板内作展示 */
    getUsersInfo: (loginNames: string[]) => Promise<InfiUserInfoT[]>;
    /** 上传文件出错时的回调 */
    onUploadFailed?: (info: UploadRejectInfo) => void;
}
type CustomizeUploader = {
    loaders: {
        icon: string;
        mainText: string;
        desc: string;
        key: string;
    }[];
    onUploadTrigger: (key: string, closeContainerCB: CB) => unknown;
    onCloseUpload: () => void;
};
/**
 * 获取白板sdk对象方法的返回值类型，值为对象形式
 * * 对象内 code 值如果为 0, 则表示白板初始化参数验证完毕， payload 为 websdk 的对象实例
 * * 对象内 code 如果不为 0, 则表示白板初始化失败，payload 为错误提示消息
 */
type GetSdkInstanceReturnType = Promise<{
    code: 0;
    payload: InfiWebsdkInstanceType;
} | {
    code: 1;
    payload: string;
}>;
interface AiCheckInfo {
    /** AI操作次数 */
    inPackageRemain: number;
    /** 其他来源AI操作次数，比如团队购买次数 */
    outPackageRemain: number;
    /** 鉴权信息,boardId,userId,appid,ts,sign,key,modal?,event? */
    extraInfo: AiCheckExtraInfo | {
        [x: string]: unknown;
    };
}
type AiCheckExtraInfo = {
    /**
     * 应用 ID，可于开发者门户/应用管理中查看 appId。使用白板 sdk 的必要参数之一。如若错误则不能使用白板
     *
     * **注：**
     * 此信息为敏感信息，请尽量不要写在前端项目中
     */
    appId: string;
    /** 登入的用户 ID，同一 userId，画布侧会视为同一个用户 */
    userId: string;
    /** 白板 ID，用于唯一标识画布  */
    boardId: string;
    /** 当前时间戳。*/
    ts: number;
    /** 16 位 uuid，用于标识本次操作 */
    key: string;
    /**
     * 通过加密算法加密的 AI 鉴权所需参数
     *
     * **注：**
     * 请尽量让服务端生成该参数，在前端代码中生成该参数相当于直接暴露了加密算法
     **/
    sign: string;
    /** 事件类型，AI 鉴权场景就是默认值 'ai' */
    event: string;
    /** 大数据模型，当前默认值 wenxin' */
    model: string;
};

declare class UserPreferenceManager {
    websdkIns: InternalWebSdkInsT;
    userPreference: PreferencesType;
    preferenceConfigs?: object;
    private userLevel;
    private boardLevel;
    constructor(websdkIns: InternalWebSdkInsT);
    /**
     * 初始化用户偏好数据
     */
    initUserPreferences(preferenceConfigs?: object): Promise<void>;
    /**
     * 设置用户偏好
     * @param userPreference
     * @param needRefresh
     */
    setUserPreferences(userPreference: PreferencesType, needRefresh?: boolean): Promise<void>;
    private isEqualPreference;
    /**
     * 偏好数据同步
     * @returns
     */
    syncData(old?: PreferencesType, now?: PreferencesType, isForce?: boolean, updateView?: boolean): Promise<void>;
}

declare const FULL_TOOLBAR_CONFIG: Record<ToolBarType, boolean>;

declare enum STATUS_CODE {
    /** 成功 */
    OK = 0
}
declare enum STATUS_CODE {
    /** 应用被禁用 */
    APP_DISABLED = 30002
}

declare enum GridType {
    NONE = 0,
    LINE = 1,
    DOT = 2
}
type PreferencesType = Partial<{
    gridType: GridType;
    palette: number[];
    toolBar: string[];
    toolBox: string[];
    view: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}>;
type ElementMetaData = {
    id: string;
    elementType: number;
    position: PositionLike;
    size: {
        width: number;
        height: number;
    };
    scale: number;
};
type InsertImageType = {
    /** 图片文件 */
    file: File;
    /** 屏幕位置 */
    screenPosition?: PositionLike;
    /** 文件大小 */
    size?: {
        width: number;
        height: number;
    };
    /** 是否根据画布比例自动缩放 */
    autoSize?: boolean;
};
/** websdk 实例类型声明接口 */
interface InfiWebsdkInstanceType {
    userPreferenceManager: UserPreferenceManager;
    userPreference: PreferencesType;
    /**
     * 设置是否可以编辑
     * @param couldEdit true: 可编辑; false: 只读
     */
    enableEdit: (couldEdit: boolean) => void;
    /**
     * 变更白板的画布视野
     * @param view 白板绘制区域
     * @param option 变更视野配置项
     * @description
     * - left、right、top、bottom：视野左右上下最小边距
     * - duration：显示变更所需时间，如果填入有效值，则画面会平滑过渡到目标视野, 如果填 0 ，则会立即完成视野变更
     * @returns {Promise<boolean>} 表示视野变更完成,返回值为false表示当前为强制跟随视野状态，无法主动变更视野
     */
    slideToView: (view: ViewRect, option?: {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
        duration?: number;
    }) => Promise<boolean>;
    /**
     * 向白板中插入图片
     * @param url 图片文件url地址
     * @param name 图片文件名称
     */
    insertImage(url: string, name: string): void;
    /**
     * 向白板中插入图片文件
     * @param imageInfo 图片文件信息
     * @return 插入成功后返回元素id
     */
    insertImage(imageInfo: InsertImageType): Promise<string | null | undefined>;
    /**
     * 向白板中插入文档，支持ppt、pdf、excel、word类型
     * @param url 文档文件url地址
     * @param name 文档文件名称
     * @param docType 文档类型, 包括："ppt" | "pdf" | "excel" | "word"
     */
    insertDocument: (url: string, name: string, docType: DocumentType) => void;
    /**
     * 向白板中插入视频
     * @param url 视频文件url地址
     * @param name 视频文件名称
     */
    insertVideo: (url: string, name: string) => void;
    /**
     * 向白板中插入音频
     * @param url 音频文件url
     * @param name 音频文件名称
     */
    insertAudio: (url: string, name: string) => void;
    /** 获取当前白板的画布视野信息 */
    getCurrentViewData: () => Viewbox | undefined;
    /**
     * 启用/关闭演讲者模式
     * @param en 启用/关闭
     */
    enablePresentation: (en?: boolean) => void;
    /**
     * 启用/关闭激光笔
     * @param en 启用/关闭
     */
    enableLaser: (en?: boolean) => void;
    /** 启用/关闭帧框列表 */
    toggleFrameListPanel: () => void;
    /** 唤出历史记录面板 */
    toggleHistoryPanel: () => void;
    /** 修改画板背景 */
    changeGridType: (gridType: GridType) => void;
    /** 设置跳转元素 */
    setAnchorElement: (anchorElement?: string) => void;
    /**
     * 于白板内显示 toast 消息
     * @param message 消息
     * @param duration 显示时长，经过该时长后 toast 消息消失
     * @return Promise fulfill 表示消息已经消失
     */
    showToast: (message: string, duration: number) => Promise<void>;
    /**
     * 注册白板事件监听器
     * TBD： 初期先暴露一些基本事件，比如白板已初始化完毕、白板已销毁完毕等事件
     * @param evtName 事件名
     * @param cb 回调函数
     * @returns 取消注册执行函数
     */
    on: <T extends keyof WebsdkEventTypeMap>(evtName: T, cb: (param: WebsdkEventTypeMap[T]) => void) => () => void;
    /**
     * 取消注册白板事件监听器
     * @param evtName 事件名
     * @param cb 回调函数
     */
    off: <T extends keyof WebsdkEventTypeMap>(evtName: T, cb: (param: WebsdkEventTypeMap[T]) => void) => void;
    /**
     * 基于影子链接能力获取一次其他画布内用户的视野信息
     * 注：使用此能力需要首先启用影子链接能力
     */
    requestShadowUserViewData(loginName: string): Promise<ShadowViewDataT | null>;
    /** 设置画布的可见区域, 区域外的元素全部不可见 */
    setViewClip(rect: ViewRect): void;
    /** 设置画布的聚焦区域，聚焦后，画布的移动和缩放都会在聚焦区域内执行，而不是随意改变 */
    focusBorderBox(box: BorderBox): void;
    /** 停止聚焦画布区域 */
    stopFocusBorderBox(): void;
    /** 获取当前画布中全体元素的元数据信息，包括位置、大小等 */
    getElementsMetaData(): ElementMetaData[] | undefined;
    /**
     * 基于文档元素 id 导出 pdf
     * @description**注: 给入的元素 id 务必是文档类元素的 id （elementType === 8)**
     * 导出的 pdf 文件会携带画布内的编辑信息，如图形、文本、便签等
     * @param {string} [cornerWatermark] 文档元素每页右下角的角标图片 url （非必填）
     */
    exportPdfFromDocElement(id: string, cornerWatermark: string): Promise<void>;
    /**
     * 基于用户信息，强制跟随用户。如果当前已经处于强制跟随其他人员的情况下，则会切换跟随目标
     * @param loginName  用户在画布内的 userId
     * @param connectId  用户当前使用的连接 id，即便是相同 loginName 的用户，在不同的 tab 页中连入相同画布时，connectId 也是不同的
     * @param forceFollowHintMsg 强制跟随情况下，跟随者尝试移动画布视野时弹出的提示消息
     */
    forceFollowUser(config: {
        loginName: string;
        connectId?: string;
        forceFollowHintMsg: string;
    }): void;
    /** 停止当前的强制跟随行为，如果当前并非强制跟随状态，则尝试停止当前的普通跟随行为 */
    stopCurForceFollowing(): void;
    /**
     * 基于 recordId 获取同机构下其他画布内的元素信息，及总体包围盒大小。
     * @returns 如果返回 null，则表示非法访问， 如果 data string 为空字符串，则表示该 recordId 下暂时没有获取到任何数据
     */
    requestElesDataByRecordId: (recordId: string) => Promise<{
        data: string;
        borderBox: BorderBox;
    } | null>;
    /**
     * 基于 requestElesDataByRecord 获取到的元素信息及包围盒大小，将元素插入当前画布内的指定位置
     * @returns true 表成功，false 则表示插入失败，失败原因可能是跨机构使用，或者 eleData 为空或者数据遭到了篡改
     */
    useRawElesData(eleData: string, originBox: BorderBox, targetPos: PositionLike): boolean;
    /** 于指定位置粘贴元素信息, 执行后会自动选中并显示新创建的元素 */
    useElementsInfo(info: any[], position: PositionLike): Promise<void>;
    /** 获取画布 websocket 连接 id */
    getConnectId(): string;
    /** 销毁白板 sdk 实例 */
    destroy: () => Promise<void>;
    /** 开启快捷键 */
    enableShortCut: () => void;
    /** 关闭快捷键 */
    disableShortCut: () => void;
    setUserPreferences: (userPreference: PreferencesType, needRefresh?: boolean) => void;
}
type ShadowViewDataT = {
    viewData?: [number, number, number, number];
};
interface InternalWebSdkInsT extends InfiWebsdkInstanceType {
    init: () => Promise<AuthCheckResult>;
    routeConfig: RouteConfigT;
    configs: GetSdkInstanceConfigs;
    update: () => void;
    anchorElement?: string;
    evtBus: EventManagerT<InnerWebsdkEventTypeMap>;
    getQueryString: () => Promise<string>;
    preCreditCheck: () => Promise<AiCheckInfo>;
    userPreference: PreferencesType;
    setUserPreferences(userPreference: PreferencesType, needRefresh?: boolean): Promise<void>;
    /** 上传文件前回调函数 */
    beforeUpload?: () => Promise<boolean>;
}
type WebsdkEventTypeMap = {
    /** 白板未完成初始化 */
    not_initialized: void;
    /** 已连接至白板服务器 */
    connected: void;
    /** 白板服务器连接中 */
    connecting: void;
    /** 白板服务器连接失败 */
    connect_failed: void;
    /** 白板内部错误 */
    internal_error: void;
    /** 因当前白板未处于连接状态，api 调用无效 */
    api_call_rejected: void;
    /** 白板资源准备完成，可以进行工具操作 */
    resource_ready: void;
    /** 演讲模式状态更新 */
    presentation_change: boolean;
    /** 连接状态更新，上报连接的 loginName，与当前连接的 connectId，可以基于这两个值来跟随用户 */
    connectInfoUpdated: {
        loginName: string;
        connectId: string;
    };
};
type InnerWebsdkEventTypeMap = {
    /** sdk dom状态更新 */
    update_state: undefined;
} & WebsdkEventTypeMap;
/** Infi 白板 websdk 全局对象，引入 min.js 后即会挂载至 window 对象上 */
interface InfiWebSdkType {
    /**
     * 获取白板sdk对象
     * @param getQueryString 白板初始化 & 链接服务器使用的加密字符串, 内涵应用、白板、用户等信息，
     * 推荐于服务端进行生成，当链接重连但是被白板服务器拒绝后，会自动使用 getQueryString 方法生成新的 queryString 并发起重连
     * @param configs 白板初始化所需要的配置参数
     */
    getSdkInstance: (configs: GetSdkInstanceConfigs) => GetSdkInstanceReturnType;
    readonly version: string;
}
type MeetingId = string;
type MeetingJoinerId = string;
declare enum MeetingStatus {
    /** 待开始 */
    PENDING = 0,
    /** 已开始 */
    ON_GOING = 1,
    /** 已结束 */
    ENDED = 2,
    /** 已取消 */
    CANCELED = 3
}
declare enum DefaultForceFollow {
    No = 0,
    Yes = 1
}
declare enum DefaultPerm {
    SameWithSdk = 0,
    Edit = 1,
    Comment = 2,
    View = 3
}
/** 静态会议 interface */
interface StaticMeetingData {
    id: MeetingId;
    title: string;
    host: string;
    planJoiners: MeetingJoinerId[];
    planStart: number;
    planEnd: number;
    status?: MeetingStatus;
    joined?: boolean;
    coHosts: string[];
    openAhead: number;
    defaultForceFollow: DefaultForceFollow;
    defaultPerm: DefaultPerm;
}
type EditMeetingCmpProp = {
    data: StaticMeetingData | null;
    onSubmit: (data: StaticMeetingData) => Promise<void>;
    onFormChanged: (dirty: boolean) => void;
    getCurServerTime: () => number;
};
type AddMemberCmpProp = {
    curJoiners: string[];
    onSubmit: (joiners: string[]) => void;
    onCancel: () => void;
    listAll: boolean;
    getMeetingLink(): void;
};
type MeetingConfigs = {
    /** 是否能在会议中查看成员列表，及是否可以直接添加参会人员 */
    couldCheckMemberList?: boolean;
    /** 是否可以发起会议 */
    couldCreateMeeting?: boolean;
    EditMeetingCmp?: FC<EditMeetingCmpProp>;
    AddMemberCmp?: FC<AddMemberCmpProp>;
};
type GroupTalkConfig = {
    /** 分组讨论默认组数，默认值为 2 */
    defaultGroupsNumber: number;
    /** 分组讨论组数上限， 默认值为 100 */
    maxGroupsNumber: number;
    /** 是否可以创建分组讨论， 默认值为 false */
    canCreateTalk?: boolean;
};
type AuthCheckResult = {
    code: STATUS_CODE;
    message?: string;
};

declare const InfiWebsdk: InfiWebSdkType;

declare const SDKContext: React$1.Context<{
    websdkIns: InternalWebSdkInsT;
}>;

/**
 * 根据文件后缀获取文件类型
 * @param ext
 * @returns
 */
declare function getFileType(ext: string): FileType | undefined;
/**
 * 根据文档后缀获取文档类型
 * @param ext
 * @returns
 */
declare function getDocumentType(ext: string): DocumentType | undefined;

declare const Setting: React__default.FC<{
    showHistory?: boolean;
}>;

type PropT = {
    className?: string;
    style?: React__default.CSSProperties;
    title?: string;
    icon: string;
    onClick?: any;
    [key: string]: any;
};
declare const SvgIcon: React__default.FC<PropT>;

type HoverTipPropsT = {
    content: string;
    placement?: 'top' | 'left' | 'bottom' | 'right' | 'leftBottom';
    /** hoverTip 的样式数据 */
    className?: string;
    rootClass?: string;
    /** 是否允许显示，默认为 true */
    allowShow?: boolean;
    customStyle?: CSSProperties;
    tipContainerStyle?: CSSProperties;
    children: React__default.ReactNode;
};
type HoverTipRefT = {
    rootRef: HTMLDivElement | null;
};
/** 注意：仅在pc端使用 */
declare const HoverTip: React__default.ForwardRefExoticComponent<HoverTipPropsT & React__default.RefAttributes<HoverTipRefT>>;

interface Icon {
    [key: string]: string;
}
declare class SvgManager {
    /**
     * 一般用于在项目初始化的时候统一加载资源，功能跟 add 方法一样
     * 存在的意义是增加语义化
     * @param icons svg 的id和内容的map
     */
    static load(icons: Icon): void;
    /**
     * 批量添加svg资源，如果在当前 svgContainer 发现 id 相等的<symbol>内容会被替换
     * 如果想要全局替换请使用 replace 方法
     * @param icons svg 的id和内容的map
     * @param svgContainer 想要查找替换的svg symbol容器，如果没有传尝试寻找 id 为 plaso-websdk-svg-container 的容器，如果没有找到会 使用 plaso-websdk-svg-container 为 id 创建
     */
    static add(icons: Icon, svgContainer?: SVGElement): void;
    /**
     * 替换当前svg资源中的某些svg内容，没有找到匹配的会被丢弃，如果要添加请调用 add 方法
     * @param icons svg 的id和内容的map
     * @param svgContainer 想要查找替换的svg symbol容器
     * @returns undefined
     */
    static replace(icons: Icon, svgContainer?: SVGElement): void;
    /**
     * 生成 symbol map
     * @param icons icons svg 的id和内容的map
     * @returns Icon
     */
    static createSymbolMap(icons: {
        [type: string]: string;
    }): {};
    static createSgvSymbol(id: string, content: string): string;
    private static _createSvgContainer;
    private static _createDomByHtmlString;
    private static _findBodySvgContainer;
    private static _isSymbol;
}

declare const GroupTalkPlugin: ISdkPluginConstructor;

export { type AddMemberCmpProp, type CanUploadInfo, type ComponentProps, type CustomizeUploader, DefaultPerm, type EditMeetingCmpProp, FULL_TOOLBAR_CONFIG, type GetSdkInstanceConfigs, GridType, type GroupTalkConfig, GroupTalkPlugin, HoverTip, type InfiSdkPluginType, type InfiUserInfoT, type InfiWebSdkPlugin, type InfiWebsdkInstanceType, type MeetingConfigs, SDKContext, type SdkBottomRightPluginSlotType, type SdkPluginSlotType, Setting, SvgIcon, SvgManager, type ToolBarType, type UploadRejectInfo, type WebsdkEngineType, InfiWebsdk as default, getDocumentType, getFileType };
