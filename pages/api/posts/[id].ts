import {connectToDatabase} from "../../../utils/mongodb";
import {ObjectId} from "mongodb";

export default async function handler(req: Request & { query: { id: string } }, res: Response) {
  const {method, query: {id}} = req;

  const {db} = await connectToDatabase();

  if (method === "DELETE") {
    try {
      await db
        .collection("posts")
        .deleteOne({_id: new ObjectId(id)});
      // @ts-ignore
      res.status(200).json({message: "The post has been deleted!!"});
    } catch (error) {
      // @ts-ignore
      res.status(500).json(error);
    }
  }
}