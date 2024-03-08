/** 模拟用户数据 */

/** 不同的身份类型 */
export type TUserType = "owner" | "editor" | "visitor";

export type TUserInfo = {
  loginName: string;
  userId: string;
  userName: string;
  userType: TUserType;
};

export const usersInfo: TUserInfo[] = [
  {
    loginName: "user_0",
    userId: "user_0",
    userName: "创建者",
    userType: "owner",
  },
  {
    loginName: "user_1",
    userId: "user_1",
    userName: "编辑者",
    userType: "editor",
  },
  {
    loginName: "user_2",
    userId: "user_2",
    userName: "画布游客",
    userType: "visitor",
  },
];

export function unknownUserInfo(loginName: string): TUserInfo {
  return {
    loginName: loginName,
    userId: `unknown_${loginName}`,
    userName: "未知用户",
    userType: "visitor",
  };
}

/**
 * 根据登录名数组批量获取用户信息
 */
export const getUsersInfo = (loginNames: string[]) =>
  Promise.resolve(
    usersInfo.filter((user) => loginNames.includes(user.loginName))
  );

/**
 * 根据登录名获取用户信息
 */
export const getUserInfo = (loginName: string): TUserInfo =>
  usersInfo.find((user) => user.loginName === loginName) ||
  unknownUserInfo(loginName);

/**
 * 获取全部用户信息
 */
export const getAllUsersInfo = () => Promise.resolve(usersInfo);
