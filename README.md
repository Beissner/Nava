# Nava
> This mobile app is built using React Native and the [Expo SDK](https://docs.expo.io/versions/v18.0.0/sdk/index.html#expo-sdk). It utilizes the public GitHub API to display repositories for a given user or organization and allows for sorting and filtering results. 

## Tools and Packages
* Expo - a set tools and services built around React Native that allows developers to quickly build, test and deploy mobile apps
* React Native Elements - a React Native UI Toolkit. I used this for the input field and icons.
* Moment - used to format dates
* FlatList - Instead of paginating results, I'm using FlatList which renders children lazily, meaning it only renders the components the user can see. 

### Running the App
* Run `expo start` to open Expo Dev Tools, a control panel for developing your app in the browser. From here you can open the app on an ios/android simulator or on an actual connected device.

