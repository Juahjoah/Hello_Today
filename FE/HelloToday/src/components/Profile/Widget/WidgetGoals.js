import classes from "./WidgetGoals.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Calendar } from "react-calendar";

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
  const itemsIncludePage = 5;

  const getGoal = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/goal`, {
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
        // console.log(response);
        getGoal();
      })

      .catch((error) => {
        console.log(error);
      });
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
      <p className={classes.goalTitle}> 작고 소중한 목표를 세웠어요! </p>
      <div>
        {nowgoal.length === 0 && <div>아직 목표가 없어요!</div>}
        {nowgoal.length > 0 &&
          nowgoal.map((goalItem) => {
            return (
              <div key={goalItem.goalId}>
                {isEdit && editedGoalId === goalItem.goalId ? (
                  <div>
                    <select
                      value={editedGoalType}
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
                      onChange={(event) => {
                        setEditedGoal(event.target.value);
                        setEditedGoalId(goalItem.goalId);
                      }}
                    />
                    <button onClick={() => saveEditedGoal()}>저장</button>
                    <button onClick={() => setIsEdit(false)}>취소</button>
                  </div>
                ) : (
                  <div>
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
                          <img src="../../images/Widget/edit.png" alt="edit" />
                        </button>
                        <button onClick={() => deleteGoal(goalItem.goalId)}>
                          <img
                            src="../../images/Widget/clear.png"
                            alt="clear"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        {goal.length > itemsIncludePage && (
          <div>
            <button
              onClick={() => paginate(nowPage - 1)}
              disabled={nowPage === 1}
            >
              이전
            </button>
            <button
              onClick={() => paginate(nowPage + 1)}
              disabled={
                nowgoal.length < itemsIncludePage || nowgoal.length === 0
              }
            >
              다음
            </button>
          </div>
        )}

        <div>
          {isMe && (
            <div>
              <select
                value={goalType}
                x
                onChange={(event) => setGoalType(event.target.value)}
              >
                <option value="0">매일</option>
                <option value="1">매주</option>
                <option value="2">매년</option>
              </select>
              <input
                type="text"
                value={newGoal}
                onChange={(event) => setNewGoal(event.target.value)}
              />
              <button onClick={() => createGoal()}>저장</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WidgetGoals;
