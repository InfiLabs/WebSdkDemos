import React, { useRef } from "react";
import styles from "./style.module.less";
import { FullScreenButton } from "../../fullScreenBtn";
import { ImageInspector, ImageInspectorRefType } from "../../imageInspector";
import { SvgIcon } from "../../svgIcon";
import { TemplateDataT } from "@plaso-infi/whiteboard-sdk";

export function PreviewImage(props: {
  data: {
    imgSrc?: string;
    name: string;
    width: number;
    height: number;
    svgText?: string;
  };
  switchPreview?: (data?: TemplateDataT) => void;
  onSelect?: (template: TemplateDataT) => void;
}) {
  const { data } = props;
  const previewRef = useRef<ImageInspectorRefType>(null);
  const previewDom = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.previewImageContainer} ref={previewDom}>
      <ImageInspector
        ref={previewRef}
        imgMeta={data}
        showHeader={false}
        backgroundColor={"#f2f2f2"}
      />
      <div className={styles.previewControl}>
        <span className={styles.control}>
          <SvgIcon
            icon="icon_jia"
            onClick={() => previewRef.current?.zoomIn()}
          />
        </span>
        <span className={styles.control}>
          <SvgIcon
            icon="icon_jian"
            onClick={() => previewRef.current?.zoomOut()}
          />
        </span>
        <span className={styles.control}>
          <FullScreenButton domRef={previewDom} />
        </span>
      </div>
    </div>
  );
}
