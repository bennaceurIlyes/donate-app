# Donate App (Frontend)

A React Native mobile application for managing and tracking donations to families in need. This app allows users to register, donate, view donation history, and track the progress of their donations. Admins can manage families and donation statuses.

## Features
- User registration and login
- Donate to families and track donation progress
- View donation history with status updates
- Admin panel for managing families and donations
- Arabic language support
- Modern, clean UI

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm or yarn
- Android Studio (for building APKs)
- Java JDK 11 or later

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   cd donate-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App (Development)
- For Android:
  ```sh
  npx react-native run-android
  ```
- For iOS (if supported):
  ```sh
  npx react-native run-ios
  ```

### Building a Release APK
1. Go to the Android directory:
   ```sh
   cd android
   ```
2. Generate the release APK:
   ```sh
   ./gradlew assembleRelease
   ```
3. The APK will be located at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

### Environment Variables
- Configure your API endpoints in `donate-frontend/config.js` as needed.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License. 
