import { omit } from "lodash";
import { BaseEntity } from "typeorm";
import { getHideKeys } from "../../utils/serializer";

export abstract class BaseModel extends BaseEntity {
  public hideEntity(): Record<string, any> {
    const hideKeys = getHideKeys(this);

    const data: Record<string, any> = omit(this, hideKeys);

    for (const [key, val] of Object.entries(data)) {
      if (val && typeof (val as any).hideEntity === "function") {
        data[key] = null;
      } else if (Array.isArray(val)) {
        data[key] = val.map((item) =>
          item && typeof (item as any).hideEntity === "function"
            ? item.hideEntity()
            : item,
        );
      }
    }

    return data;
  }
}
