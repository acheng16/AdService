node {
    def app

    /* clone from github */
    stage('Clone Repo From GitHub') {
        checkout scm
    }

    stage('Build Image') {
        app = docker.build("andrewcheng/adservice")
    }

    stage('Test image') {
        app.inside {
            sh 'npm install'
            sh 'npm install -g mocha'
            sh 'npm install request --save'
            sh 'npm test'
        }
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
        sh 'docker rm -f adservice || true'
        sh 'docker run -d -p 80:80 --name adservice andrewcheng/adservice'
    }
}
