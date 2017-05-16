# AdService

### Overview

This is a simple RESFUL node.js service that is dockerized and compatible with jenkins multi-branch pipeline. It is also tested using the NPM mocha library.

### Tech-Stack Explanation

For such a simple application that we are creating only a POST service at a specific endpoint. NodeJS is the most light weight and fast framework to create the service. The code is sweet and concise versus different languages. The vast amount of NPM libraries available also makes this task very easy. Mocha was used because of the ease of writing test cases with it. Jenkins was chosen because of my experience in it as well as Target's use in the tool. The feature jenkins pipelining allows us to visualize build phases as well as separate branches and pull requests. Docker was chosen since it is a leader in open-source containerization solutions as well as the ease to share the dockerized image.

### Installation

Build an AWS EC2 linux instance (tested with default Amazon linux ami).
SG Inbound:
1. tcp 80
2. tcp 8080
3. tcp 22

Assign public IP address

ssh into box using Security Key

##### Update Plugins
1. sudo yum update -y

##### Install Java JDK for compatibility with Jenkins
1. sudo yum install -y git nginx java-1.8.0-openjdk-devel aws-cli

##### Installing Jenkins
1. sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
2. sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
3. sudo yum install jenkins -y
4. sudo service jenkins start
5. sudo service jenkins status

##### Setting up Jenkins
1. Navigate to {AWS Public IP Address}:8080 on browser
2. Copy password from /var/lib/jenkins/secrets/initalAdminPassword
3. Go through steps to setup Admin User
4. Install Default Packages
5. Install Jenkins Package NodeJS
6. Install Jenkins Package Pipeline: Multibranch
7. ConfigureSystems: Set Github up and manage connection (need to convert login and password to Token with help of Jenkins)
8. ConfigureTools: NodeJS setup to install nodejs from nodejs.org (tested with 7.10.10)

##### Jenkins Multibranch Pipeline Job
1. New Item -> Multibranch Pipeline
2. Branch Source -> GitHub, use github credentials and owner.
3. Mode -> by Jenkinsfile
4. Select your Repository
5. Save

##### Setting up DockerHub
1. Navigate to dockerhub.com
2. Create a login
3. Create a repository (this is referred to in Jenkinsfile)
4. Add login to credentials in Jenkins

##### Install Docker
1. sudo yum install -y docker
2. sudo service docker start
3. sudo service docker status
4. sudo usermod -a -G docker ec2-user (giving you console access to run docker)
5. sudo gpasswd -a jenkins docker (giving jenkins access to run docker commands)
6. sudo service docker restart
7. sudo service jenkins restart

### Usage (Running Locally)

##### Via Container
1. docker pull andrewcheng/adservice
2. docker run -d -p 80:80 --name adservice andrewcheng/adservice

##### Via Non-Container
1. git clone https://github.com/acheng16/AdService
2. npm install
3. npm install -g mocha
4. npm install request --save
5. node server.js (runs on port 80)

##### Running Tests
1. npm test

### Dependencies

##### node dependencies
1. Express
2. Body-Parser
3. Mocha
4. Random-JS

##### Jenkins dependencies
1. DockerHub
2. Multibranch
3. NodeJS

### API Reference
##### GET /
response: hello world
##### POST /api/v1/user
request: user_id

response: random int from 0-4294967295

### Future Features
##### Jenkinsfile
Customize Jenkinsfile to have capabilities to support multiple types of builds. Not just nodejs, but java, scala, html/css, js, etc

##### Jenkins
Add multiple slaves for Jenkins

##### Docker Deploy
Ability to deploy to any server not just the server that Jenkins is hosted upon

##### Docker
Add multiple slaves for Docker

##### Tests
Leverage different testing framework such as Selenium, JUnit for Java, etc.

### Contributors
Andrew Cheng

### License
This project is licensed under the MIT license
