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
    image: gcr.io/kaniko-project/executor:latest
    volumeMounts:
    - name: docker-config
      mountPath: /kaniko/.docker/
  volumes:
  - name: docker-config
    configMap:
      name: docker-config
"""
        }
    }
    environment {
        DOCKER_REGISTRY = 'registry.iswleuven.be'
        IMAGE_NAME = 'student-projects/isp-class-schedule/backend'
    }
    stages {
        stage('Build and Push Docker Image') {
            steps {
                container('kaniko') {
                    script {
                        def imageWithTag = "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.BRANCH_NAME}"
                        sh """
                        /kaniko/executor --context=${WORKSPACE} --dockerfile=${WORKSPACE}/Dockerfile \
                        --destination=${imageWithTag} --cache=true
                        """
                    }
                }
            }
        }
    }
}
