import React from "react";
import type { FC, CSSProperties } from "react";
import "./style.module.less";
import { IconType } from "./type";
import classNames from "classnames";

export const SvgIcon: FC<{
  icon: IconType;
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}> = ({ icon, className, onClick, style }) => {
  return (
    <svg
      className={classNames("icon", className)}
      style={style}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  );
};
