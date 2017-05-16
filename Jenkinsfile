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
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

    stage("Run Image") {
        sh 'docker pull andrewcheng/adservice'
        sh 'docker rm -f adservice || true'
        sh 'docker run -d -p 8000:80 --name adservice andrewcheng/adservice'
    }
}
