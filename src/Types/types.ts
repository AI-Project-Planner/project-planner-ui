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
      timeline: string,
      timeline_int: number,
      user_id: number
    }
}

export interface PostLogo {
  tagline: string,
  name: string,
  project_id: string
}
