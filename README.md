# Class Scheduler Frontend

This project is for students who are taking courses from multiple years or curricula and are struggling to put together a good class schedule.

This application is made in React.

## Tutorial

1. Make sure that the backend server is running. If this is not the case yet, first follow the instructions at <https://github.com/ruben-bottu/class-scheduler-backend>

2. [Install Docker Desktop.](https://docs.docker.com/get-docker/)

3. Start Docker Desktop.

4. Run the command 
   ```
   docker compose up -d
   ``` 
   in your terminal. This will launch all the necessary Docker Containers.

5. Browse to: <http://localhost:8001>

6. Search for the courses that you added in `secret-load.sql` in the backend.

If you completed these steps, then your frontend is running smoothly.

## Building with Docker

```bash
docker build -t localhost:5000/isp-frontend . --build-arg API_URL=http://something:8000
```