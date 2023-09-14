# ISP class schedule frontend

This project is for combi students who are struggling to put together a good Individual Study Program (ISP) or class schedule. The frontend is currently made in React.

## Setup

First you will need to make sure that the backend server is running on the port you defined in API_URL in .env.

Run the following commands in a terminal (project root folder) to install all required node packages and get the server up and running:

```bash
> npm install
> npm start
```

The frontend should now be running on `http://localhost:8001`.

## Building with Docker

```bash
$ docker build -t localhost:5000/isp-frontend . --build-arg API_URL=http://something:8000
```