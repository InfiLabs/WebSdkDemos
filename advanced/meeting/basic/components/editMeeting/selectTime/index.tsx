import style from "./index.module.less";
import datePickerStyles from "../datePickerStyles.module.less";
import classnames from "classnames";
import { DatePicker, Typography } from "antd";
import dayjs from "dayjs";
import { TIME_PICKER_FORMAT } from "../const";
import type { DateOptionsT, TimePickerPropsT } from "./types";
import React from "react";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { CalendarOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

dayjs.extend(weekday);
dayjs.extend(localeData);

const TimePicker = (props: TimePickerPropsT) => {
  const { Text } = Typography;

  const range = (start: number, end: number) => {
    const result: number[] = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (date: any) => {
    if (dayjs().isSame(date, "day")) {
      return false;
    }
    return dayjs().isAfter(date, "day");
  };

  const disabledTime = (date: any) => {
    if (dayjs().isSame(date, "day")) {
      const hours = range(0, 24).splice(0, dayjs().hour());
      let minutes: any = [];
      if (dayjs(date).isSame(dayjs(), "hour")) {
        minutes = range(0, 60).splice(0, dayjs().minute());
      }
      return {
        disabledHours: () => hours,
        disabledMinutes: () => minutes,
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
    };
  };

  const dateOptions: DateOptionsT = {
    value: props.time || dayjs(),
    className: style.selectBtn,
    popupClassName: classnames(
      datePickerStyles.datePopup,
      datePickerStyles.datePopupMeeting,
      style.dropdownSelect
    ),
    defaultValue: props.defaultTime,
    format: TIME_PICKER_FORMAT,
    allowClear: false,
    inputReadOnly: true,
    disabledDate,
    disabledTime,
    onChange: props.handleDateChange,
    placement: "bottomLeft",
    suffixIcon: (
      <Text type="secondary" style={{ fontSize: 16 }}>
        <CalendarOutlined className={style.timerIcon} />
      </Text>
    ),
    nextIcon: <RightOutlined style={{ fontSize: "18" }} />,
    prevIcon: <LeftOutlined style={{ fontSize: "18" }} />,
  };
  dateOptions.value;
  // eslint-disable-next-line
  // @ts-ignore
  return <DatePicker {...dateOptions} />;
};

export default TimePicker;
