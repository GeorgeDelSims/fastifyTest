CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    created_at DATA NOT NULL DEFAULT CURRENT_DATE,
    firstName TEXT NOT NULL,
    lastMame TEXT NOT NULL
);