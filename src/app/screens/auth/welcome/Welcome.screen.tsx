import React from 'react';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import lottie from '@assets/lotties/welcome.json';
import { AppText, Typography } from '@components/app-text';
import { useLocalization } from '@localization/useLocalization.hook';
import { AuthSackParamList, AuthStackRoutes } from '@navigation/auth-stack/auth-stack.routes';
import { MainButton, MainButtonType } from '@components/buttons/main-button/MainButton.component';

import { styles } from './welcome.styles';

export const Welcome: React.FC<NativeStackScreenProps<AuthSackParamList, AuthStackRoutes.Welcome>> = ({ navigation }) => {
  const { t } = useLocalization();

  const navigateToSignIn = () => navigation.navigate(AuthStackRoutes.SignIn);
  const navigateToSignUp = () => navigation.navigate(AuthStackRoutes.SignUp);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView autoPlay loop style={styles.lottie} source={lottie} />
      <AppText typography={Typography.Heading1} style={styles.welcome}>
        {t('welcome.title')}
      </AppText>
      <AppText typography={Typography.Body} style={[styles.subtitle]}>
        {t('welcome.subtitle')}
      </AppText>
      <MainButton title={t('welcome.signIn')} type={MainButtonType.Outlined} onPress={navigateToSignIn} />
      <MainButton title={t('welcome.signUp')} onPress={navigateToSignUp} />
    </SafeAreaView>
  );
};
