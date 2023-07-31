import classes from "../components/Home/HomeThree.module.css";
import SelectRoutineList from "../components/common/SelectRoutineList";

function RoutineSelectTest() {
  const testList = [1, 2, 3];

  return (
    <>
      <div className={classes.test}>
        {testList.map((List, index) => {
          return <SelectRoutineList key={index} idx={index} />;
        })}
      </div>
      <button>Submit</button>
    </>
  );
}

export default RoutineSelectTest;
