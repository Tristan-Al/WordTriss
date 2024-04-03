import jwt from "jsonwebtoken";
import dayjs from "dayjs";

export const createToken = (user) => {
  const obj = {
    user_id: user.id,
    exp: dayjs().add(24, "hours").unix(),
  };

  return jwt.sign(obj, process.env.SECRET_KEY);
};
