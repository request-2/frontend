import { Team } from '../Team/Team';
import { WithID } from '../Utils/WithID';

export type Role = 'Admin' | 'Operator' | 'Client';

export type User = {
  email: string;
  password: string;
  name: string;
  roles: Role[];
  teamId: number;
  dateCreated: number;
  active: boolean;
};

export type UserDetails = {
  _id: number;
  name: string;
  roles: Role[];
  team: WithID<Team>;
  dateCreated: Date;
};
