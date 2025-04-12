
import { Folder, FolderColor, Note, Tag } from "../types";

export const mockFolders: Folder[] = [
  {
    id: "1",
    name: "Personal",
    color: "mint",
    icon: "✨",
    createdAt: new Date(2023, 1, 15).toISOString(),
    updatedAt: new Date(2023, 1, 15).toISOString(),
  },
  {
    id: "2",
    name: "Work",
    color: "blue",
    icon: "💼",
    createdAt: new Date(2023, 2, 10).toISOString(),
    updatedAt: new Date(2023, 2, 10).toISOString(),
  },
  {
    id: "3",
    name: "Ideas",
    color: "lavender",
    icon: "💡",
    createdAt: new Date(2023, 3, 5).toISOString(),
    updatedAt: new Date(2023, 3, 5).toISOString(),
  },
  {
    id: "4",
    name: "Travel",
    color: "peach",
    icon: "✈️",
    createdAt: new Date(2023, 4, 20).toISOString(),
    updatedAt: new Date(2023, 4, 20).toISOString(),
  },
  {
    id: "5",
    name: "Recipes",
    color: "yellow",
    icon: "🍳",
    createdAt: new Date(2023, 5, 12).toISOString(),
    updatedAt: new Date(2023, 5, 12).toISOString(),
  },
];

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "Shopping List",
    content: "* Milk\n* Eggs\n* Bread\n* Fruits\n* Vegetables",
    createdAt: new Date(2023, 6, 10).toISOString(),
    updatedAt: new Date(2023, 6, 15).toISOString(),
    folderId: "1",
    isPinned: true,
    tags: ["shopping", "groceries"],
  },
  {
    id: "2",
    title: "Project Ideas",
    content: "## New Project Ideas\n\n1. Mobile app for note-taking\n2. Recipe manager with grocery list\n3. Travel planner with maps integration",
    createdAt: new Date(2023, 6, 12).toISOString(),
    updatedAt: new Date(2023, 6, 12).toISOString(),
    folderId: "3",
    isPinned: true,
    tags: ["ideas", "projects"],
  },
  {
    id: "3",
    title: "Meeting Notes: July Sprint",
    content: "## July Sprint Meeting\n\n* Review Q2 goals\n* Assign tasks for new features\n* Schedule design review\n* Discuss timeline for launch",
    createdAt: new Date(2023, 7, 5).toISOString(),
    updatedAt: new Date(2023, 7, 7).toISOString(),
    folderId: "2",
    isPinned: false,
    tags: ["meeting", "work", "sprint"],
  },
  {
    id: "4",
    title: "Tokyo Travel Itinerary",
    content: "## Tokyo Trip 2023\n\n### Day 1\n* Arrive at Narita Airport\n* Check in at hotel\n* Visit Asakusa temple\n\n### Day 2\n* Shibuya crossing\n* Harajuku shopping\n* Yoyogi Park",
    createdAt: new Date(2023, 8, 1).toISOString(),
    updatedAt: new Date(2023, 8, 5).toISOString(),
    folderId: "4",
    isPinned: false,
    tags: ["travel", "vacation", "itinerary"],
  },
  {
    id: "5",
    title: "Chocolate Chip Cookies Recipe",
    content: "## Chocolate Chip Cookies\n\n### Ingredients\n* 2 1/4 cups flour\n* 1 tsp baking soda\n* 1 tsp salt\n* 1 cup butter\n* 3/4 cup sugar\n* 3/4 cup brown sugar\n* 2 eggs\n* 2 tsp vanilla\n* 2 cups chocolate chips\n\n### Instructions\n1. Preheat oven to 375°F\n2. Mix dry ingredients\n3. Cream butter and sugars\n4. Add eggs and vanilla\n5. Mix in dry ingredients\n6. Fold in chocolate chips\n7. Bake for 9-11 minutes",
    createdAt: new Date(2023, 9, 10).toISOString(),
    updatedAt: new Date(2023, 9, 10).toISOString(),
    folderId: "5",
    isPinned: true,
    tags: ["recipe", "dessert", "baking"],
  },
];

export const mockTags: Tag[] = [
  { id: "1", name: "shopping" },
  { id: "2", name: "groceries" },
  { id: "3", name: "ideas" },
  { id: "4", name: "projects" },
  { id: "5", name: "meeting" },
  { id: "6", name: "work" },
  { id: "7", name: "sprint" },
  { id: "8", name: "travel" },
  { id: "9", name: "vacation" },
  { id: "10", name: "itinerary" },
  { id: "11", name: "recipe" },
  { id: "12", name: "dessert" },
  { id: "13", name: "baking" },
];
