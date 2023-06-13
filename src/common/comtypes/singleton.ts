import { Mutex } from "async-mutex";

type Singleton<Type> = {
  isLoaded: boolean
  mutex: Mutex
  instance?: Type
  loader: ()=>Type

  Get: ()=>Promise<Type | undefined>
};

export function NewSingleton<Type>(loader: ()=>Type): Singleton<Type> {
  return {
    mutex: new Mutex(),
    loader,
    isLoaded: false,

    async Get() {
      if (this.isLoaded) {
        return this.instance;
      }
      const release = await this.mutex.acquire();
      try {
        this.instance = this.loader();
        this.isLoaded = true;
      } catch (err) {
        Promise.reject(err);
      } finally {
        release();
      }
      return this.instance;
    },
  };
}
