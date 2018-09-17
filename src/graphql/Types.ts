/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface CompleteApplicationMutationVariables {
  applicantID: string,
  houseID: number,
  houseName: string,
  applicantName: string,
};

export interface CompleteApplicationMutation {
  completeApplication:  {
    shortID: number,
    road: string,
    groups:  Array< {
      id: string,
      messages:  Array< {
        id: string,
        text: string,
      } > | null,
      applicant:  {
        id: string,
      } | null,
      house:  {
        shortID: number,
        road: string,
      },
    } > | null,
    houseImages: Array< string >,
    applications:  Array< {
      id: string,
    } > | null,
  } | null,
};

export interface CreateApplicationMutationVariables {
  userID: string,
  houseID: number,
  from: string,
  message?: string | null,
};

export interface CreateApplicationMutation {
  createApplication:  {
    id: string,
    isActive: boolean,
    from:  {
      id: string,
      name: string,
      firstName: string,
      lastName: string,
      course: string | null,
      age: number | null,
      bio: string,
      studyYear: string | null,
      profilePicture: string | null,
      gender: string | null,
      isSmoker: boolean,
      isDrinker: boolean,
      minPrice: number | null,
      maxPrice: number | null,
      genderPreference: string | null,
      house:  {
        shortID: number,
      } | null,
    },
    to:  {
      shortID: number,
      houseImages: Array< string >,
      road: string,
      coords: Array< number >,
      spaces: number,
      billsPrice: number,
      rentPrice: number,
      post:  {
        id: string,
        description: string,
      } | null,
      users:  Array< {
        id: string,
        name: string,
        profilePicture: string | null,
        course: string | null,
        studyYear: string | null,
      } > | null,
    },
    createdAt: string,
  } | null,
};

export interface DeleteApplicationMutationVariables {
  id: string,
  road: string,
  applicantID: string,
  houseID: number,
};

export interface DeleteApplicationMutation {
  deleteApplication:  {
    id: string,
  } | null,
};

export interface UpdateApplicationMutationVariables {
  id: string,
  isActive: boolean,
};

export interface UpdateApplicationMutation {
  updateApplication:  {
    id: string,
    isActive: boolean,
  } | null,
};

export interface CreateMessageMutationVariables {
  text: string,
  senderID: string,
  applicantID?: string | null,
  houseID: number,
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
    images: Array< string >,
    to:  {
      id: string,
    } | null,
    from:  {
      id: string,
      name: string,
      profilePicture: string | null,
      house:  {
        shortID: number,
      } | null,
    },
  } | null,
};

export interface CreateGroupMutationVariables {
  approverName: string,
  applicantName: string,
  houseID: number,
  applicantID: string,
  roadName: string,
};

export interface CreateGroupMutation {
  createGroup:  {
    id: string,
    applicant:  {
      id: string,
      name: string,
      profilePicture: string | null,
    } | null,
    house:  {
      shortID: number,
      road: string,
      houseImages: Array< string >,
      users:  Array< {
        id: string,
        profilePicture: string | null,
        name: string,
      } > | null,
    },
    messages:  Array< {
      id: string,
      text: string,
    } > | null,
  } | null,
};

export interface UpdateHouseMutationVariables {
  shortID: number,
  road?: string | null,
  coords?: Array< number > | null,
  spaces?: number | null,
  rentDue?: string | null,
  billsDue?: string | null,
  rentPrice?: number | null,
  billsPrice?: number | null,
};

export interface UpdateHouseMutation {
  updateHouse:  {
    shortID: number,
    road: string,
    spaces: number,
    rentPrice: number,
    billsPrice: number,
  } | null,
};

export interface CreatePostMutationVariables {
  description: string,
  createdBy: number,
};

export interface CreatePostMutation {
  createPost:  {
    __typename: "Post",
    id: string,
    description: string,
    createdAt: string,
    lastSeen: string | null,
    viewCount: number | null,
    createdBy:  {
      shortID: number,
      road: string,
      coords: Array< number >,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      houseImages: Array< string >,
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
      coords: Array< number >,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      houseImages: Array< string >,
      users:  Array< {
        id: string,
        name: string,
        bio: string,
        studyYear: string | null,
        age: number | null,
        gender: string | null,
        isSmoker: boolean,
        isDrinker: boolean,
        profilePicture: string | null,
        course: string | null,
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
  age?: number | null,
  gender?: string | null,
  profilePicture?: string | null,
  course?: string | null,
  studyYear?: string | null,
  isSmoker: boolean,
  isDrinker: boolean,
  bio: string,
  maxPrice?: number | null,
  minPrice?: number | null,
  genderPreference?: string | null,
  drinkPreference?: string | null,
  smokerPreference?: string | null,
};

export interface CreateUserMutation {
  createUser:  {
    id: string,
    email: string,
    authId: string,
    firstName: string,
    lastName: string,
    name: string,
    age: number | null,
    bio: string,
    gender: string | null,
    course: string | null,
    studyYear: string | null,
    email_verified: boolean,
    profilePicture: string | null,
    isDrinker: boolean,
    isSmoker: boolean,
    maxPrice: number | null,
    minPrice: number | null,
    genderPreference: string | null,
    house:  {
      shortID: number,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
    } | null,
  } | null,
};

export interface CreateUserCreateHouseMutationVariables {
  email: string,
  authId: string,
  firstName: string,
  lastName: string,
  name: string,
  bio: string,
  email_verified: boolean,
  age?: number | null,
  gender?: string | null,
  course?: string | null,
  studyYear?: string | null,
  profilePicture?: string | null,
  isDrinker: boolean,
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
    email: string,
    authId: string,
    firstName: string,
    lastName: string,
    name: string,
    age: number | null,
    bio: string,
    gender: string | null,
    course: string | null,
    studyYear: string | null,
    email_verified: boolean,
    profilePicture: string | null,
    isDrinker: boolean,
    isSmoker: boolean,
    maxPrice: number | null,
    minPrice: number | null,
    genderPreference: string | null,
    house:  {
      shortID: number,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
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
  age?: number | null,
  gender?: string | null,
  profilePicture?: string | null,
  course?: string | null,
  studyYear?: string | null,
  isSmoker: boolean,
  isDrinker: boolean,
  bio: string,
  houseId: number,
};

export interface CreateUserUpdateHouseMutation {
  createUserUpdateHouse:  {
    id: string,
    email: string,
    authId: string,
    firstName: string,
    lastName: string,
    name: string,
    age: number | null,
    bio: string,
    gender: string | null,
    course: string | null,
    studyYear: string | null,
    email_verified: boolean,
    profilePicture: string | null,
    isDrinker: boolean,
    isSmoker: boolean,
    maxPrice: number | null,
    minPrice: number | null,
    genderPreference: string | null,
    house:  {
      shortID: number,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
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

export interface LeaveHouseMutationVariables {
  id: string,
  name: string,
  houseID: number,
};

export interface LeaveHouseMutation {
  leaveHouse:  {
    id: string,
    name: string,
    house:  {
      road: string,
    } | null,
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

export interface UpdateUserMutationVariables {
  id: string,
  name?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  profilePicture?: string | null,
  age?: number | null,
  course?: string | null,
  bio?: string | null,
  studyYear?: string | null,
  gender?: string | null,
  isSmoker?: boolean | null,
  isDrinker?: boolean | null,
};

export interface UpdateUserMutation {
  updateUser:  {
    id: string,
    name: string,
    firstName: string,
    lastName: string,
    profilePicture: string | null,
    age: number | null,
    course: string | null,
    bio: string,
    studyYear: string | null,
    gender: string | null,
    isSmoker: boolean,
    isDrinker: boolean,
  } | null,
};

export interface VerifyEmailMutationVariables {
  email: string,
  email_verified: boolean,
};

export interface VerifyEmailMutation {
  verifyEmail:  {
    id: string,
    email: string,
    email_verified: boolean,
  } | null,
};

export interface ChatMessagesQueryVariables {
  id: string,
  skip?: number | null,
};

export interface ChatMessagesQuery {
  group:  {
    id: string,
    messages:  Array< {
      id: string,
      createdAt: string,
      text: string,
      images: Array< string >,
      to:  {
        id: string,
      } | null,
      from:  {
        id: string,
        name: string,
        profilePicture: string | null,
        house:  {
          shortID: number,
        } | null,
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
      isActive: boolean,
      from:  {
        id: string,
        name: string,
        firstName: string,
        lastName: string,
        course: string | null,
        age: number | null,
        bio: string,
        studyYear: string | null,
        profilePicture: string | null,
        gender: string | null,
        isSmoker: boolean,
        isDrinker: boolean,
        minPrice: number | null,
        maxPrice: number | null,
        genderPreference: string | null,
        house:  {
          shortID: number,
        } | null,
      },
      to:  {
        shortID: number,
        houseImages: Array< string >,
        road: string,
        coords: Array< number >,
        spaces: number,
        billsPrice: number,
        rentPrice: number,
        post:  {
          id: string,
          description: string,
        } | null,
        users:  Array< {
          id: string,
          name: string,
          profilePicture: string | null,
          course: string | null,
          studyYear: string | null,
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
      applicant:  {
        id: string,
        name: string,
        profilePicture: string | null,
        house:  {
          shortID: number,
        } | null,
      } | null,
      house:  {
        shortID: number,
        houseImages: Array< string >,
        road: string,
        users:  Array< {
          id: string,
          profilePicture: string | null,
          name: string,
        } > | null,
      },
      messages:  Array< {
        id: string,
        createdAt: string,
        text: string,
        images: Array< string >,
        to:  {
          id: string,
        } | null,
        from:  {
          id: string,
          name: string,
          profilePicture: string | null,
          house:  {
            shortID: number,
          } | null,
        },
      } > | null,
    } > | null,
  } | null,
};

export interface HouseDetailQueryVariables {
  shortID: number,
};

export interface HouseDetailQuery {
  house:  {
    shortID: number,
    road: string,
    billsPrice: number,
    rentPrice: number,
    spaces: number,
    houseImages: Array< string >,
    applicationCount: number | null,
    post:  {
      id: string,
      viewCount: number | null,
    } | null,
    users:  Array< {
      id: string,
      name: string,
      profilePicture: string | null,
    } > | null,
  } | null,
};

export interface HousePostQueryVariables {
  shortID: number,
};

export interface HousePostQuery {
  house:  {
    shortID: number,
    road: string,
    billsPrice: number,
    rentPrice: number,
    spaces: number,
    houseImages: Array< string >,
    applicationCount: number | null,
    post:  {
      __typename: "Post",
      id: string,
      description: string,
      lastSeen: string | null,
      viewCount: number | null,
    } | null,
    users:  Array< {
      id: string,
      name: string,
      profilePicture: string | null,
    } > | null,
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
      coords: Array< number >,
      road: string,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      houseImages: Array< string >,
      users:  Array< {
        id: string,
        name: string,
        gender: string | null,
        age: number | null,
        bio: string,
        studyYear: string | null,
        isSmoker: boolean,
        isDrinker: boolean,
        profilePicture: string | null,
        course: string | null,
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
      shortID: number,
      road: string,
      coords: Array< number >,
      billsPrice: number,
      rentPrice: number,
      spaces: number,
      houseImages: Array< string >,
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
      isActive: boolean,
      from:  {
        id: string,
        name: string,
        firstName: string,
        lastName: string,
        course: string | null,
        age: number | null,
        bio: string,
        studyYear: string | null,
        profilePicture: string | null,
        gender: string | null,
        isSmoker: boolean,
        isDrinker: boolean,
        minPrice: number | null,
        maxPrice: number | null,
        genderPreference: string | null,
        house:  {
          shortID: number,
        } | null,
      },
      to:  {
        shortID: number,
        houseImages: Array< string >,
        road: string,
        coords: Array< number >,
        spaces: number,
        billsPrice: number,
        rentPrice: number,
        post:  {
          id: string,
          description: string,
        } | null,
        users:  Array< {
          id: string,
          name: string,
          profilePicture: string | null,
          course: string | null,
          studyYear: string | null,
        } > | null,
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
      applicant:  {
        id: string,
        name: string,
        profilePicture: string | null,
        house:  {
          shortID: number,
        } | null,
      } | null,
      house:  {
        shortID: number,
        houseImages: Array< string >,
        road: string,
        users:  Array< {
          id: string,
          profilePicture: string | null,
          name: string,
        } > | null,
      },
      messages:  Array< {
        id: string,
        createdAt: string,
        text: string,
        images: Array< string >,
        to:  {
          id: string,
        } | null,
        from:  {
          id: string,
          name: string,
          profilePicture: string | null,
          house:  {
            shortID: number,
          } | null,
        },
      } > | null,
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
      coords: Array< number >,
      billsPrice: number,
      rentPrice: number,
      houseImages: Array< string >,
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
    lastName: string,
    course: string | null,
    bio: string,
    age: number | null,
    gender: string | null,
    studyYear: string | null,
    isSmoker: boolean,
    isDrinker: boolean,
    genderPreference: string | null,
    profilePicture: string | null,
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
      houseImages: Array< string >,
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
    age: number | null,
    bio: string,
    gender: string | null,
    course: string | null,
    studyYear: string | null,
    email_verified: boolean,
    profilePicture: string | null,
    isDrinker: boolean,
    isSmoker: boolean,
    maxPrice: number | null,
    minPrice: number | null,
    genderPreference: string | null,
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
        coords: Array< number >,
        billsPrice: number,
        rentPrice: number,
        spaces: number,
        houseImages: Array< string >,
      },
    } > | null,
  } | null,
};

export interface MessageAddedSubscriptionVariables {
  groupID: string,
  userID: string,
};

export interface MessageAddedSubscription {
  message:  {
    node:  {
      id: string,
      createdAt: string,
      text: string,
      images: Array< string >,
      to:  {
        id: string,
      } | null,
      from:  {
        id: string,
        name: string,
        profilePicture: string | null,
        house:  {
          shortID: number,
        } | null,
      },
    } | null,
  } | null,
};
