import dotenv from "dotenv";

dotenv.config();

export const env = {
  MONGO: process.env.MONGO,
  KEY_TOKEN_SECRET: process.env.KEY_TOKEN_SECRET,
  EXPIRE_ACCESS_TOKEN: process.env.EXPIRE_ACCESS_TOKEN,
  EXPIRE_REFRESH_TOKEN: process.env.EXPIRE_REFRESH_TOKEN,
  GIGS_SHOW_BY_PAGE: process.env.GIGS_SHOW_BY_PAGE,
  OPTIONS_COOKIE: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: parseInt(process.env.EXPIRE_COOKIE, 10),
  },
};
