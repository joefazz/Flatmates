export interface Post {
    id: string;
    lastSeen: Date;
    description: string;
    createdAt: Date;
    createdBy: House;
}

export interface House {
    shortID: number;
    road: string;
    billsPrice: number;
    rentPrice: number;
    spaces: number;
    coords: Array<string>;
    houseImages: Array<string>;

    createdAt: Date;
    updatedAt: Date;

    post: Post;
    users: Array<User>;
}

export interface User {
    facebookUserId: string;
    createdAt: Date;
    updatedAt: Date;

    email: string;
    name: string;
    firstName: string;
    lastName: string;
    birthday: string;

    gender: string;
    bio: string;
    course: string;
    studyYear: string;
    isSmoker: boolean;

    minPrice: number;
    maxPrice: number;

    genderPreference: string;

    group: Group;
    house: House;
    messages: Array<Message>;
    imageUrl: string;
}

export interface Group {
    id: string;

    createdAt: Date;
    updatedAt: Date;

    name: string;
    users: Array<User>;
    messages: Array<Message>;
}

export interface Message {
    id: string;

    createdAt: Date;

    text: string;
    from: User
    to: Group
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
    ENDED,
}

export enum Course {
    COMPUTER_SCIENCE,
    ENGLISH_LIT,
    HISTORY,
    CLASSICS,
    BUSINESS
}