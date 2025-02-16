import { object, string } from 'yup';
import { Keyboard, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, ControllerProps, Controller } from 'react-hook-form';

import { EMAIL_REGEX } from '@utils/constants/regexes';
import { useLocalization } from '@localization/useLocalization.hook';
import { MainButton } from '@components/buttons/main-button/MainButton.component';
import { AppTextInput } from '@components/inputs/app-text-input/AppTextInput.component';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from '@components/wrappers/keyboard-aware-scroll-view/KeyboardAwareScrollView.component';

import { styles } from './sign-in-form.styles';

enum SignInField {
  Email = 'Email',
  Password = 'Password',
}

interface Form {
  [SignInField.Email]: string;
  [SignInField.Password]: string;
}

interface SignInFormProps extends KeyboardAwareScrollViewProps {
  onSubmitPress: (email: string, password: string) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSubmitPress, contentContainerStyle, ...props }) => {
  const { t } = useLocalization();

  const schema = useMemo(
    () =>
      object({
        [SignInField.Email]: string().required().matches(EMAIL_REGEX, t('validation.invalidEmail')),
        [SignInField.Password]: string().required(t('validation.required')),
      }),
    [],
  );

  const { control, handleSubmit, getValues } = useForm<Form>({
    mode: 'onBlur',
    resolver: yupResolver<Form>(schema),
    defaultValues: {
      [SignInField.Email]: '',
      [SignInField.Password]: '',
    },
  });

  const submitForm = useCallback(() => {
    const values = getValues();

    Keyboard.dismiss();
    onSubmitPress(values[SignInField.Email], values[SignInField.Password]);
  }, [onSubmitPress]);

  const submitFormWithValidation = useCallback(handleSubmit(submitForm), [submitForm]);

  const renderEmailInput: ControllerProps<Form, SignInField.Email>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AppTextInput {...field} onChangeText={field.onChange} errorMessage={fieldState.error?.message} placeholder={t('email')} />
    ),
    [],
  );

  const renderPasswordInput: ControllerProps<Form, SignInField.Password>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AppTextInput {...field} onChangeText={field.onChange} errorMessage={fieldState.error?.message} type="password" placeholder={t('password')} />
    ),
    [],
  );

  return (
    <KeyboardAwareScrollView {...props}>
      <View style={styles.inputs}>
        <Controller name={SignInField.Email} control={control} render={renderEmailInput} />
        <Controller name={SignInField.Password} control={control} render={renderPasswordInput} />
      </View>
      <MainButton title={t('signIn.button')} onPress={submitFormWithValidation} />
    </KeyboardAwareScrollView>
  );
};
