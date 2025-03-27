import { Task } from "./task";
import { TeamMember } from "./member";

export interface Project {
  id: number;
  name: string;
  logo: string;
  description: string;
  backgroundImage: string;
  createdAt: string;
  dueDate: string;
  tasks: Task[];
  team: TeamMember[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Task Manager App",
    description: "A project management tool for organizing tasks, assigning team members, and tracking deadlines.",
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
            picture: "/p-picture.jpg",
            name: "Jane Smith",
            role: "Frontend Developer",
            assignedProjects: [
              {
                projectId: 1,
                tasks: [1],
              }
            ],
            email: "janny@example.com",
          },
          {
            id: 2,
            picture: "/p-picture2.jpg",
            name: "John Doe",
            role: "Backend Developer",
            assignedProjects: [
              {
                projectId: 1,
                tasks: [1],
              }
            ],
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-01-01T12:00:00.000Z",
      },
    ],
    team: [
      {
        id: 2,
        picture: "/p-picture2.jpg",
        name: "John Doe",
        assignedProjects: [
          {
            projectId: 1,
            tasks: [1],
          }
        ],
        role: "Backend Developer",
        email: "john.doe@example.com",
      },
      {
        id: 1,
        picture: "/p-picture.jpg",
        name: "Jane Smith",
        role: "Frontend Developer",
        assignedProjects: [
          {
            projectId: 1,
            tasks: [1],
          }
        ],
        email: "janny@example.com",
      },
    ],
  },
  {
    id: 2,
    name: "E-commerce Platform",
    logo: "https://example.com/ecommerce-logo.png",
    description: "An online shopping platform with a secure checkout system and product management features.",
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
            picture: "/p-picture.jpg",
            name: "Jane Smith",
            role: "Frontend Developer",
            assignedProjects: [
              {
                projectId: 1,
                tasks: [1],
              },
              {
                projectId: 2,
                tasks: [2],
              }
            ],
            email: "janny@example.com",
          },
          {
            id: 2,
            picture: "/p-picture2.jpg",
            name: "John Doe",
            role: "Backend Developer",
            assignedProjects: [
              {
                projectId: 1,
                tasks: [1],
              },
              {
                projectId: 2,
                tasks: [2],
              }
            ],
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-02-10T09:30:00.000Z",
      },
      {
        id: 3,
        title: "Implement Checkout System",
        description: "Develop a secure payment processing system",
        status: "in-list",
        assignedTo: [
          {
            id: 1,
            picture: "/p-picture.jpg",
            name: "Jane Smith",
            assignedProjects: [
              {
                projectId: 1,
                tasks: [1],
              },
              {
                projectId: 2,
                tasks: [2, 3],
              }
            ],
            role: "Frontend Developer",
            email: "janny@example.com",
          },
          {
            id: 2,
            picture: "/p-picture2.jpg",
            name: "John Doe",
            role: "Backend Developer",
            assignedProjects: [
              {
                projectId: 1,
                tasks: [1],
              },
              {
                projectId: 2,
                tasks: [2, 3],
              }
            ],
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-03-01T10:00:00.000Z",
      },
    ],
    team: [
      {
        id: 1,
        picture: "/p-picture.jpg",
        name: "Jane Smith",
        role: "Frontend Developer",
        assignedProjects: [
          {
            projectId: 1,
            tasks: [1],
          },
          {
            projectId: 2,
            tasks: [2, 3],
          }
        ],
        email: "janny@example.com",
      },
      {
        id: 3,
        picture: "/p-picture3.jpg",
        name: "Alice Brown",
        role: "Full Stack Developer",
        assignedProjects: [
          {
            projectId: 2,
            tasks: [3],
          }
        ],
        email: "alice.brown@example.com",
      },
      {
        id: 4,
        picture: "/p-picture4.jpg",
        name: "Janny Little",
        role: "Developer",
        assignedProjects: [
          {
            projectId: 2,
            tasks: [3],
          }
        ],
        email: "jan@example.com",
      },
      {
        id: 5,
        picture: "/p-picture5.jpg",
        name: "Smith Jack",
        role: "Full Stack Developer",
        assignedProjects: [
          {
            projectId: 2,
            tasks: [3],
          }
        ],
        email: "jack@example.com",
      },
    ],
  },
];


