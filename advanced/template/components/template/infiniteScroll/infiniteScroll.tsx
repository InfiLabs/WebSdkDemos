import { useEffect, useRef, useState } from "react";
import styles from "./style.module.less";
import { getCardWidth } from "./util";
import React from "react";
import { debounce } from "lodash";
import { useObserveResize } from "./useObserveResize";
import classNames from "classnames";
import { Empty, Spin } from "antd";

type DataType = Record<string, any>;

export type CardContainerProps<T extends DataType = DataType> = {
  pageLoading?: boolean;
  datasource?: T[];
  renderItem: (
    data: T,
    index: number,
    config: { width?: number }
  ) => React.ReactNode;
  onScrollBottom?: () => Promise<void>;
  showEndTipThreshold?: number;
  hasMore?: boolean;
  className?: string;
  flexConfig?: {
    minCardWidth?: number;
  };
};

export function CardContainer<T extends DataType = DataType>(
  props: CardContainerProps<T>
) {
  const {
    pageLoading,
    className,
    datasource = [],
    renderItem,
    flexConfig,
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const calcWidth = debounce(() => {
    if (!rootRef.current) return;
    if (!flexConfig) {
      setWidth(rootRef.current.getBoundingClientRect().width);
    } else {
      const width = getCardWidth(
        flexConfig.minCardWidth || 246,
        rootRef.current.getBoundingClientRect().width,
        16,
        40
      );

      setWidth(width);
    }
  }, 16);

  useEffect(() => {
    calcWidth();
  }, []);

  useObserveResize(rootRef, calcWidth, [pageLoading, datasource]);

  const isEmpty = !datasource.length;

  return (
    <div ref={rootRef} className={classNames(styles.infiniteScroll, className)}>
      {pageLoading ? (
        <Spin
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        <>
          {!isEmpty ? (
            <>
              <div
                className={classNames(
                  styles.container,
                  !!flexConfig && styles.flex
                )}
              >
                {datasource?.map((item, index) => {
                  return renderItem?.(item, index, { width });
                })}
              </div>
            </>
          ) : (
            <Empty
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
