export abstract class Idp {
  abstract getToken(): Promise<string | undefined>;

  abstract login(): Promise<boolean>;

  abstract logout(): Promise<boolean>;

  abstract getUserId(): Promise<string | undefined>;
}
