import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackRoutes } from '@navigation/app-stack.routes';
import { useLocalization } from '@localization/useLocalization.hook';
import { DefaultHeader } from '@components/headers/default-header/DefaultHeader.component';
import { AuthSackParamList, AuthStackRoutes } from '@navigation/auth-stack/auth-stack.routes';

import { styles } from './sign-in.styles';
import { SignInForm } from './components/sign-in-form/SignInForm.component';

export const SignIn: React.FC<NativeStackScreenProps<AuthSackParamList, AuthStackRoutes.SignIn>> = ({ navigation }) => {
  const { t } = useLocalization();

  const onSubmit = () => {
    navigation.dispatch(CommonActions.reset({ routes: [{ name: AppStackRoutes.BottomTabs }], index: 0 }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <DefaultHeader title={t('signIn.title')} onArrowBackPress={navigation.goBack} />
      <SignInForm onSubmitPress={onSubmit} />
    </SafeAreaView>
  );
};
