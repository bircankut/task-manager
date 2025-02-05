
export interface TeamMember {
  id: number;
  picture: string;
  name: string;
  role: string;
  email: string;
  assignedProjects: AssignedProject[];
}

export interface AssignedProject {
  projectId: number;
  tasks: number[];
}
