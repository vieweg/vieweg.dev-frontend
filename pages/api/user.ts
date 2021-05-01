import { NextApiRequest, NextApiResponse } from "next";

import { links, menu, user } from "../../data";

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case "GET": {
      const data = { user: user.data, links: links.data, menu: menu.data };

      res.status(200).json(data);
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};
