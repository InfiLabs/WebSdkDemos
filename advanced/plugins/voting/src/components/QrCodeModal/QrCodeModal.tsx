import React, { useEffect, useRef, useState } from "react";
import { Modal, QRCode } from "antd";
import dayjs from "dayjs";

export type QrCodeModalProps = {
  show: boolean;
  voteId: string;
  boardId: string;
  onClose: () => void;
};

export enum QrCodeStatus {
  active = "active",
  expired = "expired",
  loading = "loading",
}

// 二维码过期时间为 5 分钟
const expired = 5 * 60 * 1000;
const QrCodeModal: React.FC<QrCodeModalProps> = ({
  voteId,
  show,
  boardId,
  onClose,
}) => {
  const [status, setStatus] = useState(QrCodeStatus.active);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const expiredTimer = useRef<any>();

  const getExpirationTime = () => {
    return dayjs().add(5, "minutes").unix();
  };

  const getUrl = () => {
    if (voteId) {
      const url = `${
        location.origin + location.pathname
      }?boardId=${boardId}&voteId=${voteId}&expired=${getExpirationTime}`;
      return url;
    }
    console.error("no voteId");
    return "";
  };

  const refresh = () => {
    setStatus(QrCodeStatus.loading);
    const url = getUrl();
    setUrl(url);
    if (url) {
      setStatus(QrCodeStatus.active);
      expiredTimer.current = setTimeout(() => {
        setStatus(QrCodeStatus.expired);
      }, expired);
    } else {
      console.error("makeQRCode error: no url");
    }
  };

  useEffect(() => {
    setOpen(show);
    refresh();
    return () => {
      clearTimeout(expiredTimer.current);
    };
  }, [show]);

  return (
    <>
      <Modal
        footer={null}
        title="扫码参与投票"
        open={open}
        onCancel={() => {
          onClose();
          setOpen(false);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode value={url} size={300} status={status} onRefresh={refresh} />
        </div>
      </Modal>
    </>
  );
};

export default QrCodeModal;
