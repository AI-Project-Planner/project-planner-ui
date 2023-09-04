export type Project = {
    id: string,
    type: string,
    attributes: {
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
    saved: string,
    steps: string,
    tagline: string,
    technologies: string,
    timeline: string,
    timeline_int: number,
    user_id: number
    logo_url: string,
    logo_font: string
  }
}

export interface PostLogo {
  tagline: string,
  name: string,
}

export interface Indexable {
  [key: string]: any;
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
