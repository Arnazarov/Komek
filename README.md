# Data-driven Medical App utilizing On-mobile & On-cloud NoSQL Database services
<p>
  <!-- AWS -->
  <img alt="Supports AWS" longdesc="Supports AWS" src="https://img.shields.io/badge/AWS-4630EB.svg?style=flat-square&logo=amazonaws&labelColor=orange&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>
The objective of this project is to provide a microservice-based framework for assessing patient’s health by securely processing, storing and reporting data collected by medical
sensors. The framework consists of the edge middleware, cloud middleware and lightweight interface applications that binds them. The Edge middleware lives in an Android device or
computer and is responsible for processing, storing, building and pushing the health records to the cloud middleware. In turn, the cloud middleware manages the pushed data, offers a
database, a storage and ensures accessibility of medical records.

## This project is two parts
### Module_1_DynamoDB_SpringBoot/: needs to run on AWS cloud

It is a Java Spring Boot application that allows to perform CRUD operations on a cloud-hosted database. It acts as an interface that binds a AWS DynamoDB on-cloud database and an Android application that locates in Module_2_Couchbase_Android.

- **Sub-modules:**

      - config/            		: builds a configuration client that connect to a AWS DynamoDB service
      - controller/        		: generates RESTful API paths to handle basic queries
      - entity/            		: holds entity classes for data attributes
      - repository/        		: implements all CRUD operation requests made on a database

- **Libraries utilized:**

      - dotenv-java             	 : loads environment variables from a .env file
      - lombok                  	 : java library that automatically plugs into your editor and build tools

- **Packages/tools/frameworks needed:**

  - Java SDK: For building and running the module. [Link.](https://www.oracle.com/java/technologies/downloads/)
  - Spring Framework: For building RESTful web application. [Link.](https://mvnrepository.com/artifact/org.springframework.boot)
  - AWS SDK for Java: For connecting with AWS services. [Link.](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk)

- **Steps to install & run:**

1.  Download and install Java SDK and AWS SDK
2.  Clone the code from this repo using: `https://github.com/Arnazarov/Komek.git`
3.  Open terminal or git bash
4.  Locate to the folder "Module_1_DynamoDB_SpringBoot"
5.  Create `.env` file in the `src/main/resources/` folder and assign credentials for AWS client.
6.  Run `mvn clean install`
7.  Locate the genereted `.jar`
8.  Create an AWS EC2 instance and S3 bucket on the cloud
9.  Create a DynamoDB database and a table called "patients
10. Upload `.jar` file from step 6 on a S3 bucket
11. Connect to an EC2 instance via SSH client and download the `.jar` file from the S3 bucket
12. Run `.jar` file on a cloud runtime environment

### Module_2_Realm_Android/: needs to run on Android device

It is an Android application that connects to a AWS DynamoDB on the cloud and the local Couchbase Lite database on mobile. It performs CRUD operations on both databases and displays GUI.

- **Sub-modules:**

      - android/           		      : java files that build the android application
      - app/         			      : all application related UI components as well as Realm DB configuration w/ schema-models
      - configurations/		     : envrionment variables configuration
      - controllers/ 	        	      : methods to read/write transactions to DynamoDB


- **Libraries utilized:**

       - axios                              : promise based HTTP client for the browser and node.js.
       - react                              : is a free and open-source front-end JavaScript library for building user interfaces based on UI components.
       - realm                              : is a mobile database that runs directly inside phones, tablets or wearables.

- **Packages/tools/frameworks needed:**

  - Java SDK: For building and running the module. [Link.](https://www.oracle.com/java/technologies/downloads/)
  - Android Studio: For building, testing and running android application. [Link.](https://developer.android.com/studio)
  - Realm by MongoDB: Realm is a fast, scalable alternative to SQLite with mobile to cloud data sync that makes building real-time, reactive mobile apps easy. [Link.](https://realm.io)
  - React Native: React Native is an open-source JavaScript framework, designed for building apps on multiple platforms like iOS, Android. It is based on React. [Link](https://reactnative.dev)
  - Expo: Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React. [Link](https://expo.dev)

- **Steps to install & run:**

1.  Download and install Java SDK and AWS SDK.
2.  Clone the code from this repo using: `https://github.com/Arnazarov/Komek.git`
3.  Open terminal or git bash.
4.  Locate to the folder "Module_2_Realm_Android".
5.  [Setup development Environment](https://reactnative.dev/docs/environment-setup)
6.  Build/Run on Android
```
yarn android or npm run android
```
Note: Alternatively, you can run the Komek.apk file on a device or emulator as well.

###  Snapshots
![Home](./Module_2_Realm_Android/assets/welcome.JPG) ![Home](./Module_2_Realm_Android/assets/home.JPG) ![Home](./Module_2_Realm_Android/assets/profile.JPG)
