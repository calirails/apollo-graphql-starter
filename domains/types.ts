export interface UserIdentity {
  _id: string;
  name: string;
  roles: string[];
}

export interface PlayerIdentity {
  _id: string;
  name: string;
  number: number;
}