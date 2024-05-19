-- name: ListUsers :many
SELECT *
FROM users;

-- name: GetUser :one
SELECT *
FROM users
WHERE id = ?
LIMIT 1;

-- name: GetUserByLastInsertId :one
SELECT *
FROM users
WHERE id = LAST_INSERT_ID()
LIMIT 1;

-- name: CreateUser :exec
INSERT INTO users (display_name)
VALUES (?);

-- name: UpdateUserDisplayName :exec
UPDATE users
SET display_name = ?
WHERE id = ?;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = ?;
