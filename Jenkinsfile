pipeline {
    agent {
        kubernetes {
            // Define the Kubernetes pod where Jenkins should run
            // You can customize this based on your requirements
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: slave
spec:
  containers:
  - name: docker
    image: docker:dind
    command:
    - cat
    tty: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
"""
        }
    }
    
    
    environment {
        DOCKER_REGISTRY = 'registry.iswleuven.be'
        IMAGE_NAME = 'student-projects/isp-class-schedule/backend'
    }
    stages {
        stage('Login to Docker Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'gitlab-reg-log', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "docker login -u ${env.DOCKER_USERNAME} -p ${env.DOCKER_PASSWORD} ${env.DOCKER_REGISTRY}"
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    def imageWithTag = "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.BRANCH_NAME}"
                    sh "docker build -t ${imageWithTag} . "
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    def imageWithTag = "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.BRANCH_NAME}"
                    sh "docker push ${imageWithTag}"
                }
            }
        }
    }
}