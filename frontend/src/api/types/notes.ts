import { IResponse } from "@/hooks";

export interface INote {
  id?: string;
  name: string;
  link: string;
  author: {
    id: string;
    login: string;
  };
  is_cipher?: boolean;
  open_for_all?: boolean;
  edit_everyone?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface INotesList extends IResponse {
  result: {
    notes: INote[];
  } | null;
}
