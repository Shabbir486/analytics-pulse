export const mockUsers = [
  {
    id: "1",
    name: "Angelique Morse",
    email: "benny89@yahoo.com",
    phone: "+46 8 123 456",
    company: "Wuckert Inc",
    role: "Content Creator",
    status: "Banned",
    avatar: "/lovable-uploads/avatar.png"
  },
  {
    id: "2",
    name: "Ariana Lang",
    email: "avery43@hotmail.com",
    phone: "+54 11 1234-5678",
    company: "Feest Group",
    role: "IT Administrator",
    status: "Pending",
    avatar: "/lovable-uploads/avatar.png"
  },
  {
    id: "3",
    name: "Aspen Schmitt",
    email: "mireya13@hotmail.com",
    phone: "+34 91 123 4567",
    company: "Kihn, Marquardt and Crist",
    role: "Financial Planner",
    status: "Banned",
    avatar: "/lovable-uploads/avatar.png"
  },
  {
    id: "4",
    name: "Brycen Jimenez",
    email: "tyrel.greenholt@gmail.com",
    phone: "+52 55 1234 5678",
    company: "Rempel, Hand and Herzog",
    role: "HR Recruiter",
    status: "Active",
    avatar: "/lovable-uploads/avatar.png"
  },
  {
    id: "5",
    name: "Chase Day",
    email: "joana.simonis84@gmail.com",
    phone: "+86 10 1234 5678",
    company: "Mraz, Donnelly and Collins",
    role: "Graphic Designer",
    status: "Banned",
    avatar: "/lovable-uploads/avatar.png"
  },
  // ... Add 25 more mock users with similar structure
].concat(
  Array.from({ length: 25 }, (_, i) => ({
    id: String(i + 6),
    name: `User ${i + 6}`,
    email: `user${i + 6}@example.com`,
    phone: `+1 234 567 ${String(i + 6).padStart(4, '0')}`,
    company: `Company ${i + 6}`,
    role: ["Content Creator", "IT Administrator", "Financial Planner", "HR Recruiter", "Graphic Designer"][i % 5],
    status: ["Active", "Pending", "Banned", "Rejected"][i % 4],
    avatar: "/lovable-uploads/avatar.png"
  }))
);