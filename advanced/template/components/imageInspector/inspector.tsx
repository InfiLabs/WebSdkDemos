import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./index.module.less";
import classnames from "classnames";
import { checkTouchpadScale, checkTouchpad } from "./utils";
import { throttle } from "lodash";
import { deviceInfo } from "../../utils/deviceInfo";
import { SvgIcon } from "../svgIcon";

type PropT = {
  className?: string;
  onClose?: () => any;
  imgMeta: {
    imgSrc?: string;
    name: string;
    width: number;
    height: number;
    svgText?: string;
  };
  showHeader?: boolean;
  backgroundColor?: string;
  inspectorMaxWidth?: number;
  inspectorHeight?: number;
};

type PositionLike = { x: number; y: number };

type TouchType = "scale" | "move" | null;

export type ImageInspectorRefType = {
  zoomIn: () => void;
  zoomOut: () => void;
};

const minScale = 1;
const maxScale = 1000;
const headerHeight = 58;

export const ImageInspector = forwardRef<ImageInspectorRefType, PropT>(
  function InspectorCMP(
    {
      className,
      onClose,
      imgMeta,
      showHeader = true,
      backgroundColor = "black",
      inspectorMaxWidth,
      inspectorHeight,
    },
    forwardRef
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement | HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { width: oriWidth, height: oriHeight, imgSrc, svgText } = imgMeta;
    const [curScale, setCurScale] = useState<string | null>(null);
    const resRef = useRef<HTMLSpanElement>(null);
    const hideResTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [imgMoveable, setImgMoveable] = useState(false);

    const ctrlData = useRef<{
      scale: number;
      x: number;
      y: number;
      curScale: number;
      oriScale: number;
      conWidth: number;
      conHeight: number;
      pointerId: number | null;
      connected: boolean;
      oriPos: PositionLike;
      draggable: boolean;
      curWidth: number;
      curHeight: number;
      dragged: boolean;
    }>({
      scale: 0,
      x: 0,
      y: 0,
      curScale: 0,
      oriScale: 0,
      conWidth: 0,
      conHeight: 0,
      pointerId: null,
      connected: false,
      oriPos: { x: 0, y: 0 },
      draggable: false,
      curHeight: 0,
      curWidth: 0,
      dragged: false,
    });

    useImperativeHandle(forwardRef, () => ({
      zoomIn: () => {
        scaleImage(true);
      },
      zoomOut: () => {
        scaleImage(false);
      },
    }));

    const resetDrag = useCallback(() => {
      const image = imageRef.current as HTMLImageElement;
      image.style.transform = "translate(-50%, -50%)";
      ctrlData.current.pointerId = null;
      ctrlData.current.connected = false;
      ctrlData.current.oriPos = { x: 0, y: 0 };
      ctrlData.current.x = 0;
      ctrlData.current.y = 0;
    }, []);

    useLayoutEffect(() => {
      // 如果资源为 svgText ，则需要以 innerHTML 形式进行渲染
      if (svgText) {
        const dom = imageRef.current as HTMLDivElement;
        dom.innerHTML = svgText;
        (dom.firstChild as SVGSVGElement).setAttribute("width", "100%");
        (dom.firstChild as SVGSVGElement).setAttribute("height", "100%");
      }
      // 屏幕缩放时需要重新计算容器大小及图片大小，并把图片居中, 并重置拖拽数据
      const resizeSelf = () => {
        const parent = rootRef.current?.parentElement as HTMLDivElement;
        const image = imageRef.current as HTMLImageElement;

        if (parent) {
          let style = { x: 100, y: 40, maxWidth: 520, maxHeight: 240 };
          if (deviceInfo.isPhone) {
            style = { x: 12, y: 116, maxWidth: 0, maxHeight: 0 };
          }
          const { width: parentWidth, height: parentHeight } =
            parent.getBoundingClientRect();

          const w = Math.min(
            inspectorMaxWidth || parentWidth,
            Math.max(document.body.clientWidth - style.x * 2, style.maxWidth)
          );
          const h = Math.min(
            inspectorHeight || parentHeight,
            Math.max(document.body.clientHeight - style.y * 2, style.maxHeight)
          );
          const cH = h - 58;
          const ratio = oriWidth / oriHeight;
          let width = 0;
          let height = 0;
          let curScale = 1;
          if (oriWidth - oriHeight > 0) {
            width = Math.min(w, oriWidth);
            height = width / ratio;
            curScale = (width / oriWidth) * 100;
            const cHeight = h - headerHeight;
            if (height > cHeight) {
              const scale = cHeight / height;
              height = cHeight;
              width *= scale;
              curScale *= scale;
            }
          } else {
            height = Math.min(cH, oriHeight);
            width = height * ratio;
            curScale = (height / oriHeight) * 100;
            if (width > w) {
              width = w;
              const scale = w / width;
              height *= scale;
              curScale *= scale;
            }
          }
          parent.style.padding = "0";
          parent.style.width = `${w}px`;
          parent.style.height = `${h}px`;
          ctrlData.current.conWidth = w;
          ctrlData.current.conHeight = h - headerHeight;
          image.style.width = `${width}px`;
          image.style.height = `${height}px`;
          image.style.transform = "translate(-50%, -50%)";
          ctrlData.current.curScale = curScale;
          ctrlData.current.oriScale = curScale;
          ctrlData.current.curWidth = width;
          ctrlData.current.curHeight = height;
          resetDrag();
          setScaleData(curScale);
        }
      };
      resizeSelf();
      window.addEventListener("resize", resizeSelf);

      return () => {
        window.removeEventListener("resize", resizeSelf);
      };
    }, []);

    const setScaleData = useCallback((scale: number) => {
      const span = resRef.current;
      ctrlData.current.curScale = scale;
      const draggable = scale > ctrlData.current.oriScale;
      setImgMoveable(draggable);
      ctrlData.current.draggable = draggable;
      setCurScale(`${scale | 0}%`);
      if (span) {
        if (!span.classList.contains(styles.show)) {
          span.classList.add(styles.show);
        }
        if (hideResTimer.current) {
          clearTimeout(hideResTimer.current);
        }
        hideResTimer.current = setTimeout(() => {
          span.classList.remove(styles.show);
        }, 3000);
      }
    }, []);

    const scaleImage = useCallback(
      throttle((zoomIn = true) => {
        const { curScale } = ctrlData.current;
        let nextV: number;
        if (zoomIn) {
          nextV = Math.min(maxScale, Math.ceil(curScale * 1.22));
        } else {
          nextV = Math.max(minScale, Math.floor(curScale / 1.22));
        }
        setScaleData(nextV);
        const image = imageRef.current;
        if (image) {
          const { conHeight, conWidth } = ctrlData.current;
          const curW = (oriWidth * nextV) / 100;
          const curH = (oriHeight * nextV) / 100;
          image.style.width = `${curW}px`;
          image.style.height = `${curH}px`;
          ctrlData.current.curWidth = curW;
          ctrlData.current.curHeight = curH;
          if (zoomIn) {
            ctrlData.current.x *= nextV / curScale;
            ctrlData.current.y *= nextV / curScale;
          } else {
            if (curW <= conWidth) {
              ctrlData.current.x = 0;
            } else {
              ctrlData.current.x *= nextV / curScale;
              const curTransX = ctrlData.current.x - 0.5 * curW;
              const offsetX = conWidth / 2;
              const rDetached = offsetX + curTransX + curW <= conWidth;
              const lDetached = offsetX + curTransX >= 0;
              // 如果图片右边线不与容器右边线相交 (此时图片左边线与容器左边线相交), 则将图片右边线与容器右边线对齐
              if (rDetached) {
                ctrlData.current.x += conWidth - (offsetX + curTransX + curW);
              }
              // 如果图片右边线不与容器右边线相交 (此时图片右边线与容器右边线相交)，则将图片左边线与容器左边线对齐
              if (lDetached) {
                ctrlData.current.x -= offsetX + curTransX;
              }
            }

            // 如果图片高度已经小于等于容器高度，无条件垂直居中
            if (curH < conHeight) {
              ctrlData.current.y = 0;
            } else {
              ctrlData.current.y *= nextV / curScale;
              const curTransY = ctrlData.current.y - 0.5 * curH;
              const offsetY = conHeight / 2;
              const tDetached = offsetY + curTransY >= 0;
              const bDetached = offsetY + curTransY + curH <= conHeight;
              // 如果图片下边线不与容器下边线相交 (此时图片上边线与容器上边线相交), 则将图片下边线与容器下边线对齐
              if (bDetached) {
                ctrlData.current.y += conHeight - (offsetY + curTransY + curH);
              }
              // 如果图片上边线不与容器上边线相交 (此时图片下边线与容器下边线相交)，则将图片下边线与容器下边线对齐
              if (tDetached) {
                ctrlData.current.y -= offsetY + curTransY;
              }
            }
          }
          image.style.transform = `translate(calc(${ctrlData.current.x}px - 50%), calc(${ctrlData.current.y}px - 50%))`;
        }
      }, 100),
      []
    );

    const moveImage = useCallback((evt: PositionLike, end: boolean) => {
      const data = ctrlData.current;
      let xDelta = 0;
      if (data.conWidth >= data.curWidth && data.conHeight >= data.curHeight)
        return;
      // 仅当图片当前宽度大于容器宽度时，x 向可以拖拽
      if (data.conWidth < data.curWidth) {
        xDelta = evt.x - data.oriPos.x;

        // 向右拽
        if (xDelta > 0) {
          // 最多可以拽到左边界与容器左边界对齐
          if (data.curWidth / 2 - (data.x + xDelta) < data.conWidth / 2) {
            xDelta = (data.curWidth - data.conWidth) / 2 - data.x;
          }
        } else {
          // 向左拽
          // 最多可以拽到右边界与容器右边界对齐
          if (data.curWidth / 2 + data.x + xDelta < data.conWidth / 2) {
            xDelta = -(data.curWidth - data.conWidth) / 2 - data.x;
          }
        }
      }
      let yDelta = 0;
      // 仅当图片当前高度大于容器宽度时，y 向可以拖拽
      if (data.conHeight < data.curHeight) {
        yDelta = evt.y - data.oriPos.y;
        // 向下拽
        if (yDelta > 0) {
          if (data.curHeight / 2 - (data.y + yDelta) < data.conHeight / 2) {
            yDelta = (data.curHeight - data.conHeight) / 2 - data.y;
          }
        } else {
          // 向上拽
          if (data.curHeight / 2 + data.y + yDelta < data.conHeight / 2) {
            yDelta = -((data.curHeight - data.conHeight) / 2) - data.y;
          }
        }
      }
      const image = imageRef.current;
      if (image) {
        image.style.transform = `translate(calc(${
          data.x + xDelta
        }px - 50%), calc(${data.y + yDelta}px - 50%))`;
      }
      if (end) {
        data.x = data.x + xDelta;
        data.y = data.y + yDelta;
      }
    }, []);

    // 处理滚轮事件
    useEffect(() => {
      const content = contentRef.current as HTMLDivElement;
      let firstDelta: number | null = null;
      let wheelMode: "mouse" | "touchpad" = "mouse";
      let wheelEndTimer: ReturnType<typeof setTimeout> | null = null;
      let lastGScale = 0;

      const checkMouse = (e: WheelEvent) => {
        if (deviceInfo.firefox && e.deltaMode === WheelEvent.DOM_DELTA_LINE)
          return true;
        if (checkTouchpadScale(e)) {
          return false;
        }
        if (deviceInfo.isMac && (e as any).wheelDeltaY && null === firstDelta) {
          firstDelta = Math.abs((e as any).wheelDeltaY);
          const FIRST_DELTA = deviceInfo.safari ? 12 : 120;
          const res = firstDelta === FIRST_DELTA;
          return res;
        }
        return false;
      };

      const checkMode = (e: WheelEvent) => {
        switch (wheelMode) {
          case "mouse":
            if (checkTouchpad(e)) wheelMode = "touchpad";
            break;
          case "touchpad":
            if (checkMouse(e)) wheelMode = "mouse";
            break;
          default:
            break;
        }
      };

      // mca (非 safari）及移动端设备上，图片的缩放和移动完全通过触摸板控制，鼠标点击无效
      const touchPadWheelListener = (e: WheelEvent) => {
        checkMode(e);
        if (wheelEndTimer) {
          clearTimeout(wheelEndTimer);
        }
        wheelEndTimer = setTimeout(() => {
          wheelEndTimer = null;
          firstDelta = null;
        }, 100);
        if (e.ctrlKey) {
          if (checkTouchpadScale(e)) {
            // 使用触摸板进行缩放
            const delta = Math.exp(-e.deltaY / 100);
            if (Math.abs(delta - 1) > 0.01) {
              scaleImage(delta > 1);
            }
          } else {
            // 使用鼠标进行缩放，暂不处理
          }
        } else if (wheelMode === "mouse") {
          // 使用鼠标滚轮进行缩放，暂不处理
          mouseListener(e);
        } else {
          const data = ctrlData.current;

          if (
            data.conWidth >= data.curWidth &&
            data.conHeight >= data.curHeight
          )
            return;

          const { deltaX: x, deltaY: y } = e;
          let deltaX = 0;
          let deltaY = 0;
          // 仅当图片当前宽度大于容器宽度时，x 向可以拖拽
          if (data.conWidth < data.curWidth) {
            deltaX = -x;
            // 向右拽
            if (deltaX > 0) {
              // 最多可以拽到左边界与容器左边界对齐
              if (data.curWidth / 2 - (data.x + deltaX) < data.conWidth / 2) {
                deltaX = (data.curWidth - data.conWidth) / 2 - data.x;
              }
            } else {
              // 向左拽
              // 最多可以拽到右边界与容器右边界对齐
              if (data.curWidth / 2 + data.x + deltaX < data.conWidth / 2) {
                deltaX = -(data.curWidth - data.conWidth) / 2 - data.x;
              }
            }
          }
          // 仅当图片当前高度大于容器宽度时，y 向可以拖拽
          if (data.conHeight < data.curHeight) {
            // 向下拽
            deltaY = -y;
            if (deltaY > 0) {
              if (data.curHeight / 2 - (data.y + deltaY) < data.conHeight / 2) {
                deltaY = (data.curHeight - data.conHeight) / 2 - data.y;
              }
            } else {
              // 向上拽
              if (data.curHeight / 2 + data.y + deltaY < data.conHeight / 2) {
                deltaY = -((data.curHeight - data.conHeight) / 2) - data.y;
              }
            }
          }
          const image = imageRef.current;
          if (image) {
            image.style.transform = `translate(calc(${
              data.x + deltaX
            }px - 50%), calc(${data.y + deltaY}px - 50%))`;
          }
          data.x = data.x + deltaX;
          data.y = data.y + deltaY;
        }
      };

      // 普通 desktop 设备上，滚轮及触摸板仅控制缩放，移动图片需要使用鼠标拖拽
      const mouseListener = (e: WheelEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const wheelDelta = (e as any).wheelDelta || -e.deltaY;
        if (((wheelDelta * 100) | 0) === 0) return;

        if (checkTouchpadScale(e)) {
          const delta = Math.exp(-e.deltaY / 100);
          if (Math.abs(delta - 1) > 0.1) {
            scaleImage(delta > 1);
          }
        } else {
          scaleImage(wheelDelta > 0);
        }
      };

      const onGestureStart = (e: any) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (deviceInfo.safari && e.scale && isFinite(e.scale)) {
          wheelMode = "touchpad";
          lastGScale = e.scale;
        }
      };

      const onGestureChange = (e: any) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const diff = e.scale - lastGScale;
        if (Math.abs(diff) >= 0.01) {
          scaleImage(diff > 0);
        }
        lastGScale = e.scale;
        if (deviceInfo.safari && e.scale && isFinite(e.scale)) {
          wheelMode = "touchpad";
        }
      };

      // safari 内缩放、放大只会触发 gesture 事件，而非 wheel 事件
      if (deviceInfo.desktop && deviceInfo.safari) {
        content.addEventListener("gesturestart", onGestureStart, true);
        content.addEventListener("gestureend", onGestureChange, true);
        content.addEventListener("gesturechange", onGestureChange, true);
      }

      content.addEventListener(
        "wheel",
        deviceInfo.desktop && !deviceInfo.isMac
          ? mouseListener
          : touchPadWheelListener
      );
      return () => {
        content.removeEventListener(
          "wheel",
          deviceInfo.desktop && !deviceInfo.isMac
            ? mouseListener
            : touchPadWheelListener
        );

        if (deviceInfo.desktop && deviceInfo.safari) {
          content.removeEventListener("gesturestart", onGestureStart, true);
          content.removeEventListener("gestureend", onGestureChange, true);
          content.removeEventListener("gesturechange", onGestureChange, true);
        }
      };
    }, []);

    // desktop 且非 mac 的情况下，可以通过鼠标点击拖拽图片
    useEffect(() => {
      const image = imageRef.current as HTMLImageElement;
      const onPointerDown = (evt: PointerEvent) => {
        evt.stopPropagation();
        if (!ctrlData.current.draggable) return;
        const pointerId = ctrlData.current.pointerId;
        if (pointerId !== null && pointerId !== evt.pointerId) return;
        ctrlData.current.pointerId = evt.pointerId;
        ctrlData.current.connected = true;
        ctrlData.current.oriPos = { x: evt.pageX, y: evt.pageY };
      };

      const onPointerMove = (evt: PointerEvent, end = false) => {
        const data = ctrlData.current;
        if (!data.draggable) return;
        const pointerId = data.pointerId;
        if (pointerId !== null && pointerId !== evt.pointerId) return;
        if (!data.connected) return;
        moveImage({ x: evt.pageX, y: evt.pageY }, end);
      };

      const onPointerUp = (evt: PointerEvent) => {
        if (!ctrlData.current.draggable) return;
        const pointerId = ctrlData.current.pointerId;
        if (pointerId !== null && pointerId !== evt.pointerId) return;
        if (!ctrlData.current.connected) return;
        onPointerMove(evt, true);
        ctrlData.current.connected = false;
        ctrlData.current.pointerId = null;
      };

      const ctxHandler = (e: Event) => {
        e.preventDefault();
      };

      image.addEventListener("contextmenu", ctxHandler);

      if (deviceInfo.desktop) {
        image.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
      }

      return () => {
        image?.removeEventListener("contextmenu", ctxHandler);
        if (deviceInfo.desktop) {
          image?.removeEventListener("pointerdown", onPointerDown);
          document.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("pointerup", onPointerUp);
        }
      };
    }, []);

    // 触摸屏（可双指放大缩小，单指移动图片）
    useEffect(() => {
      const image = imageRef.current as HTMLImageElement;
      let preTouchType: TouchType = null;
      let touchType: TouchType = null;
      let connected = false;
      let singleTouchPoint: PositionLike = { x: 0, y: 0 };
      let startTouchesPoint: PositionLike[] = [];

      const savePoint = (touches: TouchList) => {
        startTouchesPoint = [];
        for (let i = 0; i < touches.length; i++) {
          const touchPoint = {
            x: touches[i].pageX,
            y: touches[i].pageY,
          };
          startTouchesPoint.push(touchPoint);
        }
      };

      // 获取坐标之间的距离
      const getDistance = function (start: PositionLike, stop: PositionLike) {
        return Math.hypot(stop.x - start.x, stop.y - start.y);
      };

      const startMove = () => {
        ctrlData.current.oriPos = singleTouchPoint;
      };

      const endMove = () => {
        moveImage(singleTouchPoint, true);
      };

      const touchstartHandler = (evt: TouchEvent) => {
        // evt.preventDefault(); // 防止浏览器因为禁止拖拽而阻止代码正常运行
        const touches = evt.touches;
        connected = true;
        savePoint(evt.touches);
        singleTouchPoint = {
          x: touches[0].pageX,
          y: touches[0].pageY,
        };
        if (touches.length === 1) {
          startMove();
        } else if (preTouchType === "move") {
          // 切换为多个手指，且前一个为move：表示move结束，scale开始
          endMove();
        }
      };

      const touchmoveHandler = (evt: TouchEvent) => {
        if (!connected) return;
        evt.preventDefault();
        const firstPoint = {
          x: evt.touches[0].pageX,
          y: evt.touches[0].pageY,
        };
        // 双指放大缩小图片
        if (evt.touches.length >= 2) {
          touchType = "scale";
          const secondPoint = {
            x: evt.touches[1].pageX,
            y: evt.touches[1].pageY,
          };

          if (startTouchesPoint.length < 2) {
            // 可能第二根手指不在图片上
            startTouchesPoint.push(secondPoint);
          }

          // 双指缩放比例计算
          const zoom =
            getDistance(firstPoint, secondPoint) /
            getDistance(startTouchesPoint[0], startTouchesPoint[1]);

          scaleImage(zoom > 1);
        } else {
          touchType = "move";
          // 单指移动图片
          moveImage(firstPoint, false);
        }

        singleTouchPoint = firstPoint;
        preTouchType = touchType;
        savePoint(evt.touches);
      };

      const touchendHandler = (evt: TouchEvent) => {
        if (!connected) return;
        if (preTouchType === "scale" && evt.touches.length === 1) {
          // 切换为move且前一个为scale：表示move开始，scale结束
          startMove();
        }
        // 结束移动
        touchType === "move" && endMove();
        // touch结束
        if (evt.touches.length === 0) {
          connected = false;
          touchType = null;
          preTouchType = null;
        }
      };

      if (deviceInfo.isTouchSupported) {
        image.addEventListener("touchstart", touchstartHandler);
        document.addEventListener("touchmove", touchmoveHandler, {
          passive: false,
        });
        document.addEventListener("touchend", touchendHandler);
      }

      return () => {
        if (deviceInfo.isTouchSupported) {
          image.removeEventListener("touchstart", touchstartHandler);
          document.removeEventListener("touchmove", touchmoveHandler);
          document.removeEventListener("touchend", touchendHandler);
        }
      };
    }, []);
    const downloadImage = () => {
      const link = document.createElement("a");
      link.href = `${imgMeta.imgSrc}?response-content-type=application%2Foctet-stream`;
      link.target = "_blank";
      link.click();
    };

    return (
      <div className={classnames(styles.root, className)} ref={rootRef}>
        {showHeader && (
          <div className={styles.header}>
            <span className={styles.title}>{imgMeta.name}</span>
            <div className={styles.actions}>
              {deviceInfo.desktop && (
                <SvgIcon
                  icon="icon_file_xiazai"
                  className={styles.download}
                  onClick={downloadImage}
                />
              )}
              <SvgIcon
                icon="icon_fangda"
                className={styles.zoomIn}
                onClick={() => scaleImage(true)}
              />
              <SvgIcon
                icon="icon_suoxiao"
                className={styles.zoomOut}
                onClick={() => scaleImage(false)}
              />
              <div className={styles.divider} />
              <SvgIcon
                icon="icon_guanbi"
                className={styles.close}
                onClick={onClose}
              />
            </div>
          </div>
        )}
        <div
          className={styles.content}
          ref={contentRef}
          style={{
            backgroundColor,
          }}
        >
          {svgText ? (
            <div
              ref={imageRef as React.RefObject<HTMLDivElement>}
              draggable={false}
              className={
                imgMoveable && deviceInfo.desktop
                  ? deviceInfo.isMac
                    ? styles.moveable
                    : styles.draggable
                  : ""
              }
              style={{
                userSelect: "none",
              }}
            ></div>
          ) : (
            <img
              src={imgSrc}
              ref={imageRef as React.RefObject<HTMLImageElement>}
              draggable={false}
              className={
                imgMoveable && deviceInfo.desktop
                  ? deviceInfo.isMac
                    ? styles.moveable
                    : styles.draggable
                  : ""
              }
            />
          )}
          {curScale && (
            <span className={styles.resolution} ref={resRef}>
              {curScale}
            </span>
          )}
        </div>
      </div>
    );
  }
);
