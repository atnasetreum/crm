import { User } from "@interfaces";

export interface Subscription {
  id: number;
  subscription: string;
  active: boolean;
  createdAt: Date;
  createdById: number;
  createdBy: User;
  updatedAt: Date;
  updatedById: number | null;
  updatedBy: User | null;
  user: User;
  userId: number;
}
