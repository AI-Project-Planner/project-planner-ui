import { FormData } from "./Types/FormPageTypes";
import { Attributes, Project, putData } from "./Types/types";

type options = {
  method: string;
  body: string;
  headers: {
    "Content-Type": string;
  };
};

const apiCall = (userID: number, endpoint: string, optionsObj: options | {}) => {
  return async () => {
    let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/${userID}/${endpoint}/`, optionsObj);
    let data = await response.json();
    if (data.message && data.message.includes("Error")) {
      throw new Error(`${data.message} -- Please try again`);
    }
    return data.data;
  };
};

const postNewForm = async (info: FormData, id: number) => {
  let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/${id}/projects/`, {
    method: "POST",
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let data = await response.json();
  return data;
};

const getColorPalette = async (givenHex: string): Promise<{colors: { hex: { value: string } }[]} > => {
  const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${givenHex}&mode=analogic&count=6`)
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let data = await response.json();
  return data;
};

const deleteProject = async (project: Project) => {
  let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/${project.attributes.user_id}/projects/${project.id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let data = await response.json();
  return data;
};

const addLogo = async (info: Attributes, projectID: string, userID: number) => {
  let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/${userID}/projects/${projectID}/`, {
    method: "PUT",
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let data = await response.json();
  return data;
};

const putProject = async (info: putData, projectID: string, userID: number) => {
  let response = await fetch(`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/${userID}/projects/${projectID}/`, {
    method: "PUT",
    body: JSON.stringify(info.attributes),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let data = await response.json();
  return data;
};

export { postNewForm, apiCall, getColorPalette, deleteProject, addLogo, putProject };
