# Note Taker

This web app allows users to save, manage and interact with playlists and videos as well as add personal notes.
See it [live](https://note-taker-app-400810.web.app/).
<br>
<img align="center" height="300" src="https://github.com/VeraQueen/"/>

## Description

A dynamic web application that utilizes Firebase authentication, Firestore for data storage, YouTube Data API, YouTube Player API, Tailwind CSS for styling, and sessionStorage for data persistence. The application's primary goal is to allow users to save, manage, and interact with YouTube playlists, including listing videos, playing specific videos, and adding personal notes.

## Table of Contents

- [Tech stack](#Tech-stack)
- [General information](#general-information)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Tech stack

HTML5, CSS3, TypeScript, Angular, Tailwind CSS, Firebase (authentication, Firestore), YouTube's APIs: YouTube Data API and YouTube Player API

## General information

This project was generated with Angular CLI version 16.2.0. (updated to higher version later).

- To start using the files you should:

1. Download them by clicking the "Code" button.
2. Open the files in the IDE of your choice.
3. Run 'npm install' command to install dependecies.
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
5. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

- ### Installation - Firebase Config

To use this website as your own, you should create a new project in your Firebase console and copy the Firebase config file to environment variable. For privacy reasons the original Firebase config is kept private.

To obtain these values:

1. API Key, Auth Domain, Project ID, App ID: These values can be found in your Firebase project settings in the Firebase Console. Navigate to your project, then go to Project settings > General.

2. Measurement ID: This is specific to Firebase Analytics. If you're not using Firebase Analytics, you can omit this field.

Replace "YOUR_API_KEY", "YOUR_AUTH_DOMAIN", and so on with the actual values you obtain from your Firebase project settings. Once you've filled in these values, you can use the firebaseConfig object to initialize Firebase in this application.

- ### Installation - Accessing YouTube API Services

Similarly to Firebase, to access or use some YouTube API Services you first need to create API Credentials:

To obtain these values use the Google Developers Console to create API Credentials for your API Project.

## Contributing

Currently not accepting contributions. Thank you for consideration.

## License

This project utilizes various third-party services, each of which has its own terms of service and usage policies. Please review the terms of use for each service before using this project:

- **Firebase**: The Firebase services used in this project are subject to Google's [Terms of Service](https://firebase.google.com/terms).
- **Firestore**: Firestore is a part of the Firebase platform and is subject to Google's [Terms of Service](https://firebase.google.com/terms).
- **YouTube's APIs: YouTube Data API and YouTube Player API**: The YouTube's APIs are subject to Google's [Terms of Service](https://developers.google.com/youtube/terms/api-services-terms-of-service).

By using this project, you agree to comply with the terms of service and usage policies of each third-party service.
