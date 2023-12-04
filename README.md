# Class Scheduler Frontend

This project is for combi students who are struggling to put together a good Individual Study Program (ISP) or class schedule. 

This application is made in React.

## Tutorial

1. Make sure that the backend server is running. If this is not the case yet, first follow the instructions at <https://github.com/ruben-bottu/class-scheduler-backend>

2. Docker should be installed on your system. In case of Windows or MacOS, Docker Desktop should be running.

3. Run the command 
   ```
   docker compose up -d
   ``` 
   in your terminal. This will launch all the necessary docker containers and make the application available at port 8001.

4. You should now be able to browse to: <http://localhost:8001>

If you completed these steps, then your frontend is running smoothly.

## Building with Docker

```bash
$ docker build -t localhost:5000/isp-frontend . --build-arg API_URL=http://something:8000
```