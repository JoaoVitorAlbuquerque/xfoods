import { create } from "./create";
import { getAll } from "./getAll";
import { me } from "./me";
import { remove } from "./remove";
import { update } from "./update";

export const usersService = {
  me,
  create,
  getAll,
  update,
  remove,
};
