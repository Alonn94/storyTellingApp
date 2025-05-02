import pool from "../db";

export const createStory = async (title:string, content: string, authorId: number) => {
    const result = await pool.query(
        `INSERT INTO stories (title, content, author_id)
        VALUES ($1, $2, $3)
        RETURNING id, title, content, author_id, created_at, updated_at
        `,
        [title, content, authorId]
    );
    return result.rows[0];
};


export const getAllStories = async()  => {
    const result = await pool.query(
        `SELECT id,title,content,author_id, created_at, updated_at FROM stories ORDER BY created_at DESC`
    );
    return result.rows;

}

export const updateStory = async (
    storyId: number,
    title: string,
    content: string
) => {
    const result = await pool.query(
        `UPDATE stories
        SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP
        WHERE ID = $3
        RETURNING id, title, content, author_id, created_at, updated_at`,
        [title, content, storyId]
    );
    return result.rows[0];
};

export const deleteStoryById = async (storyId: number) => {
    const result = await pool.query(
      `DELETE FROM stories WHERE id = $1 RETURNING id`,
      [storyId]
    );
    return result.rows[0];
  };

  