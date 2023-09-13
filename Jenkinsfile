pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: slave
spec:
  containers:
  - name: docker
    image: docker:20.10-dind  # Use a version that supports BuildKit
    env:
    - name: DOCKER_BUILDKIT
      value: "1"
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
                container('docker') {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'gitlab-reg-log', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh "docker login -u ${env.DOCKER_USERNAME} -p ${env.DOCKER_PASSWORD} ${env.DOCKER_REGISTRY}"
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    script {
                        def imageWithTag = "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.BRANCH_NAME}"
                        sh "docker build --build-arg BUILDKIT_INLINE_CACHE=1 -t ${imageWithTag} ."
                    }
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                container('docker') {
                    script {
                        def imageWithTag = "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.BRANCH_NAME}"
                        sh "docker push ${imageWithTag}"
                    }
                }
            }
        }
    }
}
