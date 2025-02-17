import { object, ref, string } from 'yup';
import { Keyboard, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, ControllerProps, Controller } from 'react-hook-form';

import { useLocalization } from '@localization/useLocalization.hook';
import { MainButton } from '@components/buttons/main-button/MainButton.component';
import { EMAIL_REGEX, NAME_REGEX, NO_SPACES_REGEX, PASSWORD_MIN_MAX_REGEX } from '@utils/constants/regexes';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from '@components/wrappers/keyboard-aware-scroll-view/KeyboardAwareScrollView.component';

import { styles } from './sign-up-form.styles';
import { CreateUserRequest } from '@services/auth/auth.dto';
import { AnimatedAppTextInput } from '@components/inputs/animated-app-text-input/AnimatedAppTextInput.component';

enum SignUpField {
  Name = 'Name',
  Email = 'Email',
  Password = 'Password',
  ConfirmPassword = 'ConfirmPassword',
}

interface Form {
  [SignUpField.Name]: string;
  [SignUpField.Email]: string;
  [SignUpField.Password]: string;
  [SignUpField.ConfirmPassword]: string;
}

interface SignUpFormProps extends KeyboardAwareScrollViewProps {
  onSubmitPress: (params: CreateUserRequest) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmitPress, contentContainerStyle, ...props }) => {
  const { t } = useLocalization();

  const schema = useMemo(
    () =>
      object({
        [SignUpField.Name]: string().required(t('validation.required')).matches(NAME_REGEX, t('validation.invalidName')),
        [SignUpField.Email]: string().required(t('validation.required')).matches(EMAIL_REGEX, t('validation.invalidEmail')),
        [SignUpField.Password]: string()
          .required(t('validation.required'))
          .trim()
          .matches(PASSWORD_MIN_MAX_REGEX, t('validation.passwordMinMaxLength', { min: 8, max: '32' })),
        [SignUpField.ConfirmPassword]: string()
          .required(t('validation.required'))
          .oneOf([ref(SignUpField.Password)], t('validation.confirmPassword')),
      }),
    [],
  );

  const { control, handleSubmit, getValues } = useForm<Form>({
    mode: 'onBlur',
    resolver: yupResolver<Form>(schema),
    defaultValues: {
      [SignUpField.Name]: '',
      [SignUpField.Email]: '',
      [SignUpField.Password]: '',
      [SignUpField.ConfirmPassword]: '',
    },
  });

  const submitForm = useCallback(() => {
    const values = getValues();

    Keyboard.dismiss();
    onSubmitPress({
      name: values[SignUpField.Name],
      email: values[SignUpField.Email],
      password: values[SignUpField.Password],
      confirmPassword: values[SignUpField.ConfirmPassword],
    });
  }, [onSubmitPress]);

  const submitFormWithValidation = useCallback(handleSubmit(submitForm), [submitForm]);

  const renderNameInput: ControllerProps<Form, SignUpField.Name>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AnimatedAppTextInput {...field} onChangeText={field.onChange} errorMessage={fieldState.error?.message} placeholder={t('name')} />
    ),
    [],
  );

  const renderEmailInput: ControllerProps<Form, SignUpField.Email>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AnimatedAppTextInput {...field} onChangeText={field.onChange} errorMessage={fieldState.error?.message} placeholder={t('email')} />
    ),
    [],
  );

  const renderPasswordInput: ControllerProps<Form, SignUpField.Password>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AnimatedAppTextInput
        {...field}
        onChangeText={field.onChange}
        errorMessage={fieldState.error?.message}
        type="password"
        placeholder={t('password')}
      />
    ),
    [],
  );

  const renderConfirmPasswordInput: ControllerProps<Form, SignUpField.ConfirmPassword>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AnimatedAppTextInput
        {...field}
        onChangeText={field.onChange}
        errorMessage={fieldState.error?.message}
        type="password"
        placeholder={t('confirmPassword')}
      />
    ),
    [],
  );

  return (
    <KeyboardAwareScrollView {...props}>
      <View style={styles.inputs}>
        <Controller name={SignUpField.Name} control={control} render={renderNameInput} />
        <Controller name={SignUpField.Email} control={control} render={renderEmailInput} />
        <Controller name={SignUpField.Password} control={control} render={renderPasswordInput} />
        <Controller name={SignUpField.ConfirmPassword} control={control} render={renderConfirmPasswordInput} />
      </View>
      <MainButton title={t('signIn.button')} style={styles.button} onPress={submitFormWithValidation} />
    </KeyboardAwareScrollView>
  );
};
