class Store {
  storage!: Storage;
  constructor() {
    this.storage = window.localStorage;
  }
  save(key: string, value: unknown) {
    if (typeof value !== "string") value = JSON.stringify(value);
    this.storage.setItem(key, value as string);
  }
  load(key: string) {
    const value = this.storage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (err) {
      if (err instanceof SyntaxError) return value;
    }
  }
  delete(key: string) {
    const data = this.load(key);
    if (data) this.storage.removeItem(key);
  }
}
const store = new Store();
export default store;

export const USER_KEY = "user";
export const ACCESS_TOKEN_KEY = "accessToken";
