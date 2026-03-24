import { writable } from 'svelte/store';
import type { Project } from '../data/projects';

export type { Project };

export const activeProject = writable<Project | null>(null);
