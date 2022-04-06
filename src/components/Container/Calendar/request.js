import { excludeById, getTodayStr } from "./utils";

// 네트워크 요청을 시뮬레이션 하는 기능

let todayStr = getTodayStr();
let eventGuid = 0
let eventDb = [
    {
        id: createEventId(),
        title: '캡스톤 시연',
        start: todayStr
    },
    {
        id: createEventId(),
        title: '팀플 발표1',
        start: todayStr + 'T12:00:00'
    },
    {
      id: createEventId(),
      title: '팀플 발표2',
      start: '2022-03-28'
  }
]
const DELAY = 200;
let simulateErrors = false;

document.addEventListener('keypress', (ev) => {
    if (ev.key === 'e') {
        alert('e 키를 눌렀습니다. 오류 시뮬레이션을 시작합니다.');
        simulateErrors = true;
    }
})

export function requestEventsInRange(startStr, endStr) {
    console.log(`[STUB] requesting events from ${startStr} to ${endStr}`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (simulateErrors) {
                reject(new Error('error'));
            } else {
                resolve(eventDb); // 시작/ 종료를 사용하지 않고 항상 DB 전체 반환
            }
        },DELAY)
    })
}

export function requestEventCreate(plainEventObject) {
    console.log('[STUB] requesting event create:', plainEventObject)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (simulateErrors) {
                reject(new Error('error'))
            } else {
                let newEventId = createEventId()
                let objWithId = {...plainEventObject, id: newEventId}
                eventDb.push(objWithId)
                resolve(newEventId)
            }
        },DELAY)
    })
}

export function requestEventUpdate(plainEventObject) {
    console.log('[STUB] requesting event update:', plainEventObject)
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateErrors) {
          reject(new Error('problem'))
        } else {
          eventDb = excludeById(eventDb, plainEventObject.id)
          eventDb.push(plainEventObject)
          resolve(eventDb)
        }
      }, DELAY)
    })
  }
  export function requestEventDelete(eventId) {
    console.log('[STUB] requesting event delete, id:', eventId)
  
    return new Promise((resolve, reject) => {
      setTimeout(() => { // 네트워크 지연시
        if (simulateErrors) {
          reject(new Error('problem'))
        } else {
          eventDb = excludeById(eventDb, eventId)
          resolve(eventDb)
        }
      }, DELAY)
    })
  }
function createEventId() {
    return String(eventGuid++);
}