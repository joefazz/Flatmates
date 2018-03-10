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
        facebookUserId: string,
        name: string,
        studyYear: string | null,
        birthday: string,
        gender: string,
        isSmoker: boolean | null,
        imageUrl: string,
        course: string | null,
      } > | null,
    },
  } | null,
};

export interface CreateUserMutationVariables {
  name: string,
  firstName: string,
  lastName: string,
  facebookUserId: string,
  email: string,
  imageUrl: string,
  birthday: string,
  gender: string,
};

export interface CreateUserMutation {
  createUser:  {
    facebookUserId: string,
  } | null,
};

export interface DeleteUserMutationVariables {
  facebookUserId: string,
};

export interface DeleteUserMutation {
  deleteUser:  {
    facebookUserId: string,
  } | null,
};

export interface StarPostMutationVariables {
  facebookUserId: string,
  postID: string,
};

export interface StarPostMutation {
  starPost:  {
    facebookUserId: string,
  } | null,
};

export interface UpdateUserMutationVariables {
  facebookUserId: string,
  bio: string,
  course: string,
  studyYear: string,
  isSmoker: boolean,
  minPrice: number,
  maxPrice: number,
  genderPreference: string,
};

export interface UpdateUserMutation {
  updateUser:  {
    facebookUserId: string,
  } | null,
};

export interface UpdateUserCreateHouseMutationVariables {
  facebookUserId: string,
  bio: string,
  course: string,
  studyYear: string,
  isSmoker: boolean,
  shortID: number,
  road: string,
  coords: Array< number >,
  rentPrice: number,
  billsPrice: number,
  spaces: number,
  houseImages: Array< string >,
};

export interface UpdateUserCreateHouseMutation {
  updateUserCreateHouse:  {
    facebookUserId: string,
    house:  {
      shortID: number,
    } | null,
  } | null,
};

export interface UpdateUserUpdateHouseMutationVariables {
  facebookUserId: string,
  bio: string,
  course: string,
  studyYear: string,
  isSmoker: boolean,
  houseId: number,
};

export interface UpdateUserUpdateHouseMutation {
  updateUserUpdateHouse:  {
    facebookUserId: string,
    house:  {
      shortID: number,
    } | null,
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
        facebookUserId: string,
        name: string,
        gender: string,
        bio: string | null,
        studyYear: string | null,
        isSmoker: boolean | null,
        imageUrl: string,
        course: string | null,
        birthday: string,
      } > | null,
    },
  } | null,
};

export interface AllPostsQueryVariables {
  take: number,
  skip?: number | null,
};

export interface AllPostsQuery {
  allPosts:  Array< {
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
  } | null > | null,
};

export interface UserChatQueryVariables {
  facebookUserId: string,
};

export interface UserChatQuery {
  user:  {
    name: string,
    group:  Array< {
      id: string,
      name: string,
    } > | null,
  } | null,
};

export interface UserPostQueryVariables {
  facebookUserId: string,
};

export interface UserPostQuery {
  user:  {
    house:  {
      shortID: number,
      spaces: number,
      road: string,
    } | null,
  } | null,
};

export interface UserDetailQueryVariables {
  facebookUserId: string,
};

export interface UserDetailQuery {
  user:  {
    course: string | null,
    bio: string | null,
    studyYear: string | null,
    isSmoker: boolean | null,
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
  facebookUserId: string,
};

export interface UserLoginQuery {
  user:  {
    facebookUserId: string,
    isSmoker: boolean | null,
    course: string | null,
    studyYear: string | null,
  } | null,
};

export interface UserStarredQueryVariables {
  facebookUserId: string,
};

export interface UserStarredQuery {
  user:  {
    facebookUserId: string,
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
