import { Router } from "express";
import { db } from "@workspace/db";
import { agents } from "@workspace/db";

const router = Router();

router.post("/agents", async (req, res) => {
  try {
    const {
      name,
      role,
      systemPrompt,
    } = req.body;

    const agent = await db
      .insert(agents)
      .values({
        name,
        role,
        systemPrompt,
      })
      .returning();

    res.json(agent[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create agent",
    });
  }
});


router.get("/agents", async (req, res) => {
  const result = await db.select().from(agents);

  res.json(result);
});


export default router;
