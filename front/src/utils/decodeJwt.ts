// src/libs/decodeJwt.ts
export function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export function checkUserRole(): 'admin' | 'user' | 'agency' {
  const session = localStorage.getItem('userSession');
  if (session) {
    try {
      const { token } = JSON.parse(session); 
      if (token) {
        const decodedToken = decodeJwt(token);
        if (decodedToken) {
          const role = decodedToken['role'];
          if (role) {
            if (role === 'admin') {
              return 'admin';
            } else if (role === 'agency') {
              return 'agency';
            }
          }
        }
      }
    } catch (error) {
      console.error('Error decoding or processing token:', error);
    }
  }

  return 'user';
}
