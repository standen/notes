import { IResponse } from "@/hooks";

export interface INote {
  id: string;
}

export interface INotesList extends IResponse {
  result: {
    roles: INote[];
  };
}
