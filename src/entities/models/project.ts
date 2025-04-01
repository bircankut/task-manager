import { Task } from "./task";
import { TeamMember } from "./member";
import { TASK_STATUS } from "@/enums/task-status";

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
    backgroundImage: "/bg6.jpg",
    createdAt: new Date().toISOString(),
    dueDate: "2025-06-30T23:59:59.000Z",
    tasks: [
      {
        id: 1,
        title: "Setup project structure",
        description: "Initialize Next.js, Express, and PostgresSQL setup",
        status: TASK_STATUS.TODO,
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
                tasks: [2, 3, 4],
              },
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
                tasks: [2, 3],
              },
            ],
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-01-01T12:00:00.000Z",
        dueDate: "2025-02-15T23:59:59.000Z",
        lastModifiedAt: "2025-02-04T23:59:59.000Z",
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
          },
          {
            projectId: 2,
            tasks: [2, 3],
          },
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
          },
          {
            projectId: 2,
            tasks: [2, 3, 4],
          },
        ],
        email: "janny@example.com",
      },
    ],
  },
  {
    id: 2,
    name: "E-commerce Platform",
    logo: "https://example.com/ecommerce-logo.png",
    description:
      "An online shopping platform with a secure checkout system and product management features.",
    backgroundImage: "/bg7.jpg",
    createdAt: new Date().toISOString(),
    dueDate: "2025-12-15T23:59:59.000Z",
    tasks: [
      {
        id: 2,
        title: "Design UI Components",
        description: "Create reusable UI components with Tailwind CSS",
        status: TASK_STATUS.TODO,
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
                tasks: [2, 3, 4],
              },
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
              },
            ],
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-02-10T09:30:00.000Z",
        dueDate: "2025-04-01T23:59:59.000Z",
        lastModifiedAt: "2025-03-28T23:59:59.000Z",
      },
      {
        id: 3,
        title: "Implement Checkout System",
        description: "Develop a secure payment processing system",
        status: TASK_STATUS.TODO,
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
                tasks: [2, 3, 4],
              },
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
              },
            ],
            email: "john.doe@example.com",
          },
        ],
        tags: ["Docs", "Illustrations"],
        attachments: [],
        discussions: ["About colors"],
        createdAt: "2025-03-01T10:00:00.000Z",
        dueDate: "2025-05-10T23:59:59.000Z",
        lastModifiedAt: "2025-05-05T23:59:59.000Z",
      },
      {
        id: 4,
        title: "Project Planning",
        description: "Outline the development phases and milestones",
        status: TASK_STATUS.DONE,
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
                tasks: [2, 3, 4],
              },
            ],
            role: "Frontend Developer",
            email: "janny@example.com",
          },
        ],
        tags: ["Planning"],
        attachments: [],
        discussions: ["Timeline discussion"],
        createdAt: "2025-01-05T10:00:00.000Z",
        dueDate: "2025-01-10T23:59:59.000Z",
        lastModifiedAt: "2025-01-07T23:59:59.000Z",
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
            tasks: [2, 3,4],
          },
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
          },
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
          },
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
          },
        ],
        email: "jack@example.com",
      },
    ],
  },
  {
    id: 3,
    name: "AI Research Platform",
    description:
      "A collaborative platform for machine learning researchers to share and develop AI models.",
    logo: "https://example.com/ai-research-logo.png",
    backgroundImage: "/bg8.jpg",
    createdAt: new Date().toISOString(),
    dueDate: "2025-09-30T23:59:59.000Z",
    tasks: [
      {
        id: 5,
        title: "Design Machine Learning Pipeline",
        description:
          "Create a scalable ML pipeline for model training and evaluation",
        status: TASK_STATUS.IN_PROGRESS,
        assignedTo: [
          {
            id: 6,
            picture: "/p-picture6.jpg",
            name: "Dr. Emily Chen",
            role: "AI Research Lead",
            assignedProjects: [
              {
                projectId: 3,
                tasks: [5, 6],
              },
            ],
            email: "emily.chen@example.com",
          },
          {
            id: 7,
            picture: "/p-picture7.jpg",
            name: "Alex Rodriguez",
            role: "Machine Learning Engineer",
            assignedProjects: [
              {
                projectId: 3,
                tasks: [5],
              },
            ],
            email: "alex.rodriguez@example.com",
          },
        ],
        tags: ["AI", "Research", "Machine Learning"],
        attachments: [],
        discussions: ["Model architecture"],
        createdAt: "2025-03-15T10:00:00.000Z",
        dueDate: "2025-06-30T23:59:59.000Z",
        lastModifiedAt: "2025-05-30T23:59:59.000Z",
      },
      {
        id: 6,
        title: "Build Data Visualization Tools",
        description: "Develop interactive dashboards for research data",
        status: TASK_STATUS.TODO,
        assignedTo: [
          {
            id: 6,
            picture: "/p-picture6.jpg",
            name: "Dr. Emily Chen",
            role: "AI Research Lead",
            assignedProjects: [
              {
                projectId: 3,
                tasks: [5, 6],
              },
            ],
            email: "emily.chen@example.com",
          },
        ],
        tags: ["Frontend", "Data Visualization"],
        attachments: [],
        discussions: ["UI/UX considerations"],
        createdAt: "2025-04-01T14:00:00.000Z",
        dueDate: "2025-07-15T23:59:59.000Z",
        lastModifiedAt: "2025-07-10T23:59:59.000Z",
      },
    ],
    team: [
      {
        id: 6,
        picture: "/p-picture6.jpg",
        name: "Dr. Emily Chen",
        role: "AI Research Lead",
        assignedProjects: [
          {
            projectId: 3,
            tasks: [5, 6],
          },
        ],
        email: "emily.chen@example.com",
      },
      {
        id: 7,
        picture: "/p-picture7.jpg",
        name: "Alex Rodriguez",
        role: "Machine Learning Engineer",
        assignedProjects: [
          {
            projectId: 3,
            tasks: [5],
          },
        ],
        email: "alex.rodriguez@example.com",
      },
    ],
  },
  {
    id: 4,
    name: "Green Energy Monitoring App",
    description:
      "A mobile application to track and optimize renewable energy consumption for households and businesses.",
    logo: "https://example.com/green-energy-logo.png",
    backgroundImage: "/bg9.jpg",
    createdAt: new Date().toISOString(),
    dueDate: "2025-11-15T23:59:59.000Z",
    tasks: [
      {
        id: 7,
        title: "Develop Energy Tracking Algorithm",
        description:
          "Create an intelligent algorithm to calculate and predict energy consumption",
        status: TASK_STATUS.IN_PROGRESS,
        assignedTo: [
          {
            id: 8,
            picture: "/p-picture8.jpg",
            name: "Michael Green",
            role: "Data Scientist",
            assignedProjects: [
              {
                projectId: 4,
                tasks: [7, 8],
              },
            ],
            email: "michael.green@example.com",
          },
          {
            id: 9,
            picture: "/p-picture9.jpg",
            name: "Sarah Watts",
            role: "Backend Developer",
            assignedProjects: [
              {
                projectId: 4,
                tasks: [7],
              },
            ],
            email: "sarah.watts@example.com",
          },
        ],
        tags: ["Algorithm", "Data Science", "Energy"],
        attachments: [],
        discussions: ["Consumption prediction models"],
        createdAt: "2025-04-15T10:00:00.000Z",
        dueDate: "2025-07-30T23:59:59.000Z",
        lastModifiedAt: "2025-07-29T23:59:59.000Z",
      },
      {
        id: 8,
        title: "Design Mobile User Interface",
        description:
          "Create an intuitive and user-friendly mobile app interface",
        status: TASK_STATUS.TODO,
        assignedTo: [
          {
            id: 10,
            picture: "/p-picture10.jpg",
            name: "Lisa Chen",
            role: "UX/UI Designer",
            assignedProjects: [
              {
                projectId: 4,
                tasks: [8],
              },
            ],
            email: "lisa.chen@example.com",
          },
        ],
        tags: ["Mobile Design", "UX", "UI"],
        attachments: [],
        discussions: ["Color scheme and accessibility"],
        createdAt: "2025-05-01T14:00:00.000Z",
        dueDate: "2025-08-15T23:59:59.000Z",
        lastModifiedAt: "2025-08-10T23:59:59.000Z",
      },
    ],
    team: [
      {
        id: 8,
        picture: "/p-picture8.jpg",
        name: "Michael Green",
        role: "Data Scientist",
        assignedProjects: [
          {
            projectId: 4,
            tasks: [7, 8],
          },
        ],
        email: "michael.green@example.com",
      },
      {
        id: 9,
        picture: "/p-picture9.jpg",
        name: "Sarah Watts",
        role: "Backend Developer",
        assignedProjects: [
          {
            projectId: 4,
            tasks: [7],
          },
        ],
        email: "sarah.watts@example.com",
      },
      {
        id: 10,
        picture: "/p-picture10.jpg",
        name: "Lisa Chen",
        role: "UX/UI Designer",
        assignedProjects: [
          {
            projectId: 4,
            tasks: [8],
          },
        ],
        email: "lisa.chen@example.com",
      },
    ],
  },
  {
    id: 5,
    name: "Global Language Learning Platform",
    description:
      "An interactive online platform for learning multiple languages through AI-powered personalized lessons.",
    logo: "https://example.com/language-learn-logo.png",
    backgroundImage: "/bg10.jpg",
    createdAt: new Date().toISOString(),
    dueDate: "2026-02-28T23:59:59.000Z",
    tasks: [
      {
        id: 9,
        title: "Develop Adaptive Learning Algorithm",
        description:
          "Create an AI-driven algorithm to personalize language learning paths",
        status: TASK_STATUS.DONE,
        assignedTo: [
          {
            id: 11,
            picture: "/p-picture11.jpg",
            name: "Dr. Rafael Morales",
            role: "AI Linguist",
            assignedProjects: [
              {
                projectId: 5,
                tasks: [9, 10],
              },
            ],
            email: "rafael.morales@example.com",
          },
          {
            id: 12,
            picture: "/p-picture12.jpg",
            name: "Emma Thompson",
            role: "Machine Learning Engineer",
            assignedProjects: [
              {
                projectId: 5,
                tasks: [9],
              },
            ],
            email: "emma.thompson@example.com",
          },
        ],
        tags: ["AI", "Machine Learning", "Education"],
        attachments: [],
        discussions: ["Personalization strategies"],
        createdAt: "2025-05-15T10:00:00.000Z",
        dueDate: "2025-09-30T23:59:59.000Z",
        lastModifiedAt: "2025-08-30T23:59:59.000Z",
      },
      {
        id: 10,
        title: "Build Multilingual Content Library",
        description:
          "Curate and develop comprehensive language learning resources",
        status: TASK_STATUS.TODO,
        assignedTo: [
          {
            id: 13,
            picture: "/p-picture13.jpg",
            name: "Sophia Kim",
            role: "Content Curator",
            assignedProjects: [
              {
                projectId: 5,
                tasks: [10],
              },
            ],
            email: "sophia.kim@example.com",
          },
        ],
        tags: ["Content Creation", "Multilingual"],
        attachments: [],
        discussions: ["Resource diversity"],
        createdAt: "2025-06-01T14:00:00.000Z",
        dueDate: "2025-10-15T23:59:59.000Z",
        lastModifiedAt: "2025-10-05T23:59:59.000Z",
      },
    ],
    team: [
      {
        id: 11,
        picture: "/p-picture11.jpg",
        name: "Dr. Rafael Morales",
        role: "AI Linguist",
        assignedProjects: [
          {
            projectId: 5,
            tasks: [9, 10],
          },
        ],
        email: "rafael.morales@example.com",
      },
      {
        id: 12,
        picture: "/p-picture12.jpg",
        name: "Emma Thompson",
        role: "Machine Learning Engineer",
        assignedProjects: [
          {
            projectId: 5,
            tasks: [9],
          },
        ],
        email: "emma.thompson@example.com",
      },
      {
        id: 13,
        picture: "/p-picture13.jpg",
        name: "Sophia Kim",
        role: "Content Curator",
        assignedProjects: [
          {
            projectId: 5,
            tasks: [10],
          },
        ],
        email: "sophia.kim@example.com",
      },
    ],
  },
];
