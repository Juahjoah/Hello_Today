import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function WidgetGoals(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = props.memberId;

  const [isMe, setIsMe] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [goal, setGoal] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [editedGoal, setEditedGoal] = useState("");
  const [editedGoalId, setEditedGoalId] = useState(null);

  const getGoal = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage//`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        setGoal(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsMe(
      +props.memberId === +sessionStorage.getItem("memberId") ? true : false
    );
    getGoal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken]);

  const createGoal = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/`,
        {
          content: newGoal,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        setNewGoal("");
        getGoal();
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editGoal = (goalId) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/mypage//${goalId}`,
        {
          content: editedGoal,
        },
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

  const saveEditedGoal = () => {
    editGoal(editedGoalId, editedGoal);
    setIsEdit(false);
    setEditedGoalId("");
  };

  const deleteGoal = (goalId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/mypage//${goalId}`,
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

  return (
    <div className="WidgetGoals">
      <p> {memberId} 소중한 목표</p>
      <div>
        {goal.map((goalItem) => {
          return (
            <div key={goalItem.goalId}>
              {isEdit && editedGoalId === goalItem.goalId ? (
                <div>
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
                  {goalItem.content}
                  {isMe && (
                    <div>
                      <button
                        onClick={() => {
                          setIsEdit(true);
                          setEditedGoal(goalItem.goalId);
                          setEditedGoal(goalItem.content);
                        }}
                      >
                        <img src="/images/edit.png" alt="edit" />
                      </button>
                      <button onClick={() => deleteGoal(goalItem.goalId)}>
                        <img src="/images/clear.png" alt="clear" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div>
          {isMe && (
            <div>
              <input
                type="text"
                value={newGoal}
                onChange={(event) => setNewGoal(event.target.value)}
              />
              <button onClick={() => createGoal()}>댓글 입력</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WidgetGoals;
