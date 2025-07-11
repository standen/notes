docker-compose down --remove-orphans && docker-compose up -d

docker exec -it postgres_db pg_dump -U myuser -d mydb > /home/user/github/notes/dump.sql

# delete psql docker container
# delete volume
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
cat dump.sql | docker exec -i postgres_db psql -U myuser -d mydb