import { TeamMember } from "@/entities/models/member";
import { TASK_STATUS } from "@/enums/task-status";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TASK_STATUS;
  assignedTo: TeamMember[];
  tags: string[];
  discussions: string[];
  attachments: Attachment[];
  createdAt: string;
  dueDate: string;
  lastModifiedAt: string;
}

export interface Attachment {
  id: number;
  fileName: string;
  fileUrl: string;
}
