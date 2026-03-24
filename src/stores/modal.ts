import { writable } from 'svelte/store';

export interface Project {
  title: string;
  role: string;
  description: string;
  longDesc: string;
  contributions: string[];
  tech: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const activeProject = writable<Project | null>(null);
