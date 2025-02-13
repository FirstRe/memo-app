export const checkToken = async (url: string, accessToken: string) => {
  
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${accessToken}`)

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow' as RequestRedirect,
  }

  const response = await fetch(url, requestOptions)

  const data = JSON.parse(await response.text())

  return {
    data,
    status: response.status,
  }
}
