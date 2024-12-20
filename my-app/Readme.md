# 0. install node_modules
```bash
npm install
```
- add some required packages for the web-native bundler
```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

- add packages for navigations, REMEMBER to cite in the my-app project:
``` bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/elements
npm install @react-navigation/material-top-tabs
npm install react-native-tab-view
npm install react-native-gesture-handler react-native-reanimated
npm install react-native-vector-icons
```

# 1. Start expo project to bundle the app
```bash
npx expo start
```