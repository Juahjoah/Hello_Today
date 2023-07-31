import { useSelector } from "react-redux";

function User() {
  const selectedRoutine = useSelector((state) => state.selectRoutine);
  return (
    <p>
      로그인 페이지 입니다!
      {selectedRoutine}
    </p>
  );
}

export default User;
