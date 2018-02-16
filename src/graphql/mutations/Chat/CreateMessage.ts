// import gql from 'graphql-tag';

// import { MESSAGE_FRAGMENT } from '../../Fragments';

// export const CREATE_MESSAGE_MUTATION = gql`
//     mutation createMessage($text: String!, $createdById: Int!, $toId: Int!) {
//         createMessage(text: $text, createdById: $createdById, toId: $toId) {
//             ... MessageFragment
//         }
//     }
//     ${MESSAGE_FRAGMENT}
// `;