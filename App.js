import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeProvider, useTheme } from './context/ThemeContext.js';
import { AuthProvider } from './context/AuthContext.js';
import { AlertProvider } from './context/AlertContext.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, I18nManager, View } from 'react-native';

// Import screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import RegistrationSuccessScreen from './screens/RegistrationSuccessScreen';
import ProfileScreen from './screens/ProfileScreen';
import DonationHistoryScreen from './screens/DonationHistoryScreen';
import AdminDashboard from './screens/AdminDashboard';
import AddFamily from './screens/AddFamily';
import EditFamily from './screens/EditFamily';

// Import new family donation screens
import FamiliesScreen from './screens/FamiliesScreen';
import FamilyDetailsScreen from './screens/FamilyDetailsScreen';
import FamilyDonationProcessScreen from './screens/FamilyDonationProcessScreen';
import DonateScreen from './screens/DonateScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Force RTL layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// RTL Layout Wrapper Component
const RTLLayoutWrapper = ({ children }) => {
  useEffect(() => {
    // Ensure RTL is enabled
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      // Reload the app to apply RTL changes
      // Note: This will only work in development
      if (__DEV__) {
        // You might want to add a reload mechanism here
        console.log('RTL enabled, please reload the app');
      }
    }
  }, []);

  return (
    <View style={{ flex: 1, direction: 'rtl' }}>
      {children}
    </View>
  );
};

const MainTabs = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          paddingBottom: 18 + insets.bottom,
          height: 70 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="Families"
        component={FamiliesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="family-restroom" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DonationTracking"
        component={DonationHistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="history" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="AdminDashboard" 
        component={AdminDashboard}
      />
      <Stack.Screen 
        name="AddFamily" 
        component={AddFamily}
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FF7F50',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen 
        name="EditFamily" 
        component={EditFamily}
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FF7F50',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

const RightAlignedHeader = ({ children }) => (
  <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', fontSize: 20, marginRight: 16 }}>
    {children}
  </Text>
);

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AlertProvider>
          <RTLLayoutWrapper>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  animationDirection: 'horizontal',
                }}
              >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccessScreen} />
                <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="AdminStack" component={AdminStack} />
                <Stack.Screen name="FamilyDetails" component={FamilyDetailsScreen} />
                <Stack.Screen name="FamilyDonationProcess" component={FamilyDonationProcessScreen} />
                <Stack.Screen name="Donate" component={DonateScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </RTLLayoutWrapper>
        </AlertProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
