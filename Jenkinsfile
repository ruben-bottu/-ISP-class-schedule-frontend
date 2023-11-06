pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: agent
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    tty: true
    command: 
      - cat
"""
        }
    }
    environment {
        DOCKER_REGISTRY = 'registry.iswleuven.be'
        IMAGE_NAME = 'student-projects/isp-class-schedule/frontend'
        API_URL = credentials('api-url')
    }
    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'gitlab-reg-log', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        container('kaniko') {
                            def imageWithTag = "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.BRANCH_NAME.replace('/', '-')}"

                            sh """
                            echo '{ "auths": { "${env.DOCKER_REGISTRY}": { "username": "${env.DOCKER_USERNAME}", "password": "${env.DOCKER_PASSWORD}" } } }' > /kaniko/.docker/config.json
                            """

                            sh """
                            /kaniko/executor --context=${WORKSPACE} --dockerfile=${WORKSPACE}/Dockerfile --destination=${imageWithTag} --build-arg API_URL=${env.API_URL} --cache=true
                            """
                        }
                    }
                }
            }
        }
    }
}
