import pool from "../db";

export const addContributor = async (storyId: number, userId: number) => {
  const result = await pool.query(
    `INSERT INTO contributors (story_id, user_id)
     VALUES ($1, $2)
     RETURNING id, story_id, user_id`,
    [storyId, userId]
  );

  return result.rows[0];
};