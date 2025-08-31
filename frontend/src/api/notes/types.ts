import { type IResponse } from "@/api/types";

export interface INote {
  id: string;
  name: string;
  text: string;
  link: string;
  is_cipher: boolean;
  open_for_all: boolean;
  edit_everyone: boolean;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    login: string;
  };
}

export interface INoteForTable {
  id: string;
  name: string;
  link: string;
  author: {
    id: string;
    login: string;
  };
}

export interface IResponseNotesList extends IResponse {
  result?: {
    notes?: INoteForTable[];
  };
}

export interface IResponseNoteParams extends IResponse {
  result?: {
    note?: INote;
  };
}

export interface IResponseNotesLinks extends IResponse {
  result?: {
    notesLinks?: string[];
  };
}
