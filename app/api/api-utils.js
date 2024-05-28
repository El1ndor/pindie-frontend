"use client"
export const getData = async (url) => {
  try {
    const response = await fetch (url);
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const isResponseOK = (response) => {
  return!(response instanceof Error);
};

const normalizeDataObject = (obj) => {
  return {
    ...obj,
    category: obj.categories,
    users: obj.users_permissions_users,
  };
};

export const normalizeData = (data) => {
  return data.map((item) => {
    return normalizeDataObject(item);
  });
};

export const getNormalizedGameDataByld = async (url, id) => {
  const data = await getData(`${url}/${id}`);
  return isResponseOK(data) ? normalizeDataObject(data) : data;
};

export const getNormalizedGamesDataByCategory = async (url, category) => {
  try {
   const data = await getData(`${url}?categories.name=${category}`);
   if(!data.length) {
    throw new Error("Нет игр в категории");
   }
   return isResponseOK(data) ? normalizeData(data) : data;
} catch (error) {
  return error;
}
};
export const authorize = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      throw new Error("Ошибка авторизации");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const getMe = async (url, jwt) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const setJWT = (jwt) => {
  localStorage.setItem("jwt",  jwt)
};
export const getJWT = () => {
  return localStorage.getItem("jwt");
};
export const removeJWT = () => {
  localStorage.removeItem("jwt");
};

export const vote = async (url, jwt, usersArray) =>{
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ users: usersArray })
    
    })
      if (response.status !==200) {
        throw new Error("Ошибка получения данных");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }

  };
  
export const checkIfUserVoted = (users, id) => {
 return users.find((user) => user.id === id)
  }