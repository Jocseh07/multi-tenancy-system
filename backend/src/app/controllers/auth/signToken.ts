import jwt from "jsonwebtoken";
import { TokenPayload } from "../../../types/types";

export const signToken = ({ userId, role, tenantId, status }: TokenPayload) => {
  return jwt.sign(
    { userId, role, tenantId, status },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "90d",
    }
  );
};
