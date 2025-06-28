export interface RoleGroup {
  category: string;
  roles: string[];
}

export const jobRoles: RoleGroup[] = [
  {
    category: "Engineering",
    roles: [
      "Frontend Engineer",
      "Backend Engineer",
      "Full Stack Engineer",
      "DevOps Engineer",
      "Data Engineer",
      "Machine Learning Engineer",
      "Mobile Engineer",
      "QA Engineer",
      "Embedded Systems Engineer",
      "Platform Engineer",
      "Security Engineer",
    ],
  },
  {
    category: "Design",
    roles: [
      "Product Designer",
      "UX Designer",
      "UI Designer",
      "Visual Designer",
      "Interaction Designer",
      "Graphic Designer",
      "Design Researcher",
      "Motion Designer",
    ],
  },
  {
    category: "Product",
    roles: [
      "Product Manager",
      "Technical Product Manager",
      "Product Owner",
      "Product Analyst",
    ],
  },
  {
    category: "Operations",
    roles: [
      "Operations Manager",
      "Business Operations",
      "Customer Support",
      "IT Support",
      "Office Manager",
    ],
  },
  {
    category: "Sales",
    roles: [
      "Sales Representative",
      "Account Executive",
      "Account Manager",
      "Sales Manager",
      "Customer Success Manager",
      "Business Development Representative",
    ],
  },
  {
    category: "Marketing",
    roles: [
      "Marketing Manager",
      "Digital Marketing Specialist",
      "Content Marketer",
      "SEO Specialist",
      "Social Media Manager",
      "Brand Strategist",
      "Growth Marketer",
    ],
  },
  {
    category: "Management",
    roles: [
      "Engineering Manager",
      "Design Manager",
      "Product Lead",
      "CTO",
      "CPO",
      "VP of Engineering",
      "Team Lead",
      "Technical Director",
    ],
  },
  {
    category: "Other Engineering",
    roles: [
      "Game Developer",
      "Data Scientist",
      "Bioinformatics Engineer",
      "AR/VR Developer",
      "Firmware Engineer",
      "Simulation Engineer",
    ],
  },
  {
    category: "Other",
    roles: [
      "Founder",
      "Entrepreneur",
      "Recruiter",
      "HR Manager",
      "Legal Counsel",
      "Finance Analyst",
      "Educator",
      "Researcher",
      "Consultant",
    ],
  },
];
