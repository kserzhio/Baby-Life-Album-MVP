export type ActionState = {
  status: "idle" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export const initialActionState: ActionState = {
  status: "idle"
};
