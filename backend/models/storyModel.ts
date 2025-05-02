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


