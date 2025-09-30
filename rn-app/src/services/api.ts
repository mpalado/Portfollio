import { ProfileData } from '../shared/api';

/**
 * Fetch profile data from API
 * This is currently a mock implementation that returns static data
 * In a real app, this would fetch from a server endpoint
 */
export const fetchProfileData = async (): Promise<ProfileData> => {
  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data
  return {
    name: "Myk Palado",
    title: "Web Developer • Designer",
    avatar: "https://avatars.dicebear.com/api/initials/Myk.png",
    bio: "Hello! My name is Myk Palado. I’m a developer with experience in mobile and web application development, specializing in Flutter, React, and API integration. My goal is to create practical solutions that enhance everyday experiences, whether it’s through intuitive design or efficient backend systems. I’m committed to continuous growth and excited to collaborate on impactful projects.",
    location: "Davao City, PH",
    experience: "6+ years experience",
    availability: "Open to freelance & full-time roles",
    skills: {
      frontend: ["React", "React Native", "TypeScript", "Tailwind"],
      backend: ["Node.js", "Express", "Postgres"],
      tools: ["Git", "Figma", "Vitest"]
    },
    projects: [
      {
        title: "University Violation Tracker",
        tags: ["Vue", "PWA"],
        url: "https://github.com/mpalado/-UVT-University-Violation-Tracker"
      },
      {
        title: "Brain Bloom",
        tags: ["TypeScript", "LLM"],
        url: "https://github.com/mpalado/bbloom"
      }
    ],
    contact: {
      email: "Mpalado_220000002436@uic.edu.ph",
      phone: "+63 09466800117",
      linkedin: "https://www.linkedin.com/in/myk-palado-4756b0230/",
      github: "https://github.com/mpalado"
    }
  };
};

/**
 * To use a real API endpoint, replace the function above with this implementation:
 * 
 * export const fetchProfileData = async (): Promise<ProfileData> => {
 *   try {
 *     // Replace with your actual API URL
 *     const response = await fetch('https://api.example.com/profile');
 *     
 *     if (!response.ok) {
 *       throw new Error(`HTTP error! Status: ${response.status}`);
 *     }
 *     
 *     return await response.json();
 *   } catch (error) {
 *     console.error("Failed to fetch profile data:", error);
 *     throw error;
 *   }
 * };
 */