import classnames from "classnames";
import TimePicker from "./selectTime";
import { Form, Input, Button, Select, Avatar, Modal } from "antd";
import styles from "./index.module.less";
import React, { useEffect, useState, useRef, useMemo, type FC } from "react";
import { AddMember } from "./addMember";
import type {
  EditMeetingProps,
  StaticMeetingData,
  TeamMemberInfo,
  TimeArgsT,
} from "./types";
import {
  TIME_PICKER_FORMAT,
  TIME_SELECT_FORMAT,
  DEFAULT_INCREMENT,
  TIME_SELECT_STEP,
} from "./const";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import getTimeGap, { getDefaultColor } from "../../utils/common";
import {
  CloseCircleFilled,
  DownOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";

dayjs.extend(weekday);
dayjs.extend(localeData);

export const EditMeeting: FC<EditMeetingProps> = (props: EditMeetingProps) => {
  const {
    getTeamMembersInBoard,
    preCheckMeetingAccessibility,
    safeDisableShortCut,
    safeEnableShortCut,
    user,
  } = props;
  const initTimeRef = useRef(props.getCurServerTime());
  const [form] = Form.useForm();
  const { Option } = Select;
  const [meetingNameError, setMeetingNameError] = useState<boolean>();
  const [formError, setFormError] = useState(false);

  const [ticker, setTicker] = useState({});
  const groupMembers = useRef<TeamMemberInfo[]>([]);
  const curTimeRef = useRef<any>("");
  const addOneTimeRef = useRef<any>("");
  const addDateRef = useRef<any>();
  const oneDayMs = 24 * 60 * 60 * 1000;

  // 将props.getCurServerTime()的时间对应的select时间向5取整
  useMemo(() => {
    const list = getTimeGap(TIME_SELECT_STEP);
    const initialCurrentTime = dayjs(props.getCurServerTime()).format(
      TIME_SELECT_FORMAT
    );
    const index = list.findIndex((item: string) => item > initialCurrentTime);
    if (index !== -1) {
      curTimeRef.current = list[index];
      const nextIndex = index + 12;
      if (list[nextIndex] !== undefined) {
        addOneTimeRef.current = list[nextIndex];
      } else {
        const diff = list.length - 1 - index;
        addOneTimeRef.current = list[12 - diff];
      }
    } else {
      // 当分钟大于55时，select时间为00:00,设置addDateRef标志位，true时日期需置为当天晚上零点的时间戳
      curTimeRef.current = "00:00";
      addOneTimeRef.current = "01:00";
      addDateRef.current = true;
    }
  }, [!props.data]);

  useEffect(() => {
    const getAllMembers = async () => {
      const res = await getTeamMembersInBoard();
      if (!res) return;
      const filterRes = res.filter((el) => el.userId !== user.userId);
      groupMembers.current = filterRes;
      const selectedList = filterRes.reduce((acc: TeamMemberInfo[], cur) => {
        if ((props.data?.planJoiners ?? []).includes(cur.userId)) {
          return [...acc, cur];
        }
        return acc;
      }, []);
      setShortJoinList(selectedList.slice(0, 6));
      setJoinList(selectedList);
    };
    getAllMembers();
  }, []);

  const { planStart, planEnd } = props.data || {};

  const [timeGapList, setTimeGapList] = useState<string[]>([]);

  const initialStartDate = dayjs(
    planStart
      ? planStart
      : addDateRef.current
      ? Math.floor(props.getCurServerTime() / oneDayMs) * oneDayMs + oneDayMs
      : props.getCurServerTime()
  );

  const initialStartTimeSelectValue = planStart
    ? dayjs(planStart).format(TIME_SELECT_FORMAT)
    : curTimeRef.current;

  const initialEndDate = dayjs(
    planEnd ? planEnd : props.getCurServerTime()
  ).add(1, "hour");

  const initialEndTimeSelectValue = planEnd
    ? dayjs(planEnd).format(TIME_SELECT_FORMAT)
    : addOneTimeRef.current;

  const [startTimeValue, setStartTimeValue] = useState<[dayjs.Dayjs, string]>([
    initialStartDate,
    initialStartTimeSelectValue,
  ]);

  const [endTimeValue, setEndTimeValue] = useState<[dayjs.Dayjs, string]>([
    initialEndDate,
    initialEndTimeSelectValue,
  ]);

  /** 同一天内，开始时间的阈值 */
  const startTimeIndex_threshold =
    timeGapList.length - DEFAULT_INCREMENT / 60 / TIME_SELECT_STEP;

  const oneDayTime = 3600000 * 24;

  const [startTimeError, setStartTimeError] = useState<boolean>();
  const [endTimeError, setEndTimeError] = useState<boolean>();
  const [exceedTimeError, setExceedTimeError] = useState<boolean>();
  const [joinNumVisible, setJoinNumVisible] = useState<boolean>();
  // 参会人总名单
  const [joinList, setJoinList] = useState<TeamMemberInfo[]>([]);
  // 参会人 收起时显示名单
  const [shortJoinList, setShortJoinList] = useState<TeamMemberInfo[]>([]);
  // 参会人 收起展开的状态
  const [isOpenVisible, setIsOpenVisible] = useState<boolean>();
  // 传给二级菜单的参会人id
  const [curJoiners, setCurJoiners] = useState<string[]>([]);
  const [stDropOpen, setStDropOpen] = useState(false);
  const [etDropOpen, setEtDropOpen] = useState(false);
  const stRef = useRef<number>(props.getCurServerTime());
  const edRef = useRef<number>(
    Math.floor(props.getCurServerTime() / oneDayMs) * oneDayMs + oneDayMs
  );

  const inputRef = useRef<any>("");

  /** select开始时间选择的内容 */
  const stChildren = useMemo(() => {
    const startDateTime = startTimeValue[0]
      .format(TIME_PICKER_FORMAT)
      .split(" ")[0];
    const today = new Date();
    const curDay = new Date(startDateTime);
    const isToday =
      curDay.getFullYear() === today.getFullYear() &&
      curDay.getMonth() === today.getMonth() &&
      curDay.getDate() === today.getDate();

    let timeList = timeGapList;
    if (isToday) {
      // 是当天的情况：仅展示当前时刻以后的选项
      const now = dayjs(props.getCurServerTime()).format(TIME_SELECT_FORMAT);
      const idx = timeGapList.findIndex((el: string) => el > now);
      if (now <= timeGapList[timeGapList.length - 1]) {
        timeList = timeList.slice(idx);
      }
      return timeList.map((t) => (
        <Option value={t} key={t}>
          {t}
        </Option>
      ));
    }
    return timeGapList.map((t) => <Option key={t}>{t}</Option>);
  }, [timeGapList.length, form, ticker, startTimeValue]);

  /** select结束时间选择的内容 */
  const edChildren = useMemo(() => {
    let list = timeGapList;
    const startDateTime = startTimeValue[0]
      .format(TIME_PICKER_FORMAT)
      .split(" ")[0];
    const endDateTime = endTimeValue[0]
      .format(TIME_PICKER_FORMAT)
      .split(" ")[0];
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const isSameDay =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDay() === endDate.getDay();
    if (!props.data) {
      if (isSameDay) {
        // 开始时间与结束时间是同一天的情况：仅展示开始时刻以后的选项
        const st = startTimeValue[1];
        const idx = list.findIndex((el: string) => el >= st);
        if (st <= timeGapList[timeGapList.length - 1]) {
          list = list.slice(idx + 1);
        }
      }
    }
    return list.map((t) => <Option key={t}>{t}</Option>);
  }, [timeGapList.length, form, ticker, startTimeValue, endTimeValue]);

  /**
   * 开始时间修改时驱动结束时间的变更
   * @param args 必传其中一个参数
   */
  const onStartTimeChange = (args: {
    startSelectValue?: string;
    startDate?: dayjs.Dayjs;
  }) => {
    const { startSelectValue, startDate } = args;
    const startTimeDate = startDate ?? startTimeValue[0];
    let newEndSelectV = "";
    let newEndDate = startTimeDate;

    const index = timeGapList.findIndex(
      (item) => item === (startSelectValue ?? startTimeValue[1])
    );
    const diff = startTimeIndex_threshold - index;
    if (diff > 0) {
      newEndSelectV =
        timeGapList[index + DEFAULT_INCREMENT / 60 / TIME_SELECT_STEP];
    } else {
      newEndSelectV = timeGapList[-diff];
      newEndDate = dayjs(startTimeDate.valueOf() + oneDayTime);
    }

    return { newEndDate, newEndSelectV };
  };

  const handleStartDateChange = (time: dayjs.Dayjs, timeString: string) => {
    setStartTimeValue(([date, selectV]) => [time, selectV]);
    const { newEndDate, newEndSelectV } = onStartTimeChange({
      startDate: time,
    });
    setEndTimeValue([newEndDate, newEndSelectV]);

    setStartTimeError(false);
    setEndTimeError(false);
    setExceedTimeError(false);
    validateForm({
      sDate: time,
      eDate: newEndDate,
      eSelectValue: newEndSelectV,
    });
  };

  const handleEndDateChange = (time: dayjs.Dayjs, timeString: string) => {
    setEndTimeValue(([date, selectV]) => [time, selectV]);
    setStartTimeError(false);
    setEndTimeError(false);
    setExceedTimeError(false);
    validateForm({ eDate: time });
  };

  const handleStartSelect = (
    value: any,
    option: { children: string; value: string; key: string }
  ) => {
    const selectValue = option.value;
    setStartTimeValue(([date, oldSelectV]) => [date, selectValue]);
    const { newEndDate, newEndSelectV } = onStartTimeChange({
      startSelectValue: selectValue,
    });
    setEndTimeValue([newEndDate, newEndSelectV]);
    setStartTimeError(false);
    setEndTimeError(false);
    setExceedTimeError(false);
    validateForm({
      sSelectValue: selectValue,
      eDate: newEndDate,
      eSelectValue: newEndSelectV,
    });
  };

  const handleEndSelect = (
    value: any,
    option: { children: string; value: string; key: string }
  ) => {
    const selectValue = option.value;
    setEndTimeValue(([date, oldSelectV]) => [date, selectValue]);
    setStartTimeError(false);
    setEndTimeError(false);
    setExceedTimeError(false);
    validateForm({ eSelectValue: selectValue });
  };

  const handleAddMemberOk = (hasSelectList: string[]) => {
    props.onFormChanged(true);
    const selectedList: TeamMemberInfo[] = groupMembers.current.reduce(
      (acc: TeamMemberInfo[], cur: TeamMemberInfo) => {
        if (hasSelectList.includes(cur.userId)) {
          return [...acc, cur];
        }
        return acc;
      },
      []
    );
    // shortJoinList用于参会人列表收起时（也就是hasSelectedList.length > 6时）的固定展示，展示时setShortJoinList(joinList)即可
    setShortJoinList(selectedList.slice(0, 6));
    setJoinList(selectedList);
    setJoinNumVisible(false);
    safeEnableShortCut();
    setIsOpenVisible(false);
  };

  const addJoinNum = () => {
    setJoinNumVisible(true);
    safeDisableShortCut();
    const currentIdList = joinList.map((item: TeamMemberInfo) => item.userId);
    setCurJoiners(currentIdList);
  };

  const handleAddMemberCancel = () => {
    setJoinNumVisible(false);
    safeEnableShortCut();
  };

  const handleOpenOthers = () => {
    if (isOpenVisible) {
      const list = joinList.slice(0, 6);
      setShortJoinList(list);
      setIsOpenVisible(false);
    } else {
      setShortJoinList(joinList);
      setIsOpenVisible(true);
    }
  };

  const deleteItem = (index: number) => {
    props.onFormChanged(true);
    const id = joinList[index].userId;
    const list = joinList.filter((item: TeamMemberInfo) => item.userId !== id);
    const joinIdList = list.map((item: TeamMemberInfo) => item.userId);
    setCurJoiners(joinIdList);
    setJoinList(list);
    if (index < 6 && !isOpenVisible) {
      setShortJoinList(list.slice(0, 6));
    } else {
      setShortJoinList(list);
    }
  };

  const handleReserve = async () => {
    if (validateForm()) return;
    const res = await preCheckMeetingAccessibility("reserve");
    if (!res) return;
    const joinIdList: string[] = [user.userId];
    joinList.forEach((item: TeamMemberInfo) => joinIdList.push(item.userId));
    // 使用set结构去重, 上报联席主持人和参会人的并集
    const attendeeIdSet = new Set([...joinIdList]);
    const attendeeIdList = [...attendeeIdSet];
    if (!formError) {
      const { meetingName } = form.getFieldsValue();
      // 提交给sdk的数据
      props.onSubmit({
        ...(props.data ?? ({} as StaticMeetingData)),
        title: meetingName,
        ...(stRef.current !== null && {
          planStart: stRef.current,
        }),
        ...(edRef.current !== null && {
          planEnd: edRef.current,
        }),
        planJoiners: attendeeIdList,
        coHosts: [],
      });
    }
  };
  useEffect(() => {
    const res = getTimeGap(TIME_SELECT_STEP);
    setTimeGapList(res);
  }, []);

  useEffect(() => {
    !props.data && inputRef.current.focus();
  }, []);

  const toggleStartTimeSelect = (open: boolean) => {
    setStDropOpen(open);
  };

  const toggleEndTimeSelect = (open: boolean) => {
    setEtDropOpen(open);
  };

  /**
   * 会议开始结束时间，每次改动会触发该函数
   * @returns true-有error
   */
  const validateMeetingDuration = (timeArgs: TimeArgsT) => {
    const { sDate, eDate, sSelectValue, eSelectValue } = timeArgs;
    let isDurationErr = false;
    const startDate = (sDate ?? startTimeValue[0])
      .format(TIME_PICKER_FORMAT)
      .split(" ")[0];
    // fix: safari浏览器不认-连接符，需要改成/
    const totalStartTime = (
      startDate +
      " " +
      (sSelectValue ?? startTimeValue[1])
    ).replace(/-/g, "/");
    const start = Date.parse(totalStartTime);

    const endDate = (eDate ?? endTimeValue[0])
      .format(TIME_PICKER_FORMAT)
      .split(" ")[0];
    const totalEndTime = (
      endDate +
      " " +
      (eSelectValue ?? endTimeValue[1])
    ).replace(/-/g, "/");
    const end = Date.parse(totalEndTime);

    if (start <= initTimeRef.current) {
      setEndTimeError(true);
      isDurationErr = true;
    } else {
      stRef.current = start;
      setEndTimeError(false);
    }

    if (start >= end) {
      setStartTimeError(true);
      isDurationErr = true;
    } else {
      edRef.current = end;
      setStartTimeError(false);
    }

    if (end - start > oneDayTime) {
      setExceedTimeError(true);
      isDurationErr = true;
    } else {
      setExceedTimeError(false);
    }
    return isDurationErr;
  };

  /**
   * 表单内容每次改动触发该函数
   * @returns true-有error
   */
  const validateForm = (timeArgs?: TimeArgsT) => {
    setTicker({});
    props.onFormChanged(true);
    let formErr = false;

    const { meetingName } = form.getFieldsValue();
    if (!meetingName) {
      setMeetingNameError(true);
      formErr = true;
    } else {
      setMeetingNameError(false);
      formErr = validateMeetingDuration({ ...timeArgs });
    }
    setFormError(formErr);
    return formErr;
  };
  return (
    <div className={styles.container}>
      <Form.Provider onFormChange={() => validateForm()}>
        <Form
          name="editMeeting"
          form={form}
          layout="vertical"
          className={styles.formPart}
          initialValues={{
            meetingName: props.data?.title ?? `${user.userName}预定的会议`,
          }}
        >
          <Form.Item
            name="meetingName"
            label={<span className={styles.fieldLabel}>会议主题</span>}
            validateStatus={meetingNameError ? "error" : ""}
            help={meetingNameError ? "会议主题不能为空" : ""}
            className={styles.fieldRow}
          >
            <Input
              className={styles.inputPart}
              placeholder="请输入会议主题"
              allowClear
              ref={inputRef}
              autoComplete="off"
            ></Input>
          </Form.Item>

          <Form.Item
            label={<span className={styles.fieldLabel}>开始时间</span>}
            validateStatus={endTimeError ? "error" : ""}
            help={endTimeError ? "开始时间不能早于当前时间" : ""}
            style={{ display: "flex" }}
            className={styles.fieldRow}
          >
            <Form.Item name={["startTime", "timePicker"]} noStyle>
              <TimePicker
                time={startTimeValue[0]}
                handleDateChange={handleStartDateChange}
              />
            </Form.Item>
            <Form.Item name={["startTime", "select"]} noStyle>
              <div className={styles.timeSelect}>
                <Select
                  value={startTimeValue[1]}
                  style={{ width: 100 }}
                  onSelect={handleStartSelect}
                  suffixIcon={null}
                  onDropdownVisibleChange={toggleStartTimeSelect}
                  className={styles.timeSelect}
                >
                  {stChildren}
                </Select>
                <div
                  className={classnames(
                    styles.triangle,
                    stDropOpen && styles.rotate
                  )}
                />
              </div>
            </Form.Item>
          </Form.Item>

          <Form.Item
            label={<span className={styles.fieldLabel}>结束时间</span>}
            validateStatus={startTimeError || exceedTimeError ? "error" : ""}
            help={
              startTimeError
                ? "结束时间不能早于开始时间"
                : exceedTimeError
                ? "会议时长不可超过24小时"
                : ""
            }
            className={styles.fieldRow}
          >
            <Form.Item name={["endTime", "timePicker"]} noStyle>
              <TimePicker
                time={endTimeValue[0]}
                handleDateChange={handleEndDateChange}
              />
            </Form.Item>
            <Form.Item name={["endTime", "select"]} noStyle>
              <div className={styles.timeSelect}>
                <Select
                  value={endTimeValue[1]}
                  style={{ width: 100 }}
                  listHeight={268}
                  onSelect={handleEndSelect}
                  suffixIcon={null}
                  onDropdownVisibleChange={toggleEndTimeSelect}
                >
                  {edChildren}
                </Select>
                <div
                  className={classnames(
                    styles.triangle,
                    etDropOpen && styles.rotate
                  )}
                />
              </div>
            </Form.Item>
          </Form.Item>

          {/* 参会人部分 */}
          <Form.Item
            name="joinNumber"
            label={<span className={styles.fieldLabel}>参会人</span>}
            style={{ marginBottom: "0" }}
          >
            {/* 展示效果由参会人数决定 */}
            <div
              style={{ display: "flex", flexWrap: "wrap", margin: "0 -6px" }}
            >
              {/* 人数小于等于6时 */}
              {joinList.length <= 6 &&
                joinList.map((item: TeamMemberInfo, index: number) => {
                  return (
                    <div className={styles.selectedNumPart} key={item.userId}>
                      <div className={styles.itemNum}>
                        <Avatar
                          className={styles.avatar}
                          size={22}
                          src={item.userAvatarUrl || null}
                          style={{
                            backgroundColor: getDefaultColor(item.userId),
                          }}
                        >
                          {item.userName?.substr(0, 1)}
                        </Avatar>
                        <div className={styles.namePart}>{item.userName}</div>
                        {/* <ALiIconFont
                          type="icon-qingchu"
                          
                        /> */}
                        <CloseCircleFilled
                          className={styles.icon}
                          onClick={() => deleteItem(index)}
                        />
                      </div>
                    </div>
                  );
                })}
              {/* 人数为奇数时，添加参会人样式width变短 */}
              {joinList.length <= 6 &&
                joinList.length > 0 &&
                joinList.length % 2 !== 0 && (
                  <div className={styles.addShortPart} onClick={addJoinNum}>
                    <PlusOutlined className={styles.iconPart} />
                    <div className={styles.textPart}>添加团队成员</div>
                  </div>
                )}
              {/* 人数为偶数时或者人数为0时，添加参会人样式width变长 */}
              {(joinList.length == 0 || joinList.length % 2 === 0) &&
                joinList.length <= 6 && (
                  <div style={{ width: "304px", padding: "0 6px" }}>
                    <div className={styles.addPart} onClick={addJoinNum}>
                      <PlusOutlined className={styles.iconPart} />
                      <div className={styles.textPart}>添加团队成员</div>
                    </div>
                  </div>
                )}

              {/* 人数大于6时需要显示打开和隐藏按钮 */}
              {joinList.length > 6 &&
                shortJoinList.map((item: TeamMemberInfo, index: number) => {
                  return (
                    <div className={styles.selectedNumPart} key={item.userId}>
                      <div className={styles.itemNum}>
                        <Avatar
                          className={styles.avatar}
                          size={22}
                          src={item.userAvatarUrl || null}
                          style={{
                            backgroundColor: getDefaultColor(item.userId),
                          }}
                        >
                          {item.userName?.substr(0, 1)}
                        </Avatar>
                        <div className={styles.namePart}>{item.userName}</div>
                        <CloseCircleFilled
                          className={styles.icon}
                          onClick={() => deleteItem(index)}
                        />
                      </div>
                    </div>
                  );
                })}
              {/* 人数大于6且为奇数时且收起时，添加参会人样式width变短 */}
              {joinList.length > 6 &&
                joinList.length % 2 !== 0 &&
                !isOpenVisible && (
                  <div style={{ display: "flex", margin: "0 4px" }}>
                    <div
                      className={styles.openPart}
                      onClick={() => handleOpenOthers()}
                    >
                      {isOpenVisible ? (
                        <UpOutlined className={styles.icon} />
                      ) : (
                        <DownOutlined className={styles.icon} />
                      )}
                      {isOpenVisible ? "收起" : `共${joinList.length}人`}
                    </div>
                    <div className={styles.addShortPart} onClick={addJoinNum}>
                      <PlusOutlined className={styles.iconPart} />
                      <div className={styles.textPart}>添加团队成员</div>
                    </div>
                  </div>
                )}
              {/* 人数大于6且为奇数时且打开时 */}
              {joinList.length > 6 &&
                joinList.length % 2 !== 0 &&
                isOpenVisible && (
                  <div
                    className={styles.openPart}
                    onClick={() => handleOpenOthers()}
                    style={{ marginLeft: "5px" }}
                  >
                    {isOpenVisible ? (
                      <UpOutlined className={styles.icon} />
                    ) : (
                      <DownOutlined className={styles.icon} />
                    )}
                    {isOpenVisible ? "收起" : `共${joinList.length}人`}
                  </div>
                )}
              {/* 人数大于6且为奇数时且打开时，添加参会人样式width变长 */}
              {joinList.length > 6 &&
                joinList.length % 2 !== 0 &&
                isOpenVisible && (
                  <div
                    className={styles.addPart}
                    onClick={addJoinNum}
                    style={{ marginLeft: "6px" }}
                  >
                    <PlusOutlined className={styles.iconPart} />
                    <div className={styles.textPart}>添加团队成员</div>
                  </div>
                )}
              {joinList.length > 6 && joinList.length % 2 === 0 && (
                <div style={{ display: "flex", margin: "0 4px" }}>
                  <div
                    className={styles.openPart}
                    onClick={() => handleOpenOthers()}
                  >
                    {isOpenVisible ? (
                      <UpOutlined className={styles.icon} />
                    ) : (
                      <DownOutlined className={styles.icon} />
                    )}
                    {isOpenVisible ? "收起" : `共${joinList.length}人`}
                  </div>
                  <div className={styles.addShortPart} onClick={addJoinNum}>
                    <PlusOutlined className={styles.iconPart} />
                    <div className={styles.textPart}>添加团队成员</div>
                  </div>
                </div>
              )}
            </div>
          </Form.Item>
        </Form>
      </Form.Provider>
      <div className={styles.bottomBtnPart}>
        <Button
          type="primary"
          className={classnames(styles.bottomBtn, formError && styles.disabled)}
          onClick={handleReserve}
        >
          {props.data?.id ? "保存" : "预定"}
        </Button>
      </div>
      <Modal
        open={joinNumVisible}
        centered
        closable={false}
        onCancel={handleAddMemberCancel}
        footer={null}
        destroyOnClose
      >
        <AddMember
          user={user}
          onSubmit={handleAddMemberOk}
          onCancel={handleAddMemberCancel}
          curJoiners={curJoiners}
          listAll={true}
          getMeetingLink={null as any}
          getTeamMembersInBoard={getTeamMembersInBoard}
        ></AddMember>
      </Modal>
    </div>
  );
};
