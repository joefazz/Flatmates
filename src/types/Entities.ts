export interface Post {
    id: string;
    lastSeen: string;
    description: string;
    createdAt: string;
    createdBy: House;
    viewCount?: number;
}

export interface House {
    shortID: number;
    road: string;
    billsPrice: number;
    rentPrice: number;
    spaces: number;
    coords: Array<number>;
    houseImages: Array<string>;
    applicationCount: number;
    createdAt: Date;
    updatedAt: Date;

    post: Post;
    users: Array<User>;
}

export interface Application {
    id: string;
    isActive: boolean;

    from: User;
    to: House;
    message: string;
    createdAt: DateConstructor;
}

export interface User {
    id: string;
    groups?: [];
    email: string;
    email_verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    firstName: string;
    lastName: string;
    age: number;
    authId: string;

    gender: string;
    bio: string;
    course: string;
    studyYear: string;
    isSmoker: boolean;
    isDrinker: boolean;

    minPrice: number;
    maxPrice: number;

    genderPreference: string;
    drinkPreference: string;
    smokerPreference: string;

    starredPosts: Array<Post>;
    group: Group;
    house: House;
    messages: Array<Message>;
    profilePicture: string;
}

export interface Group {
    id: string;

    createdAt: string;
    updatedAt: string;

    name: string;
    house: House;
    applicant: User;
    messages: Array<Message>;
}

export interface Message {
    id: string;

    createdAt: string;

    images?: string[];
    text: string;
    from: User;
    to: Group;
}

export enum StudyYear {
    FIRST = 'First Year',
    SECOND = 'Second Year',
    THIRD = 'Third Year',
    PLACEMENT = 'Placement Year',
    MASTERS = 'Masters',
    PHD = 'PhD'
}

export enum LoginStatus {
    NOT_STARTED,
    STARTED,
    SUCCEED,
    FAILED,
    ENDED
}

export enum Course {
    COMPUTER_SCIENCE,
    ENGLISH_LIT,
    HISTORY,
    CLASSICS,
    BUSINESS
}
