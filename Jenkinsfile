pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'catch-the-falling-objects-game'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                sh """
                rm -rf Catch-the-Falling-Objects-Game
                git clone https://github.com/prasanth624/Catch-the-Falling-Objects-Game.git
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    cd Catch-the-Falling-Objects-Game
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    """
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh """
                    docker stop \$(docker ps -aq) || true
                    docker rm \$(docker ps -aq) || true
                    docker run -itd -p 5000:5000 ${DOCKER_IMAGE}:${DOCKER_TAG}
                    docker ps
                    """
                }
            }
        }
    }
}
