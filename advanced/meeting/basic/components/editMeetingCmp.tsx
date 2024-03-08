import React from "react";
import { Button, Result } from "antd";

export const EditMeetingCmp = () => {
  return (
    <Result
      style={{ width: "100%" }}
      title={
        <>
          <div>正在体验快速会议 </div>
          <div>更多配置项</div>
          <div>请前往开发者中心查看</div>
        </>
      }
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.open("https://developer.infi.cn/docs/websdk/intro");
          }}
        >
          前往 开发者中心
        </Button>
      }
    />
  );
};
