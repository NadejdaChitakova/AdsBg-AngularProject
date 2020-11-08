import { User } from './user';

export interface Ad {
  id: number;
  title: string;
  description: string;
  likes: number;
  type: AdType;
  category: AdCategory;
  appliedUsers: User[];
}

export enum AdType {
  partTime = 'part-time',
  fullTime = 'full-time',
  remote = 'remote',
}

export enum AdCategory {
  officeAdministration = 'Office administration',
  development = 'Development',
}
