export interface Indexable {
  [key: string]: any;
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
  timeline: string,
  user_id: number
}

export interface PostData {
  id: string,
  type: string,
  attributes: Attributes
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