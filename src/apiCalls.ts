import { FormData } from "./Types/FormPageTypes"
import { PostLogo, Project } from "./Types/types"

type options = {
  method: string,
  body: string,
  headers: {
    'Content-Type': string
  }
}

const apiCall = (userID: number, endpoint: string, optionsObj: options | {},) => {
  return async () => {
    let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/${userID}/${endpoint}/`, optionsObj)
    let data = await response.json()
    if(data.message && data.message.includes('Error')) {
      throw new Error(`${data.message} -- Please try again`)
    }
    return data.data;
  }
}

const postNewForm = async (info: FormData | PostLogo) => {
  let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/`, {
    // let response = await fetch(`https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects/`, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    console.log(response.statusText)
    throw new Error(response.statusText)
  }

  let data = await response.json()
  return data;
}

const getColorPalette = async (givenHex: string): Promise<{colors: { hex: { value: string } }[]} > => {
  const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${givenHex}&count=6`)
  if (!response.ok) {
    console.log(response.statusText)
    throw new Error(response.statusText)
  }

  let data = await response.json()
  return data;
}

const postLogo = async (info: PostLogo, projectID: string) => {
  let response = await fetch(`/api/v1/users/1/projects/${projectID}`, {
    method: 'PUT',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    console.log(response.statusText)
    throw new Error(response.statusText)
  }

  let data = await response.json()
  return data;
}


const putProject = async (info: Project, projectID: string) => {
  let response = await fetch(`/api/v1/users/1/projects/${projectID}`, {
    method: 'PUT',
    body: JSON.stringify(info.attributes),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    console.log(response.statusText)
    throw new Error(response.statusText)
  }

  let data = await response.json()
  return data;
}



export { postNewForm, apiCall, getColorPalette, postLogo, putProject }
