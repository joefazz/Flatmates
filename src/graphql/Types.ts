/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CreatePostMutationVariables {
  description: string,
  createdBy: number,
};

export interface CreatePostMutation {
  createPost:  {
    id: string,
    description: string,
    createdAt: string,
    createdBy:  {
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      houseImages: Array< string > | null,
    },
  } | null,
};

export interface DeletePostMutationVariables {
  id: string,
};

export interface DeletePostMutation {
  deletePost:  {
    id: string,
  } | null,
};

export interface UpdatePostMutationVariables {
  id: string,
  lastSeen: string,
};

export interface UpdatePostMutation {
  updatePost:  {
    id: string,
    description: string,
    createdBy:  {
      shortID: number,
      coords: Array< number > | null,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      houseImages: Array< string > | null,
      users:  Array< {
        id: string,
        name: string,
        studyYear: string,
        age: number,
        gender: string,
        isSmoker: boolean,
        isDruggie: boolean,
        isDrinker: boolean,
        profilePicture: string,
        course: string,
      } > | null,
    },
  } | null,
};

export interface CreateUserMutationVariables {
  name: string,
  email: string,
  authId: string,
  email_verified: boolean,
  firstName: string,
  lastName: string,
  age: number,
  gender: string,
  profilePicture: string,
  course: string,
  studyYear: string,
  isSmoker: boolean,
  isDruggie: boolean,
  isDrinker: boolean,
  bio: string,
  maxPrice?: number | null,
  minPrice?: number | null,
  genderPreference?: string | null,
};

export interface CreateUserMutation {
  createUser:  {
    id: string,
    name: string,
  } | null,
};

export interface CreateUserCreateHouseMutationVariables {
  email: string,
  authId: string,
  firstName: string,
  lastName: string,
  name: string,
  age: number,
  bio: string,
  gender: string,
  course: string,
  studyYear: string,
  email_verified: boolean,
  profilePicture: string,
  isDrinker: boolean,
  isDruggie: boolean,
  isSmoker: boolean,
  shortID: number,
  road: string,
  coords: Array< number >,
  rentPrice: number,
  billsPrice: number,
  spaces: number,
  houseImages: Array< string >,
};

export interface CreateUserCreateHouseMutation {
  createUserCreateHouse:  {
    id: string,
    house:  {
      shortID: number,
    } | null,
  } | null,
};

export interface CreateUserUpdateHouseMutationVariables {
  name: string,
  email: string,
  authId: string,
  email_verified: boolean,
  firstName: string,
  lastName: string,
  age: number,
  gender: string,
  profilePicture: string,
  course: string,
  studyYear: string,
  isSmoker: boolean,
  isDruggie: boolean,
  isDrinker: boolean,
  bio: string,
  houseId: number,
};

export interface CreateUserUpdateHouseMutation {
  createUserUpdateHouse:  {
    id: string,
    house:  {
      shortID: number,
    } | null,
  } | null,
};

export interface DeleteUserMutationVariables {
  id: string,
};

export interface DeleteUserMutation {
  deleteUser:  {
    id: string,
  } | null,
};

export interface StarPostMutationVariables {
  id: string,
  postID: string,
};

export interface StarPostMutation {
  starPost:  {
    id: string,
  } | null,
};

export interface UnstarPostMutationVariables {
  id: string,
  postID: string,
};

export interface UnstarPostMutation {
  unstarPost:  {
    id: string,
  } | null,
};

export interface HouseDetailQueryVariables {
  shortID: number,
};

export interface HouseDetailQuery {
  house:  {
    road: string,
    billsPrice: number,
    rentPrice: number,
    spaces: number,
    houseImages: Array< string > | null,
  } | null,
};

export interface PostDetailQueryVariables {
  id: string,
};

export interface PostDetailQuery {
  post:  {
    id: string,
    description: string,
    createdAt: string,
    createdBy:  {
      coords: Array< number > | null,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      houseImages: Array< string > | null,
      users:  Array< {
        id: string,
        name: string,
        gender: string,
        age: number,
        bio: string,
        studyYear: string,
        isSmoker: boolean,
        isDrinker: boolean,
        isDruggie: boolean,
        profilePicture: string,
        course: string,
      } > | null,
    },
  } | null,
};

export interface AllPostsQueryVariables {
  take: number,
};

export interface AllPostsQuery {
  allPosts:  Array< {
    id: string,
    description: string,
    createdAt: string,
    lastSeen: string | null,
    createdBy:  {
      shortID: number,
      road: string,
      coords: Array< number > | null,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      houseImages: Array< string > | null,
    },
  } | null > | null,
};

export interface BasicStarredQueryVariables {
  id: string,
};

export interface BasicStarredQuery {
  user:  {
    id: string,
    starredPosts:  Array< {
      id: string,
    } > | null,
  } | null,
};

export interface UserChatQueryVariables {
  id: string,
};

export interface UserChatQuery {
  user:  {
    id: string,
    name: string,
    group:  Array< {
      id: string,
      name: string,
    } > | null,
  } | null,
};

export interface UserPostQueryVariables {
  id: string,
};

export interface UserPostQuery {
  user:  {
    id: string,
    house:  {
      shortID: number,
      spaces: number,
      road: string,
    } | null,
  } | null,
};

export interface UserDetailQueryVariables {
  id: string,
};

export interface UserDetailQuery {
  user:  {
    name: string,
    course: string,
    bio: string,
    studyYear: string,
    isSmoker: boolean,
    genderPreference: string | null,
    maxPrice: number | null,
    minPrice: number | null,
    house:  {
      shortID: number,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      users:  Array< {
        name: string,
      } > | null,
      houseImages: Array< string > | null,
    } | null,
  } | null,
};

export interface UserLoginQueryVariables {
  email: string,
};

export interface UserLoginQuery {
  user:  {
    id: string,
    email: string,
    authId: string,
    firstName: string,
    lastName: string,
    name: string,
    age: number,
    bio: string,
    gender: string,
    course: string,
    studyYear: string,
    email_verified: boolean,
    profilePicture: string,
    isDrinker: boolean,
    isDruggie: boolean,
    isSmoker: boolean,
    maxPrice: number | null,
    minPrice: number | null,
    genderPreference: string | null,
    house:  {
      shortID: number,
    } | null,
  } | null,
};

export interface UserStarredQueryVariables {
  id: string,
};

export interface UserStarredQuery {
  user:  {
    id: string,
    starredPosts:  Array< {
      id: string,
      description: string,
      createdAt: string,
      lastSeen: string | null,
      createdBy:  {
        road: string,
        coords: Array< number > | null,
        billsPrice: number,
        rentPrice: number,
        spaces: number,
        houseImages: Array< string > | null,
      },
    } > | null,
  } | null,
};
