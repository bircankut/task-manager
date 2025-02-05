import {TeamMember} from "@/entities/models/member";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: TeamMember[];
  tags: String[];
  discussions: String[];
  attachments: Attachment[];
  createdAt: string;
  dueDate: string;
}

export interface Attachment {
  id: number;
  fileName: string;
  fileUrl: string;
}

