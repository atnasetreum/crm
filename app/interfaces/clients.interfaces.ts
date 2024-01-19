import { Comment, Event, Project, User } from "@interfaces";
export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  birthdate: Date;

  active: boolean;
  createdAt: Date;
  createdById: number;
  createdBy: User;
  updatedAt: Date;
  updatedById: number | null;
  updatedBy: User | null;

  projects: Project[];
  comments: Comment[];
  events: Event[];
}
