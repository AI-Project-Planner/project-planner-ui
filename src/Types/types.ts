import { Indexable } from "./FormPageTypes"

export type ControlButtons = Indexable & {
  0: {
    func: () => void;
    step: string;
    image: string;
  },
  1: {
    func: () => void;
    step: string;
    image: string;
  }, 
  2: {
    func: () => void;
    step: string;
    image: string;
  }, 
  3: {
    func: () => void;
    step: string;
    image: string;
  },
  4: {
    func: () => void;
    step: string;
    image: string;
  }
}
export type Project = {
    id: string,
    type: string,
    attributes: {
      collaborators: number,
      colors: string,
      description: string,
      features: string,
      interactions: string, 
      logo_font: string,
      logo_url: string,
      name: string,
      saved: boolean,
      steps: string,
      tagline: string,
      technologies: string,
      timeline: string,
      timeline_int: number,
      user_id: number
    }
}

export type putData = {
  id: string,
  type: string,
  attributes: {
    collaborators: number,
    colors: string,
    description: string,
    features: string,
    interactions: string,
    name: string,
    steps: string,
    tagline: string,
    technologies: string,
    timeline: string,
    timeline_int: number,
    user_id: number
    logo_url: string,
    logo_font: string,
    saved: boolean,
  }
}

export interface Attributes {
    collaborators: number,
    colors: string,
    description: string,
    features: string,
    interactions: string, 
    name: string,
    saved: boolean,
    steps: string,
    tagline: string,
    technologies: string,
    timeline: string,
    timeline_int: number,
    user_id: number
    logo_url: string,
    logo_font: string
  }

export type TechVideoLinks = Indexable & {
  'react': string,
  'typescript': string,
  'javascript': string,
  'vue': string,
  'angular': string,
  'ruby/rails': string,
  'postgresql': string,
  'node': string,
  'sidekiq': string,
  'devise': string
}
