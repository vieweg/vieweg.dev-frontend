import { NextApiRequest, NextApiResponse } from "next";

import { articles } from "../../data";

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case "GET": {
      const data = {
        posts: articles.data,
      };

      res.status(200).json(data);
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};
