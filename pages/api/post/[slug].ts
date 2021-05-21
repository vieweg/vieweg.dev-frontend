import { NextApiRequest, NextApiResponse } from "next";

import { articles } from "../../../data";

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    query: { slug },
    method,
  } = req;

  switch (method) {
    case "GET": {
      const post = articles.data.find((post) => post.slug === slug);

      res.status(200).json(post);
      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
