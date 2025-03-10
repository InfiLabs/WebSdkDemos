import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.less";
import { Button, Spin } from "antd";
import { getSvgXMLText } from "../../../utils";
import { PreviewImage } from "../previewImage";
import { SvgIcon } from "../../svgIcon";
import { TemplateDataT } from "@plaso-infi/whiteboard-sdk";
export function PreviewTemplate(props: {
  data: TemplateDataT;
  switchPreview?: (data?: TemplateDataT) => void;
  onSelect?: (template: TemplateDataT) => void;
}) {
  const { data, switchPreview, onSelect } = props;
  const previewDom = useRef<HTMLDivElement>(null);
  const [imgSvg, setImgSvg] = useState("");

  const onPreview = async (data?: TemplateDataT) => {
    if (data) {
      const svg = await getSvgXMLText(data?.coverSvg);
      setImgSvg(svg || "");
    } else {
      setImgSvg("");
    }
    switchPreview?.(data);
  };

  useEffect(() => {
    onPreview(data);
  }, []);

  return (
    <div className={styles.templateContent} key={"preview"}>
      <div className={styles.header}>
        <div className={styles.previewHeader} onClick={() => onPreview()}>
          <SvgIcon icon="icon_left" />
          返回模板中心
        </div>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.previewImage} ref={previewDom}>
          {!imgSvg ? (
            <Spin
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ) : (
            <PreviewImage
              data={{
                width: data.width,
                height: data.height,
                svgText: imgSvg,
                name: data.templateName,
              }}
            />
          )}
        </div>
        <div className={styles.rightInfo}>
          <div className={styles.infoTitle}>{data.templateName}</div>

          <div className={styles.infoSubTitle}>{data.creatorName}</div>
          <div className={styles.useBtn}>
            <Button
              size="large"
              type="primary"
              onClick={() => onSelect?.(data)}
            >
              使用模板
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
