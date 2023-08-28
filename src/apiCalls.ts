type options = {
  method: string,
  body: string,
  headers: {
    'Content-Type': string
  }
}
const apiCall = (userID: number, endpoint: string, optionsObj: options | {},) => {
  return async () => {
    let response = await fetch(`https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/${userID}/${endpoint}`, optionsObj)
    let data = await response.json()
    if(data.message && data.message.includes('Error')) {
      throw new Error(`${data.message} -- Please try again`)
    }
    return data.data;
  }
}

export {apiCall}