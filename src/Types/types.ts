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
      user_id: number
    }
}
