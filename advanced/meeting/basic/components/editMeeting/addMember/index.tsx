import { Input, Button, Checkbox, Avatar } from "antd";
import { cloneDeep, debounce } from "lodash";
import styles from "./add-member.module.less";
import React, { useEffect, useState, useRef, type FC, useMemo } from "react";
import type { TeamMemberInfo, AddMemberProps } from "../types";
import classnames from "classnames";
import { Tooltip } from "antd";
import { getDefaultColor } from "../../../utils/common";
import { CloseCircleFilled, CloseOutlined, SearchOutlined } from "@ant-design/icons";

type CheckBoxInfo = {
  disabled?: boolean;
  checked?: boolean;
  render?: string;
};

type MemberInfo = TeamMemberInfo & CheckBoxInfo;

export const AddMember: FC<AddMemberProps> = ({
  curJoiners,
  onSubmit,
  onCancel,
  getTeamMembersInBoard,
  getMeetingLink,
  user,
}) => {
  const [hasSelectList, setHasSelectList] = useState<MemberInfo[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<MemberInfo[]>([]);
  const [isAllJoined, setIsAllJoined] = useState(false);
  const memberListRef = useRef<MemberInfo[]>([]);

  function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyword(e.target.value);
    if (e.target.value) {
      debounceToSearch(e.target.value);
    } else {
      setIsEmpty(false);
      const list = hasSelectList.map((item: MemberInfo) => item.userId); // 已选择人数的id
      const arr = memberListRef.current.map((el: MemberInfo) => ({
        ...el,
        checked: el.checked || list.includes(el.userId),
        render: "",
      }));
      setMemberList(arr);
    }
  }

  const toSearch = (keyword: string) => {
    const selectedList = hasSelectList.map((item: MemberInfo) => item.userId);
    const list = cloneDeep(
      memberListRef.current.filter(
        (item: MemberInfo) => item.userName.indexOf(keyword) > -1
      )
    );
    list.forEach((item: MemberInfo) => {
      if (selectedList.includes(item.userId)) {
        item.checked = true;
      }
      item.render = item.userName.replace(
        keyword,
        `<em class=${styles.highLight} >${keyword}</em>`
      );
    });
    list.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
    setMemberList(list);
  };

  const debounceToSearch = debounce(toSearch, 100);

  const handleCheckbox = (e: any, index: number) => {
    const flag = (e.target as HTMLInputElement).checked;
    if (flag) {
      memberList[index].checked = true;
      setHasSelectList([...hasSelectList, memberList[index]]);
    } else {
      memberList[index].checked = false;
      const id = memberList[index].userId;
      const list = hasSelectList.filter(
        (item: MemberInfo) => item.userId != id
      );
      setHasSelectList(list);
    }
  };

  const deleteItem = (curItem: MemberInfo) => {
    const deleteId = curItem.userId;
    const deleteMember = memberList.find(
      (item: MemberInfo) => item.userId === deleteId
    );
    if (deleteMember) deleteMember.checked = false;
    const list = hasSelectList.filter(
      (item: MemberInfo) => item.userId != deleteId
    );
    setHasSelectList(list);
  };

  async function init() {
    const res: MemberInfo[] = await getTeamMembersInBoard();
    let allJoined = true;
    const listToShow = res.map((item) => {
      const hasJoined =
        curJoiners.includes(item.userId) || item.userId === user.userId;
      allJoined &&= hasJoined;
      return {
        ...item,
        checked: hasJoined,
        disabled: hasJoined,
      };
    });
    memberListRef.current = listToShow;
    setMemberList(cloneDeep(listToShow));
    setIsAllJoined(allJoined);
  }

  useEffect(() => {
    init();
  }, [curJoiners]);

  const hasSelectedAll = useMemo(() => {
    const curSelectedList = memberList
      .filter((item: MemberInfo) => item.checked)
      .map((item: MemberInfo) => item.userId);
    return curSelectedList.length === memberList.length;
  }, [memberList, hasSelectList]);

  const handleAllSelect = (checked: boolean) => {
    const needChangeList: MemberInfo[] = [];
    memberList.forEach((item: MemberInfo) => {
      if (!curJoiners.includes(item.userId) && item.userId !== user.userId) {
        checked !== item.checked && needChangeList.push(item);
        item.checked = checked;
      }
    });
    const curSelected = checked
      ? [...hasSelectList, ...needChangeList]
      : [
          ...hasSelectList.filter(
            (select: MemberInfo) =>
              !needChangeList.find(
                (cur: MemberInfo) => select.userId === cur.userId
              )
          ),
        ];
    setHasSelectList(curSelected);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBarPart}>
        <div className={styles.titlePart}>添加团队成员</div>
        <div onClick={() => onCancel()}>
          <CloseOutlined />
        </div>
      </div>
      <div className={styles.bottomPart}>
        <div className={styles.leftPart}>
          <div className={styles.searchPart}>
            <Input
              className={styles.inputPart}
              prefix={<SearchOutlined className={styles.icon} />}
              placeholder="搜索成员"
              value={searchKeyword}
              onChange={handleSearchInputChange}
              allowClear
              onClick={(e) => e.stopPropagation()}
              disabled={!memberList.length && !searchKeyword}
            ></Input>
            <div
              className={classnames(
                styles.allSelectPart,
                (!memberList.length || isAllJoined) && styles.disabled
              )}
              onClick={() => handleAllSelect(!hasSelectedAll)}
            >
              {!hasSelectedAll ? "全选" : "取消"}
            </div>
          </div>
          <div className={styles.listPart}>
            <div className={styles.items}>
              {!isEmpty ? (
                memberList?.map((item: MemberInfo, index: number) => {
                  return (
                    <Checkbox
                      key={item.userId}
                      checked={item.checked}
                      className={styles.itemPart}
                      onChange={(e) => handleCheckbox(e, index)}
                      disabled={item.disabled}
                    >
                      <div style={{ display: "flex" }}>
                        <Avatar
                          className={styles.avatar}
                          src={item.userAvatarUrl || null}
                          style={{
                            backgroundColor: getDefaultColor(item.userId),
                          }}
                        >
                          {item.userName?.substr(0, 1)}
                        </Avatar>
                        <Tooltip title={item.userName} placement="bottom">
                          <div
                            className={styles.namePart}
                            dangerouslySetInnerHTML={{
                              __html: item.render ? item.render : item.userName,
                            }}
                          ></div>
                        </Tooltip>
                      </div>
                    </Checkbox>
                  );
                })
              ) : (
                <div className={styles.noResultPart}>没有搜索结果</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.rightPart}>
          {isAllJoined && getMeetingLink ? (
            <span className={styles.emptyMemberList}>
              团队成员已全部被添加到会议中，添加团队外成员参会请点击
              <span
                className={styles.copyLink}
                onClick={() => getMeetingLink()}
              >
                复制邀请链接
              </span>
            </span>
          ) : (
            <>
              <div className={styles.selectedPart}>
                <span>已选择</span> <span>{hasSelectList.length}</span>
              </div>
              <div className={styles.items}>
                <div className={styles.itemPart}>
                  {hasSelectList.map((item: MemberInfo) => {
                    return (
                      <div className={styles.hasSelectedPart} key={item.userId}>
                        <Avatar
                          className={styles.avatar}
                          src={item.userAvatarUrl || null}
                          style={{
                            backgroundColor: getDefaultColor(item.userId),
                          }}
                        >
                          {item.userName?.substr(0, 1)}
                        </Avatar>
                        <Tooltip title={item.userName} placement="bottom">
                          <div
                            className={styles.namePart}
                            dangerouslySetInnerHTML={{ __html: item.userName }}
                          ></div>
                        </Tooltip>
                        <CloseCircleFilled />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.footerPart}>
                <Button className={styles.btnPart} onClick={onCancel}>
                  取消
                </Button>
                <Button
                  type="primary"
                  className={styles.btnPart}
                  onClick={() =>
                    onSubmit([
                      ...curJoiners,
                      ...hasSelectList.map((item: MemberInfo) => item.userId),
                    ])
                  }
                  disabled={hasSelectList.length === 0}
                >
                  确定
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
