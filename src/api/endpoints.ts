type AuthEndpoints = {
  checkEmailIsExist: (email: string) => string;
  checkUsernameIsExists: (username: string) => string;
  checkCredentialIsExists: (credential: string) => string;
  loginCredentials: () => string;
  getRefreshToken: () => string;
  createAccount: () => string;
};

type SubcategoryEndpoints = {
  getSubcategoriesbyId: (id: string) => string;
};

type SkillEndpoints = {
  getSkillsbyId: (id: string) => string;
};

type Endpoints = {
  auth: AuthEndpoints;
  subcategory: SubcategoryEndpoints;
  skill: SkillEndpoints;
};

export const endpoints: Endpoints = {
  auth: {
    checkEmailIsExist: (email: string) => `/auth/checkemail/${email}`,
    checkUsernameIsExists: (username: string) => `/auth/checkusername/${username}`,
    checkCredentialIsExists: (credential: string) => `/auth/checkcredential/${credential}`,
    loginCredentials: () => "/auth/logincredentials",
    getRefreshToken: () => "/auth/refreshtoken",
    createAccount: () => "/auth/registercredentials",
  },
  subcategory: {
    getSubcategoriesbyId: (id: string) => `/subcategory/get/${id}`,
  },
  skill: {
    getSkillsbyId: (id: string) => `/skill/get/${id}`,
  },
};
