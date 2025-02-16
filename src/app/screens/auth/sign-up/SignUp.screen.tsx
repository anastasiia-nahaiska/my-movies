import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DefaultHeader } from '@components/headers/default-header/DefaultHeader.component';
import { AuthSackParamList, AuthStackRoutes } from '@navigation/auth-stack/auth-stack.routes';

import { CreateUserRequest } from '@services/auth/auth.dto';
import { AppStackRoutes } from '@navigation/app-stack.routes';
import { useLocalization } from '@localization/useLocalization.hook';
import { SignUpForm } from './components/sign-up-form/SignUpForm.component';

import { styles } from './sign-up.styles';
import { useAuthService } from '@app/hooks/useAuthService.hook';

export const SignUp: React.FC<NativeStackScreenProps<AuthSackParamList, AuthStackRoutes.SignUp>> = ({ navigation }) => {
  const { t } = useLocalization();
  const authService = useAuthService();

  const onSubmit = async (params: CreateUserRequest) => {
    try {
      await authService.signUp(params);
      navigation.dispatch(CommonActions.reset({ routes: [{ name: AppStackRoutes.BottomTabs }], index: 0 }));
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DefaultHeader title={t('signUp.title')} onArrowBackPress={navigation.goBack} />
      <SignUpForm onSubmitPress={onSubmit} />
    </SafeAreaView>
  );
};
