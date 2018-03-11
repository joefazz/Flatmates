// @ts-ignore
import moment from 'moment';

export function compareUsers(me, otherUser): number {
    // smoker - 0.3
    // gender - 0.3
    // course -  - 0.2
    // study year - 0.1
    // birthday - 0.05
    // facebook info - 0.05
    let score = 0;

    if (me.isSmoker === otherUser.isSmoker) {
        score += 0.3;
    }

    // Add gender preference comparision
    if (me.gender === otherUser.gender) {
        score += 0.3;
    }

    if (me.course === otherUser.course) {
        score += 0.2;
    }

    if (me.studyYear === otherUser.studyYear) {
        score += 0.1;
    }

    if (moment(me.birthday).format('YYYY') === moment(otherUser.birthday).format('YYYY')) {
        score += 0.05
    }

    // leave facebook

    return Math.floor(score * 100);
}
