import { Project, Subscription } from "@interfaces";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  createdAt: Date;
  createdById: number;
  createdBy: User;
  updatedAt: Date;
  updatedById: number | null;
  updatedBy: User | null;
  projects: Project[];
  subscriptions: Subscription[];
}
