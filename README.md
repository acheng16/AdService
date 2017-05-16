# AdService

### Overview

This is a simple RESFUL node.js service that is dockerized and compatible with jenkins multi-branch pipeline. It is also tested using the NPM mocha library.

### Tech-Stack Explanation

For such a simple application that we are creating only a POST service at a specific endpoint. NodeJS is the most light weight and fast framework to create the service. The code is sweet and concise versus different languages. The vast amount of NPM libraries available also makes this task very easy. Mocha was used because of the ease of writing test cases with it. Jenkins was chosen because of my experience in it as well as Target's use in the tool. The feature jenkins pipelining allows us to visualize build phases as well as separate branches and pull requests. Docker was chosen since it is a leader in open-source containerization solutions as well as the ease to share the dockerized image.

### Summary

First I logged on to my AWS account. Then I created an EC2 instance of size t2.small with security group that openned up the correct ports. I also assigned the EC2 instance a public ip address inorder to hit the Jenkins Instance. I updated Java to 1.8 as well as download and install Jenkins and Docker. After that I logged into Jenkins and installed all the proper plugins including NodeJS, Docker, and multi-pipeline tool. Next I created and configured the multipipeline job. Docker was installed after the multipipeline tool and configured to give Jenkins and EC2 user access. After that I coded the NodeJS application as well as installed the proper libraries needed to run the service. I tested my service locally via Postman. Then, I then pushed my code to GitHub and made sure the Jenkins deployed it to Docker Hub properly. After that, I tested the dockerized image on the server using Postman. I then thought of automating tests by using the Mocha NPM library to test my REST API endpoints. After creating the tests I pushed up the code and added the npm test to my Dockerfile. 

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

##### Node dependencies
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

### Observations
It is really easy to build the application in NodeJS with very few lines of code as well as test it with the library mocha from NodeJS. Generating a random number was semi-difficult due to the lack of Long datatype in Node. I decided to leverage the community library Random-JS for this reason. Jenkins was a painpoint to install due to the Java versioning issues. The ami from Amazon had JDK 1.7 installed, however, Jenkins required JDK 1.8. Also giving Jenkins permissions to run docker commands also took a little googling around.

### Future Features
##### Jenkinsfile
Customize jenkinsfile to have capabilities to support multiple types of builds. Not just nodejs, but java, scala, html/css, js, etc

##### Docker Deploy
Ability to deploy to any server not just the server that jenkins is hosted upon

##### Node Server
Ability to specificy what port to deploy on from a Proporties file

##### Server
Research and integrate a new size for the EC2 Server in order to process Jenkins and Docker faster

##### Tests
Leverage different testing framework such as Selenium, JUnit for Java, etc

### Contributors
Andrew Cheng

### License
This project is licensed under the MIT license
