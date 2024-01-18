import { Client, User } from "@interfaces";

export interface Project {
  id: number;
  name: string;
  active: boolean;
  createdAt: Date;
  createdById: number;
  createdBy: User;
  updatedAt: Date;
  updatedById: number | null;
  updatedBy: User | null;
  clients: Client[];
}
