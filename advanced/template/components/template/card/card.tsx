import { Dropdown } from "antd";
import type { MenuClickEventHandler } from "rc-menu/lib/interface";
import type { MouseEventHandler, ReactNode, RefObject } from "react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./style.module.less";
import React from "react";
import classNames from "classnames";
import { SvgIcon } from "../../svgIcon";
type CardProps = {
  className?: string;
  type?: "outline";
  width?: number;
  onClick?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  renderInfo?: () => ReactNode;
  image: {
    url?: string;
    aspect?: number;
    className?: string;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
    onClick?: MouseEventHandler;
    extraDom?: ReactNode;
    ref?: RefObject<HTMLDivElement>;
  };
  menu?: {
    items: {
      icon?: ReactNode;
      label: string;
      key: string;
      style?: React.CSSProperties;
      onClick?: (e: any) => void;
    }[];
    onClick?: MenuClickEventHandler;
    className?: string;
  };
};

export type CardWithImageRef = {
  image: RefObject<HTMLDivElement>;
};

export const CardWithImage = forwardRef<CardWithImageRef, CardProps>(
  function CardWithImageCmp(props: CardProps, ref) {
    const {
      className,
      type,
      width = 246,
      renderInfo,
      onClick,
      onPointerEnter,
      onPointerLeave,
      menu,
      image,
    } = props;

    const [isHover, setIsHover] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const height = useMemo(() => {
      return width * (image?.aspect || 9 / 16);
    }, [width, image?.aspect]);

    const classStr = useMemo(() => {
      if (isHover) {
        return "card_hover";
      } else {
        return "";
      }
    }, [isHover]);

    const handlePointerEvents = (ishover: boolean) => {
      if (ishover) {
        onPointerEnter?.();
      } else {
        onPointerLeave?.();
      }
      setIsHover(ishover);
    };

    const onClickMenu: MenuClickEventHandler = (e) => {
      e.domEvent.stopPropagation();
      menu?.onClick?.(e);
    };

    const cover = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      image: cover,
    }));

    return (
      <div
        className={classNames(
          styles.card,
          type && styles[type],
          classStr,
          className
        )}
        style={{ width }}
        onClick={onClick}
        onPointerEnter={() => handlePointerEvents(true)}
        onPointerLeave={() => handlePointerEvents(false)}
      >
        <div
          className={classNames(styles.image, image?.className)}
          style={{ height }}
          onClick={image.onClick}
          onPointerEnter={image.onPointerEnter}
          onPointerLeave={image.onPointerLeave}
          ref={cover}
        >
          <img src={image?.url} />
          {image?.extraDom}
        </div>
        {!!renderInfo && <div className={styles.info}>{renderInfo?.()}</div>}
        {menu ? (
          <div
            className={classNames(styles.floatMenu, menu.className)}
            ref={menuRef}
          >
            <Dropdown
              overlayClassName={styles.menuPanel}
              menu={{ items: menu.items, onClick: onClickMenu }}
              placement="bottomRight"
              getPopupContainer={() => menuRef.current || document.body}
            >
              <SvgIcon
                icon="icon_gengduo"
                style={{ fontSize: 24 }}
                onClick={(e) => e.stopPropagation()}
              />
            </Dropdown>
          </div>
        ) : null}
      </div>
    );
  }
);
