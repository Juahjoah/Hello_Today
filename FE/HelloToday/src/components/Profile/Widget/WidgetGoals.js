import classes from "./WidgetGoals.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";

import axios from "axios";

function WidgetGoals() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [isMe, setIsMe] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [goal, setGoal] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [editedGoal, setEditedGoal] = useState("");
  const [editedGoalId, setEditedGoalId] = useState(null);
  const [goalType, setGoalType] = useState("0");
  const [editedGoalType, setEditedGoalType] = useState("0");

  const [nowPage, setNowPage] = useState(1);
  const itemsIncludePage = 4;

  const getGoal = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/goal/${memberId}`, {
        params: { memberId },
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        // console.log(response.data);
        setGoal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("memberId");
    setIsMe(
      loggedInUserId === memberId ||
        goal.some((goalItem) => goalItem.memberId === loggedInUserId)
    );
    getGoal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken]);

  const createGoal = () => {
    if (newGoal.trim() === "") {
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/goal`,
        {
          type: goalType,
          content: newGoal,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setNewGoal("");
        setGoalType("0");
        getGoal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editGoal = (goalId) => {
    if (editedGoal.trim() === "") {
      return;
    }
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/goal/${goalId}`,
        {
          type: editedGoalType,
          content: editedGoal,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        // console.log(response);
        setEditedGoal("");
        setEditedGoalType("0");
        getGoal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditedGoal = () => {
    editGoal(editedGoalId, editedGoal);
    setIsEdit(false);
    setEditedGoalId("");
  };

  const deleteAlert = (messageId) => {
    let confirmed = false;

    Swal.fire({
      icon: "question",
      title: "해당 목표를 삭제합니다.",
      text: "소중한 목표를 정말 삭제하시겠습니까?",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        confirmed = true;
        deleteGoal(messageId);
      }
    });
  };

  const deleteGoal = (goalId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/goal/${goalId}`,
        // { params: { oneDiaryId: wishDiaryId } },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "해당 목표가 삭제되었습니다.",
            text: "",
            confirmButtonText: "확인",
          });
        }
        // console.log(response);
        getGoal();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      createGoal();
    }
  };

  const indexOfLastItem = nowPage * itemsIncludePage;
  const indexOfFirstItem = indexOfLastItem - itemsIncludePage;

  const startIndex = Math.max(indexOfFirstItem, 0);
  const endIndex = Math.min(indexOfLastItem, goal.length);

  const nowgoal = goal.length === 0 ? [] : goal.slice(startIndex, endIndex);

  const paginate = (pageNumber) => {
    setNowPage(pageNumber);
  };

  return (
    <div className={classes.WidgetGoals}>
      <span className={classes.goalTitle}> 나의 목표 </span>
      {/* <p className={classes.goalTitle}> 작고 소중한 목표를 세웠어요! </p> */}
      <div>
        <div className={classes.goalListSection}>
          {goal.length > itemsIncludePage && (
            <div>
              <button
                className={classes.moveButtonStyle}
                onClick={() => paginate(nowPage - 1)}
                disabled={nowPage === 1}
              >
                <img src="../../images/Widget/before.png" alt="before" />
              </button>
            </div>
          )}
          <div className={classes.goalList}>
            {nowgoal.length === 0 && <div>아직 목표가 없어요!</div>}
            {nowgoal.length > 0 &&
              nowgoal.map((goalItem) => {
                return (
                  <div key={goalItem.goalId}>
                    {isEdit && editedGoalId === goalItem.goalId ? (
                      <div className={classes.editSectionStyle}>
                        <select
                          value={editedGoalType}
                          className={classes.selectBoxStyle}
                          onChange={(event) =>
                            setEditedGoalType(event.target.value)
                          }
                        >
                          <option value="0">매일</option>
                          <option value="1">매주</option>
                          <option value="2">매년</option>
                        </select>
                        <input
                          type="text"
                          value={editedGoal}
                          className={classes.editInputStyle}
                          onChange={(event) => {
                            setEditedGoal(event.target.value);
                            setEditedGoalId(goalItem.goalId);
                          }}
                        />
                        <button
                          className={classes.inputBtnMini}
                          onClick={() => saveEditedGoal()}
                        >
                          저장
                        </button>
                        <button
                          className={classes.inputBtnMini}
                          onClick={() => setIsEdit(false)}
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className={classes.goalItemText}>
                          {goalItem.type === "0" && "매일 목표"}
                          {goalItem.type === "1" && "매주 목표"}
                          {goalItem.type === "2" && "매년 목표"}

                          {goalItem.content}
                          {isMe && (
                            <div>
                              <button
                                className={classes.editButtonStyle}
                                onClick={() => {
                                  setIsEdit(true);
                                  setEditedGoalId(goalItem.goalId);
                                  setEditedGoal(goalItem.content);
                                  setEditedGoalType(goalItem.type);
                                }}
                              >
                                <img
                                  src="../../images/Widget/edit.png"
                                  alt="edit"
                                />
                              </button>
                              <button
                                className={classes.editButtonStyle}
                                onClick={() => deleteAlert(goalItem.goalId)}
                              >
                                <img
                                  src="../../images/Widget/clear.png"
                                  alt="clear"
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {goal.length > itemsIncludePage && (
            <div>
              <button
                className={classes.moveButtonStyle}
                onClick={() => paginate(nowPage + 1)}
                disabled={
                  nowgoal.length < itemsIncludePage || nowgoal.length === 0
                }
              >
                <img src="../../images/Widget/next.png" alt="next" />
              </button>
            </div>
          )}
        </div>

        <div>
          {isMe && (
            <div className={classes.widgetInputStyle}>
              <select
                value={goalType}
                className={classes.selectBoxStyle}
                onChange={(event) => setGoalType(event.target.value)}
              >
                <option className={classes.selectBoxOption} value="0">
                  매일
                </option>
                <option className={classes.selectBoxOption} value="1">
                  매주
                </option>
                <option className={classes.selectBoxOption} value="2">
                  매년
                </option>
              </select>
              <input
                type="text"
                value={newGoal}
                className={classes.inputstyle}
                placeholder="해내고 싶은 목표를 남겨봐요!"
                onChange={(event) => setNewGoal(event.target.value)}
                onKeyDown={keyPressHandler}
              />
              <button className={classes.inputBtn} onClick={() => createGoal()}>
                저장
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WidgetGoals;
