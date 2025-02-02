import { Task } from "./task";
import { Member } from "./member";

export interface Project {
  id: number;
  name: string;
  logo: string;
  backgroundImage: string;
  createdAt: string;
  dueDate: string;
  tasks: Task[];
  team: Member[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Task Manager App",
    logo: "https://example.com/task-manager-logo.png",
    backgroundImage: "/prbg3.jpg",
    createdAt: new Date().toISOString(),
    dueDate: "2025-06-30T23:59:59.000Z",
    tasks: [
      {
        id: 1,
        title: "Setup project structure",
        description: "Initialize Next.js, Express, and PostgresSQL setup",
        status: "in-list",
        assignedTo: [
          {
            id: 1,
            picture: "",
            name: "Jane Smith",
            role: "Frontend Developer",
            email: "john.doe@example.com",
          },
          {
            id: 1,
            picture: "",
            name: "John Doe",
            role: "Backend Developer",
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-01-01T12:00:00.000Z",
        dueDate: "2025-01-05T23:59:59.000Z",
      },
    ],
    team: [
      {
        id: 1,
        picture: "",
        name: "John Doe",
        role: "Backend Developer",
        email: "john.doe@example.com",
      },
    ],
  },
  {
    id: 2,
    name: "E-commerce Platform",
    logo: "https://example.com/ecommerce-logo.png",
    backgroundImage: "/prbg5.jpg",
    createdAt: new Date().toISOString(),
    dueDate: "2025-12-15T23:59:59.000Z",
    tasks: [
      {
        id: 2,
        title: "Design UI Components",
        description: "Create reusable UI components with Tailwind CSS",
        status: "in-list",
        assignedTo: [
          {
            id: 1,
            picture: "",
            name: "Jane Smith",
            role: "Frontend Developer",
            email: "john.doe@example.com",
          },
          {
            id: 1,
            picture: "",
            name: "John Doe",
            role: "Backend Developer",
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-02-10T09:30:00.000Z",
        dueDate: "2025-02-20T23:59:59.000Z",
      },
      {
        id: 3,
        title: "Implement Checkout System",
        description: "Develop a secure payment processing system",
        status: "in-list",
        assignedTo: [
          {
            id: 1,
            picture: "",
            name: "Jane Smith",
            role: "Frontend Developer",
            email: "john.doe@example.com",
          },
          {
            id: 1,
            picture: "",
            name: "John Doe",
            role: "Backend Developer",
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-03-01T10:00:00.000Z",
        dueDate: "2025-03-15T23:59:59.000Z",
      },
    ],
    team: [
      {
        id: 2,
        picture: "",
        name: "Jane Smith",
        role: "Frontend Developer",
        email: "jane.smith@example.com",
      },
      {
        id: 3,
        picture: "",
        name: "Alice Brown",
        role: "Full Stack Developer",
        email: "alice.brown@example.com",
      },
      {
        id: 4,
        picture: "",
        name: "Janny",
        role: "Developer",
        email: "jasmith@example.com",
      },
      {
        id: 5,
        picture: "",
        name: "Smith",
        role: "Full Stack Developer",
        email: "smith@example.com",
      },
      {
        id: 6,
        picture: "",
        name: "Jane Smith",
        role: "Frontend Developer",
        email: "jane.smith@example.com",
      },
      {
        id: 7,
        picture: "",
        name: "Alice Brown",
        role: "Full Stack Developer",
        email: "alice.brown@example.com",
      },
      {
        id: 8,
        picture: "",
        name: "Janny",
        role: "Developer",
        email: "jasmith@example.com",
      },
      {
        id: 9,
        picture: "",
        name: "Smith",
        role: "Full Stack Developer",
        email: "smith@example.com",
      },
      {
        id: 10,
        picture: "",
        name: "Smith",
        role: "Full Stack Developer",
        email: "smith@example.com",
      },
      {
        id: 11,
        picture: "",
        name: "Smith",
        role: "Full Stack Developer",
        email: "smith@example.com",
      },
      {
        id: 12,
        picture: "",
        name: "Smith",
        role: "Full Stack Developer",
        email: "smith@example.com",
      },
    ],
  },
];
