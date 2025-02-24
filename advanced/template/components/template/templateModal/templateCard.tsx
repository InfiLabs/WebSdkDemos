import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.less";
import { Button, Typography } from "antd";
import { CardWithImage, CardWithImageRef } from "../card";
import classNames from "classnames";
import { isChild } from "../../../utils/dom";
import { TemplateDataT } from "@plaso-infi/whiteboard-sdk";

export function TemplateCard(props: {
  data: TemplateDataT;
  index: number;
  config: { width?: number };
  onSelect?: (template: TemplateDataT) => void;
  onPreview?: (template: TemplateDataT) => void;
}) {
  const { data, config, onSelect, onPreview } = props;

  const [overCard, setOverCard] = useState<TemplateDataT>();
  const cardImageRef = useRef<CardWithImageRef>(null);

  const renderExtraDom = (show: boolean) => (
    <div className={classNames(styles.cardFooter, show && styles.overCard)}>
      <Button onClick={() => onPreview?.(data)} className={styles.previewBtn}>
        预览
      </Button>
      <Button type="primary" onClick={() => onSelect?.(data)}>
        使用
      </Button>
    </div>
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!cardImageRef.current?.image.current) return;
      const element = e.target as HTMLElement;
      if (!isChild(cardImageRef.current?.image.current, element)) {
        setOverCard(undefined);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <CardWithImage
      ref={cardImageRef}
      image={{
        url: data.coverImg,
        className: styles.cover,
        onPointerEnter: () => {
          setOverCard(data);
        },
        onPointerLeave: () => {
          setOverCard(undefined);
        },
        onClick: () => {
          // 触屏情况
          setOverCard(data);
        },
        extraDom: renderExtraDom(data.templateId === overCard?.templateId),
      }}
      width={config.width}
      renderInfo={() => {
        return (
          <div className={styles.info}>
            <div className={styles.title}>
              <Typography.Text
                ellipsis={{ tooltip: true }}
                style={{ flex: 1, lineHeight: "22px" }}
              >
                {data.templateName}
              </Typography.Text>
            </div>
            <div className={styles.subtitle}>
              <span className={styles.ellipsis}>{data.creatorName}</span>
            </div>
          </div>
        );
      }}
    />
  );
}
