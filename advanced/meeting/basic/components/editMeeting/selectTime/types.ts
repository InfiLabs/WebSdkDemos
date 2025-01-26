import { type Dayjs } from 'dayjs';
import { type ReactNode } from 'react';

export type DateOptionsT = {
  className?: string;
  value?: Dayjs | null;
  defaultValue?: Dayjs;
  format: string;
  allowClear: false;
  inputReadOnly: true;
  disabledDate: (date: any) => boolean;
  disabledTime: (date: any) => {
    disabledHours: () => number[];
    disabledMinutes: () => any;
  };
  onChange: (time: Dayjs, timeString: string) => void;
  placement: 'bottomLeft';
  suffixIcon: ReactNode;
  nextIcon: ReactNode;
  prevIcon: ReactNode;
  popupClassName?: string;
};

export type TimePickerPropsT = {
  time?: Dayjs | null;
  defaultTime?: Dayjs;
  handleDateChange: (time: Dayjs, timeString: string) => void;
};
