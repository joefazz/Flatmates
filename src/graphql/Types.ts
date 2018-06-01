/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CreateApplicationMutationVariables {
  userID: string,
  houseID: number,
  playerIDs: Array< string >,
  from: string,
  message?: string | null,
};

export interface CreateApplicationMutation {
  createApplication:  {
    id: string,
    to:  {
      shortID: number,
      houseImages: Array< string > | null,
      road: string,
      billsPrice: number,
      rentPrice: number,
      post:  {
        id: string,
        description: string,
      } | null,
    },
    createdAt: string,
  } | null,
};

export interface DeleteApplicationMutationVariables {
  id: string,
};

export interface DeleteApplicationMutation {
  deleteApplication:  {
    id: string,
  } | null,
};

export interface CreateMessageMutationVariables {
  playerIDs: Array< string >,
  text: string,
  senderID: string,
  senderName: string,
  groupID: string,
  images: Array< string >,
  groupName: string,
};

export interface CreateMessageMutation {
  createMessage:  {
    id: string,
    createdAt: string,
    text: string,
    from:  {
      id: string,
      name: string,
      profilePicture: string,
    },
  } | null,
};

export interface CreateGroupMutationVariables {
  playerID?: string | null,
  approverName: string,
  applicantName: string,
  houseID: number,
  applicantID: string,
  roadName: string,
  housePlayerIDs: Array< string >,
};

export interface CreateGroupMutation {
  createGroup:  {
    id: string,
    name: string,
    applicant:  {
      id: string,
      name: string,
      profilePicture: string,
      playerId: string | null,
    } | null,
    house:  {
      shortID: number,
      houseImages: Array< string > | null,
      users:  Array< {
        id: string,
        playerId: string | null,
        profilePicture: string,
        name: string,
      } > | null,
    },
  } | null,
};

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
        playerId: string | null,
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
  playerId?: string | null,
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
  drugPreference?: string | null,
  drinkPreference?: string | null,
  smokerPreference?: string | null,
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
  playerId?: string | null,
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
  rentDue?: string | null,
  billsDue?: string | null,
};

export interface CreateUserCreateHouseMutation {
  createUserCreateHouse:  {
    id: string,
    name: string,
  } | null,
};

export interface CreateUserUpdateHouseMutationVariables {
  name: string,
  email: string,
  authId: string,
  playerId?: string | null,
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

export interface UserPlayerIDMutationVariables {
  id: string,
  playerID: string,
};

export interface UserPlayerIDMutation {
  updateUserPlayerID:  {
    id: string,
    playerId: string | null,
  } | null,
};

export interface ChatMessagesQueryVariables {
  id: string,
};

export interface ChatMessagesQuery {
  group:  {
    messages:  Array< {
      id: string,
      createdAt: string,
      text: string,
      from:  {
        id: string,
        name: string,
        profilePicture: string,
      },
    } > | null,
  } | null,
};

export interface HouseApplicationsQueryVariables {
  shortID: number,
};

export interface HouseApplicationsQuery {
  house:  {
    shortID: number,
    applications:  Array< {
      id: string,
      from:  {
        id: string,
        name: string,
        firstName: string,
        lastName: string,
        course: string,
        age: number,
        bio: string,
        studyYear: string,
        profilePicture: string,
        gender: string,
        isSmoker: boolean,
        isDruggie: boolean,
        isDrinker: boolean,
        minPrice: number | null,
        maxPrice: number | null,
        genderPreference: string | null,
        playerId: string | null,
      },
      to:  {
        users:  Array< {
          id: string,
          playerId: string | null,
        } > | null,
      },
      createdAt: string,
    } > | null,
  } | null,
};

export interface HouseChatQueryVariables {
  shortID: number,
};

export interface HouseChatQuery {
  house:  {
    shortID: number,
    groups:  Array< {
      id: string,
      name: string,
      applicant:  {
        id: string,
        name: string,
        profilePicture: string,
        playerId: string | null,
      } | null,
      house:  {
        shortID: number,
        houseImages: Array< string > | null,
        users:  Array< {
          id: string,
          playerId: string | null,
          profilePicture: string,
          name: string,
        } > | null,
      },
    } > | null,
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

export interface HousePostQueryVariables {
  id: string,
};

export interface HousePostQuery {
  user:  {
    house:  {
      post:  {
        id: string,
        description: string,
        lastSeen: string | null,
      } | null,
    } | null,
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

export interface UserApplicationsQueryVariables {
  id: string,
};

export interface UserApplicationsQuery {
  user:  {
    id: string,
    applications:  Array< {
      id: string,
      to:  {
        shortID: number,
        houseImages: Array< string > | null,
        road: string,
        billsPrice: number,
        rentPrice: number,
        post:  {
          id: string,
          description: string,
        } | null,
      },
      createdAt: string,
    } > | null,
  } | null,
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
    groups:  Array< {
      id: string,
      name: string,
      applicant:  {
        id: string,
        name: string,
        profilePicture: string,
        playerId: string | null,
      } | null,
      house:  {
        shortID: number,
        houseImages: Array< string > | null,
        users:  Array< {
          id: string,
          playerId: string | null,
          profilePicture: string,
          name: string,
        } > | null,
      },
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
    id: string,
    name: string,
    firstName: string,
    course: string,
    bio: string,
    age: number,
    gender: string,
    studyYear: string,
    isSmoker: boolean,
    isDrinker: boolean,
    isDruggie: boolean,
    genderPreference: string | null,
    profilePicture: string,
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
    playerId: string | null,
    house:  {
      shortID: number,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
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
