pipeline {
	environment {
    	registry = "guardian16/nimhans"
    	registryCredential = 'dockerhub-creds'
    	dockerImage = ''
  }
    agent any 
    stages {
        stage('Installing Dependencies') { 
            steps {
                sh "npm install"
            }
        }
	stage('Testing Phase'){
	    steps {
                sh "ng test"
            }
	}
        stage('Building Angular Application') { 
            steps {
                sh "ng build --prod --aot"
            }
        }
         stage('Building Docker Image') {
      		steps {
        		script {
          			dockerImage = docker.build registry + ":latest"
        		}
      		}
    	}
    	stage('Publishing Docker Image') {
      		steps {
        		script {
          			docker.withRegistry( '', registryCredential ) {
            		dockerImage.push()
          			}
        		}
      		}
    	}
	stage('Trigger Rundeck'){
    		steps {
    			build 	'rundeck-test'
    		}
    	}
    }
}
