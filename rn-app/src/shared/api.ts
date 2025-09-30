/**
 * API types for profile data
 * Shared between frontend and backend
 */

export interface ProfileData {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  location: string;
  experience: string;
  availability: string;
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
  projects: Array<{
    title: string;
    tags: string[];
    url?: string;
  }>;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
}