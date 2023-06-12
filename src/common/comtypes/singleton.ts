import { Mutex } from "async-mutex";

type Singleton<Type> = {
  isLoaded: boolean
  mutex: Mutex
  instance?: Type
  loader: ()=>Type

  Get: ()=>Promise<Type | undefined>
};

export function NewSingleton<Type>(loader: ()=>Type): Singleton<Type> {
  const newSingleton: Singleton<Type> = {
    mutex: new Mutex(),
    loader,
    isLoaded: false,

    Get: () => Promise.resolve(undefined),
  };
  newSingleton.Get = async () => {
    if (newSingleton.isLoaded) {
      return newSingleton.instance;
    }
    const release = await newSingleton.mutex.acquire();
    try {
      newSingleton.instance = newSingleton.loader();
      newSingleton.isLoaded = true;
    } catch (err) {
      Promise.reject(err);
    } finally {
      release();
    }
    return newSingleton.instance;
  };
  return newSingleton;
}
