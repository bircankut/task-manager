import { DataType } from "csstype";
import Attachment = DataType.Attachment;
import {Member} from "@/entities/models/member";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: Member[];
  tags: String[];
  discussions: String[];
  attachments: Attachment[];
  createdAt: string;
  dueDate: string;
}
