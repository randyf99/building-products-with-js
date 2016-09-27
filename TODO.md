# API

- Questions:
  - Create question
  - Update question
    - Answer question (part of update)
  - Delete question

# DB 
docker run -d --name expertsdb rethinkdb

docker run -it --rm -p 8080:8080 --link expertsdb -e EXPERTS_DB_URL=expertsdb randf/bpwjs-server

1) docker build -t bpwj-server .
