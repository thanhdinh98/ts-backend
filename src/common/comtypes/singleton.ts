import { Mutex } from "async-mutex";

export type Singleton<Type> = {
  isLoaded: boolean
  mutex: Mutex
  instance?: Type
  loader: ()=>Type
};

export async function Get<Type>(singleton: Singleton<Type>): Promise<Type | undefined> {
  if (singleton.isLoaded) {
    return singleton.instance;
  }
  const release = await singleton.mutex.acquire();
  try {
    singleton.instance = singleton.loader();
    singleton.isLoaded = true;
  } catch (err) {
    Promise.reject(err);
  } finally {
    release();
  }
  return singleton.instance;
}

export default function NewSingleton<Type>(loader: ()=>Type): Singleton<Type> {
  return {
    mutex: new Mutex(),
    loader,
    isLoaded: false,
  };
}
