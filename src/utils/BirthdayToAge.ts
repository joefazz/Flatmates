import * as moment from 'moment';

export function ConvertBirthdayToAge(birthday: string): number {
    return moment().diff(moment(birthday, 'MM/DD/YYYY'), 'years');
}
