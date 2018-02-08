import client from '../../Client';
import { 
    CREATE_USER_MUTATION, 
    UPDATE_USER_MUTATION, 
    UPDATE_USER_CREATE_HOUSE_MUTATION, 
    UPDATE_USER_UPDATE_HOUSE_MUTATION, 
    DELETE_USER_MUTATION
} from '../mutations';
import { USER_LOGIN_QUERY } from '../queries';

const fbUserId = "1094570280677619";

/* THESE BLOODY WOULD WORK IF JEST WASN'T SUCH A SHIT */
// TODO: Fix stupid timeout which obviously isn't a timeout
test('Create user in GraphQL server', async () => {
    let response = await client.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
            name: "Joe Fazzino", 
            firstName: "Joe",
            lastName: "Fazzino",
            email: "joseph@fazzino.net", 
            facebookUserId: fbUserId,
            imageUrl: "http://placekitten.com/200/200",
            gender: "male",
            birthday: "10/21/1996"
        },
    });

    expect(response.data.createUser.facebookUserId).toEqual(fbUserId);
});

test('Query user in GraphQL server', async () => {
    let response = await client.query({
        query: USER_LOGIN_QUERY,
        variables: {facebookUserId: fbUserId}
    });

    expect(response.data.user.facebookUserId).toEqual(fbUserId);
})

test('Delete user in GraphQL server', async () => {
    let response = await client.mutate({
        mutation: DELETE_USER_MUTATION,
        variables: { facebookUserId: fbUserId }
    });
    await expect(response.data.deleteUser.facebookUserId).toEqual(fbUserId);
});

// test('Update User only', () => {
//     await client.mutate({
//         mutation: UPDATE_USER_MUTATION,
//         variables: {}
//     });
// })

// test('Update User, Create House', () => {
//     await client.mutate({
//         mutation: UPDATE_USER_CREATE_HOUSE_MUTATION,
//         variables: {}
//     });
// })

// test('Update User, Update House', () => {
//     await client.mutate({
//         mutation: UPDATE_USER_UPDATE_HOUSE_MUTATION,
//         variables: {}
//     })
// })