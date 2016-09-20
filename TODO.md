# API

- Questions:
  - Create question
  - Update question
    - Answer question (part of update)
  - Delete question

# DB struct
docker run -it --rm --link expertsdb:db -e EXPERTS_DB_URL=db -p 80:8080 bpwj-server

1) docker build -t bpwj-server .
