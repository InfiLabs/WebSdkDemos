import { type Dayjs } from "dayjs";

export type MeetingId = string;
export type MeetingJoinerId = string;
export enum MeetingStatus {
  /** 待开始 */
  PENDING = 0,
  /** 已开始 */
  ON_GOING = 1,
  /** 已结束 */
  ENDED = 2,
  /** 已取消 */
  CANCELED = 3,
}
export enum LockStateEnum {
  No,
  Yes,
}
declare enum DefaultForceFollow {
  No = 0,
  Yes = 1,
}
declare enum DefaultPerm {
  SameWithSdk = 0,
  Edit = 1,
  Comment = 2,
  View = 3,
}

export interface StaticMeetingData {
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
  lockState: LockStateEnum;
  customField: string;
}
export type EditMeetingProps = {
  /** 已预定的会议才存在该属性 */
  data: StaticMeetingData | null;
  onSubmit: (data: StaticMeetingData) => Promise<void>;
  onFormChanged: (dirty: boolean) => void;
  getCurServerTime: () => number;
  getTeamMembersInBoard: () => Promise<TeamMemberInfo[]>;
  preCheckMeetingAccessibility: (
    type?: "fast" | "reserve",
    meetingId?: string,
    teamId?: string
  ) => Promise<boolean>;
  safeDisableShortCut: () => void;
  safeEnableShortCut: () => void;
  user: TeamMemberInfo;
};

export type AddMemberProps = {
  onSubmit: (data: string[]) => void;
  onCancel: () => void;
  getTeamMembersInBoard: () => Promise<TeamMemberInfo[]>;
  curJoiners: string[];
  listAll: boolean;
  getMeetingLink: (() => void) | null;
  user: TeamMemberInfo;
};

export type TimeArgsT = {
  sDate?: Dayjs;
  eDate?: Dayjs;
  sSelectValue?: string;
  eSelectValue?: string;
};

export enum YesOrNo {
  YES = 1,
  NO = 0,
}
export type TeamMemberInfo = {
  userId: string;
  userName: string;
  userAvatarUrl?: string;
};
