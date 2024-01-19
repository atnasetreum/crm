import { Client, User } from "@interfaces";

export interface Event {
  id: number;
  date: Date;
  comment: string;
  active: boolean;
  createdAt: Date;
  createdById: number;
  createdBy: User;
  updatedAt: Date;
  updatedById: number | null;
  updatedBy: User | null;
  client: Client;
  clientId: number;
}
