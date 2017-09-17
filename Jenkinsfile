#! groovy
node {
    checkout scm

    def pom = readMavenPom file: 'server/pom.xml'
    codeBucket = "erfangc.com-codebase"

    stage('Build') {
        sh './build.sh'
    }

    stage('Upload Artifact') {
        uberJar = "${pom.artifactId}-${pom.version}.jar"
        s3Upload(file: "server/target/${uberJar}", bucket: codeBucket, path: uberJar)

        /*
        update the uber JAR as a new version in ElasticBeanstalk
         */

        /*
        first we delete existing snapshots if the current build is a snapshot build
         */
        if (pom.version.endsWith("SNAPSHOT")) {
            sh """
aws elasticbeanstalk delete-application-version \
    --application-name ${pom.artifactId} \
    --version-label ${pom.version} \
    --region us-east-1
"""
        }

        sh """
aws elasticbeanstalk create-application-version \
    --application-name ${pom.artifactId} \
    --version-label ${pom.version} \
    --region us-east-1 \
    --source-bundle S3Bucket='${codeBucket}',S3Key='${uberJar}'
"""
    }

    stage('Deploy to DEV') {
        sh """
aws elasticbeanstalk update-environment \
    --application-name ${pom.artifactId} \
    --version-label ${pom.version} \
    --environment-name ${pom.artifactId}-DEV \
    --region us-east-1
"""
    }
}