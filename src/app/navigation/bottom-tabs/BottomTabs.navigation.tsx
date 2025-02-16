import { useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Typography } from '@components/app-text';
import { usePalette } from '@theme/usePalette.hook';
import { textStyles } from '@components/app-text/app-text.styles';
import { Movies } from '@app/screens/bottom-tabs/movies/Movies.screen';
import { Settings } from '@app/screens/bottom-tabs/settings/Settings.screen';
import { MainStackParamList, MainStackRoutes } from '@navigation/main-stack/main-stack.routes';

import { BottomTabsParamList, BottomTabsRoutes } from './bottom-tabs.routes';

const Stack = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabs: React.FC<NativeStackScreenProps<MainStackParamList, MainStackRoutes.BottomTabs>> = ({ navigation }) => {
  const { background, primary, disabledText } = usePalette();

  const renderMoviesTabIcon = useCallback(({ color }: { color: string }) => <Ionicons name="videocam" size={24} color={color} />, []);
  const renderSettingsTabIcon = useCallback(({ color }: { color: string }) => <Ionicons name="settings-sharp" size={24} color={color} />, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: background },
        tabBarStyle: { backgroundColor: background, height: 60, borderTopColor: disabledText },
        tabBarLabelStyle: textStyles[Typography.Caption],
        tabBarActiveTintColor: primary as string,
        tabBarInactiveTintColor: disabledText as string,
      }}>
      <Stack.Screen options={{ tabBarIcon: renderMoviesTabIcon }} name={BottomTabsRoutes.Movies} component={Movies} />
      <Stack.Screen options={{ tabBarIcon: renderSettingsTabIcon }} name={BottomTabsRoutes.Settings} component={Settings} />
    </Stack.Navigator>
  );
};
