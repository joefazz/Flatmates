import moment from 'moment';

export function ConvertBirthdayToAge(birthday) {
    var years = moment().diff(moment(birthday, "MM/DD/YYYY"), 'years');
    return years;
}