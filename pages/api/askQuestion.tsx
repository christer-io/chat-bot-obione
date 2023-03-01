// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryApi';
import admin from "firebase-admin";
import { adminDb } from '../../firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt, id, model, session } = req.body;

    if (!prompt) {
        res.status(400).json({answer: "Please send in prompt"});
        return;
    }

    if (!id) {
        res.status(400).json({answer: "Please send in id"});
        return;
    }

    const response = await query(prompt, model);

    const message: Message = {
        text: response || "ChatGPT was unable to help you",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "https://links.papareact.com/89k",
        },
    };

    await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(id)
    .collection("messages")
    .add(message);

    res.status(200).json({ answer: message.text })
}
