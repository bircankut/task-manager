import {TeamMember} from "@/entities/models/member";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: TeamMember[];
  tags: string[];
  discussions: string[];
  attachments: Attachment[];
  createdAt: string;
}

export interface Attachment {
  id: number;
  fileName: string;
  fileUrl: string;
}

