import { FormData } from "./Types/FormPageTypes";
import { Attributes } from "./Types/types";

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

const postNewForm = async (info: FormData) => {
  let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/`, {
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

const addLogo = async (info: Attributes, projectID: string) => {
  let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/${projectID}/`, {
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

export { postNewForm, apiCall, addLogo }
