export class Container {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private static readonly instances = new Map<Function, unknown>();

  static get<T>(Constructor: new () => T): T {
    if (!Container.instances.has(Constructor)) {
      Container.instances.set(Constructor, new Constructor());
    }

    return Container.instances.get(Constructor) as T;
  }

  static set<T>(Constructor: new () => T, instance: T): void {
    Container.instances.set(Constructor, instance);
  }

  static clear(): void {
    Container.instances.clear();
  }
}
