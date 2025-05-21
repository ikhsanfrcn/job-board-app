export interface RegisterCompanyParams {
  name: string;
  email: string;
  password: string;
  industryId: string;
}

export interface AuthParams {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}
