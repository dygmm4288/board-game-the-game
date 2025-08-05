import { clone } from "lodash";
import "reflect-metadata";

const HIDE_META = Symbol("hide");

export function hideEntity<T, K extends keyof T>(
  entity: T,
  hideKeys: K[],
): Omit<T, K> {
  const cloneEntity = clone(entity);

  hideKeys.forEach((key) => {
    delete cloneEntity[key];
  });

  return cloneEntity;
}

export function Hide(): PropertyDecorator {
  return (target, prop) =>
    Reflect.defineMetadata(HIDE_META, true, target, prop as string);
}

export function getHideKeys(instance: any): string[] {
  return Object.keys(instance).filter((key) =>
    Reflect.getMetadata(HIDE_META, instance, key),
  );
}
