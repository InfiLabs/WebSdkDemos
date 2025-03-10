import React, { useEffect, useState } from "react";
import {
  checkFullScreen,
  exitFullScreen,
  fullscreenElement,
} from "../../utils/dom";
import { SvgIcon } from "../svgIcon";

/** 全屏按键 */
export const FullScreenButton: React.FC<{
  domRef: React.RefObject<HTMLElement>;
}> = ({ domRef }) => {
  const [fs, setFs] = useState(false);

  const handleChange = () => {
    setFs(checkFullScreen());
  };

  const onChangeFs = (on: boolean) => {
    if (on) {
      domRef.current && fullscreenElement(domRef.current);
    } else {
      exitFullScreen();
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("mozfullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    document.addEventListener("msfullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("mozfullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
      document.removeEventListener("msfullscreenchange", handleChange);
    };
  }, []);

  return fs ? (
    <SvgIcon icon="icon_tuichuquanping" onClick={() => onChangeFs(false)} />
  ) : (
    <SvgIcon icon="icon_quanping" onClick={() => onChangeFs(true)} />
  );
};
