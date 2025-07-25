export type TButton = {
  type:
    | "primary"
    | "warning"
    | "danger"
    | "success"
    | "info"
    | "secondary"
    | "dark"
    | "light";
  text: string;
  onClick?: () => void;
};
