node {
    def app

    /* clone from github */
    stage('Clone Repo From GitHub') {
        checkout scm
    }

    stage('Build & Test Image') {
        app = docker.build("andrewcheng/adservice")
    }

    stage('Push image') {
        /* Push image with tags of build and branch and latest */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
            app.push("${env.BUILD_NUMBER}")
            app.push("${env.GIT_BRANCH}")
            app.push("latest")
        }
    }

    stage("Run Image") {
        sh 'docker pull andrewcheng/adservice'
        sh 'docker stop $(docker ps -a -q)'
        sh 'docker rm $(docker ps -a -q)'
        sh 'docker run -d -p 80:80 andrewcheng/adservice'
    }
}
