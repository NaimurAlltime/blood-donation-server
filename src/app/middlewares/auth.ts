import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import config from "../../config";
import prisma from "../../shared/prisma";

// const auth = async (
//   req: Request & { user?: any },
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.headers.authorization;

//     if (!token) {
//       throw new Error("unauthorized access");
//     }

//     const verifiedUser = jwtHelpers.verifyToken(
//       token,
//       config.jwt.jwt_secret as Secret
//     );

//     req.user = verifiedUser;

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// export default auth;

const auth =
  (...roles: string[]) =>
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );

      const user = await prisma.user.findUniqueOrThrow({
        where: { email: verifiedUser.email },
      });

      if (roles.length && !roles.includes(user.role)) {
        throw new Error("You are not authorized!");
      }
      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
