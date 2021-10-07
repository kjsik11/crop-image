export interface ProviderInt {
  name: string;
  authorizationUrl: string;
  accessTokenUrl: string;

  tokenLogin(options: any): Promise<any>;
}
