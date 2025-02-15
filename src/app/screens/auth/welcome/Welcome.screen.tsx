import React from 'react';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import lottie from '@assets/lotties/welcome.json';
import { AppText, Typography } from '@components/app-text';
import { AuthSackParamList, AuthStackRoutes } from '@navigation/auth-stack/auth-stack.routes';
import { MainButton, MainButtonType } from '@components/buttons/main-button/MainButton.component';

import { styles } from './welcome.styles';

export const Welcome: React.FC<NativeStackScreenProps<AuthSackParamList, AuthStackRoutes>> = ({ navigation }) => {
  const navigateToSignIn = () => navigation.navigate(AuthStackRoutes.SignIn);
  const navigateToSignUp = () => navigation.navigate(AuthStackRoutes.SignUp);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView autoPlay loop style={styles.lottie} source={lottie} />
      <AppText typography={Typography.Heading1} style={styles.welcome}>
        Welcome, Movie Buff!
      </AppText>
      <AppText typography={Typography.Body} style={[styles.subtitle]}>
        Your cinematic journey begins here
      </AppText>
      <MainButton title="Sign in" type={MainButtonType.Outlined} onPress={navigateToSignIn} />
      <MainButton title="Sign up" onPress={navigateToSignUp} />
    </SafeAreaView>
  );
};
