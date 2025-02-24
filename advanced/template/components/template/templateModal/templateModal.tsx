import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./style.module.less";
import { Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TemplateCard } from "./templateCard";
import { PreviewTemplate } from "./previewTemplate";
import { CardContainer } from "../infiniteScroll";
import {
  InfiWebsdkInstanceType,
  TemplateDataT,
  TemplateType,
} from "@plaso-infi/whiteboard-sdk";

export type TemplateModalRef = {
  open: (onSelect?: (template: TemplateType | null) => void) => void;
  close: () => void;
};

export function TemplateContent(props: {
  onSelect?: (template: TemplateType | null) => void;
  switchPreview?: (on: boolean) => void;
  showContent?: boolean;
  getTemplateList: InfiWebsdkInstanceType["getTemplateList"];
}) {
  const { onSelect, switchPreview, getTemplateList, showContent } = props;
  const [preview, setPreview] = useState<TemplateDataT>();

  const selectTemplate = (data: TemplateDataT) => {
    onSelect?.({
      coverId: data.svgFileId,
      dataId: data.dataFileId,
      width: data.width,
      height: data.height,
    });
  };

  const onPreview = async (data?: TemplateDataT) => {
    setPreview(data);
    switchPreview?.(!!data);
  };

  const [loading, setLoading] = useState(true);

  const [dataSource, setDataSource] = useState<TemplateDataT[]>();
  const rawDataSource = useRef<TemplateDataT[]>();

  const searchTemplate = (value: string) => {
    if (!value) {
      setDataSource(rawDataSource.current);
      return;
    }
    setDataSource(
      rawDataSource.current?.filter((item) => item.templateName.includes(value))
    );
  };

  const initData = async () => {
    const res = await getTemplateList();
    // 过滤空模板
    const data = res.list.filter((item) => item.dataFileId);
    setDataSource(data);
    rawDataSource.current = data;
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  if (!preview) {
    return (
      <div className={styles.templateContent} key={"center"}>
        <div className={styles.header}>模板中心</div>
        <div className={styles.body}>
          <div className={styles.filterHeader}>
            <Input
              allowClear
              style={{ width: 240 }}
              placeholder="模板名称"
              suffix={<SearchOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
              onChange={(e) => searchTemplate(e.target.value)}
            />
          </div>
          <div className={styles.container}>
            <CardContainer<TemplateDataT>
              className={styles.cardContainer}
              flexConfig={{ minCardWidth: 246 }}
              datasource={dataSource}
              pageLoading={loading || !showContent}
              renderItem={(data, index, { width }) => {
                return (
                  <TemplateCard
                    data={data}
                    index={index}
                    config={{ width }}
                    key={data.templateId}
                    onSelect={selectTemplate}
                    onPreview={onPreview}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <PreviewTemplate
      data={preview}
      onSelect={selectTemplate}
      switchPreview={onPreview}
    />
  );
}

export const TemplateModal = forwardRef<
  TemplateModalRef,
  { getTemplateList: InfiWebsdkInstanceType["getTemplateList"] }
>(function TemplateModalCmp(props, ref) {
  const [open, setOpen] = useState(false);
  const onSelectRef = useRef<(template: TemplateType | null) => void>();
  const [show, setShow] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      open: (onSelect) => {
        setOpen(true);
        onSelectRef.current = onSelect;
      },
      close: onClose,
    }),
    []
  );

  const handleSelect = (template: TemplateType | null) => {
    onSelectRef.current && onSelectRef.current(template);
    onClose();
  };

  const afterClose = () => {
    onSelectRef.current && onSelectRef.current(null);
    setShow(false);
  };

  return (
    <Modal
      destroyOnClose
      afterClose={afterClose}
      className={styles.templateModal}
      open={open}
      title={null}
      footer={null}
      onCancel={onClose}
      styles={{ body: { padding: 0, height: 520 } }}
      afterOpenChange={(open) => setShow(open)}
      centered={true}
    >
      <TemplateContent
        showContent={show}
        onSelect={handleSelect}
        getTemplateList={props.getTemplateList}
      ></TemplateContent>
    </Modal>
  );
});
