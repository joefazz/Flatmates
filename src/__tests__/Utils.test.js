import { ConvertBirthdayToAge } from '../utils/BirthdayToAge';

test('Convert a birthday string to an age', () => {
    let birthday = '10/21/1996';

    expect(ConvertBirthdayToAge(birthday)).toMatchSnapshot();
})