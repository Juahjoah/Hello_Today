//더미 데이터
let eventGuid = 0;

export const events = [
  {
    id: createEventId(), //일정 번호 생성 //unique한 id라 생각하기
    title: "All-day event", // 일정 이름
    start: "2023-08-01", //일정 시작일
    end: "2023-08-07",
  },
  {
    id: createEventId(),
    title: "Timed event",
    // start: todayStr + 'T12:00:00'
    start: "2023-08-10",
    end: "2023-08-17",
  },
];

//{ title: 'event 1', date: '2019-04-01' },
export function createEventId() {
  return String(eventGuid++);
}
