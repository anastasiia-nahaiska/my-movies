import { object, string, mixed } from 'yup';
import { Keyboard, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, ControllerProps, Controller } from 'react-hook-form';

import { AppText } from '@components/app-text';
import { VideoFormat } from '@app/types/video-format';
import { AddMovieRequest } from '@services/movies/movies.dto';
import { useLocalization } from '@localization/useLocalization.hook';
import { FOUR_DIGITS_NUMBER, FULL_NAME_REGEX } from '@utils/constants/regexes';
import { MainButton } from '@components/buttons/main-button/MainButton.component';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from '@components/wrappers/keyboard-aware-scroll-view/KeyboardAwareScrollView.component';
import { AnimatedAppTextInput } from '@components/inputs/animated-app-text-input/AnimatedAppTextInput.component';

import { styles } from './add-movie-form.styles';
import { parseActors } from '@utils/helpers/parse-actors';

enum AddMovieField {
  Title = 'Title',
  Year = 'Year',
  Format = 'Format',
  Actors = 'Actors',
}

interface Form {
  [AddMovieField.Title]: string;
  [AddMovieField.Year]: string;
  [AddMovieField.Format]: VideoFormat;
  [AddMovieField.Actors]: string;
}

const FIRST_FILM_MADE_IN = 1888;
const CURRENT_YEAR = new Date().getFullYear();

interface SignInFormProps extends KeyboardAwareScrollViewProps {
  onSubmitPress: (params: AddMovieRequest) => void;
}

export const AddMovieForm: React.FC<SignInFormProps> = ({ onSubmitPress, contentContainerStyle, ...props }) => {
  const { t } = useLocalization();

  const schema = useMemo(
    () =>
      object({
        [AddMovieField.Title]: string().required(t('validation.required')).trim(),
        [AddMovieField.Year]: string()
          .required(t('validation.required'))
          .matches(FOUR_DIGITS_NUMBER, 'Year must be a 4-digit number')
          .test(
            'validYearRange',
            `Year must be between ${FIRST_FILM_MADE_IN} and ${CURRENT_YEAR}`,
            value => Number(value) >= FIRST_FILM_MADE_IN && Number(value) <= CURRENT_YEAR,
          ),
        [AddMovieField.Format]: mixed<VideoFormat>().required(t('validation.required')).oneOf(Object.values(VideoFormat), 'Invalid format'),
        [AddMovieField.Actors]: string()
          .required(t('validation.required'))
          .test(
            'validActors',
            'Actors must be full names separated by commas',
            value => value.length > 0 && value.split(',').every(name => FULL_NAME_REGEX.test(name.trim())),
          ),
      }),
    [],
  );

  const { control, handleSubmit, getValues } = useForm<Form>({
    mode: 'onBlur',
    resolver: yupResolver<Form>(schema),
    defaultValues: {
      [AddMovieField.Title]: '',
      [AddMovieField.Year]: '',
      [AddMovieField.Format]: undefined,
      [AddMovieField.Actors]: '',
    },
  });

  const submitForm = useCallback(() => {
    const values = getValues();

    Keyboard.dismiss();
    onSubmitPress({
      title: values[AddMovieField.Title],
      year: Number(values[AddMovieField.Year]),
      format: values[AddMovieField.Format],
      actors: parseActors(values[AddMovieField.Actors]),
    });
  }, [onSubmitPress]);

  const submitFormWithValidation = useCallback(handleSubmit(submitForm), [submitForm]);

  const renderTitleInput: ControllerProps<Form, AddMovieField.Title>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AnimatedAppTextInput
        {...field}
        onChangeText={field.onChange}
        errorMessage={fieldState.error?.message}
        textInputContainerStyle={styles.inputContainer}
        containerStyle={styles.inputOuterContainer}
      />
    ),
    [],
  );

  const renderYearInput: ControllerProps<Form, AddMovieField.Year>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AnimatedAppTextInput
        {...field}
        onChangeText={field.onChange}
        errorMessage={fieldState.error?.message}
        textInputContainerStyle={styles.inputContainer}
        containerStyle={styles.inputOuterContainer}
      />
    ),
    [],
  );

  const renderFormatInput: ControllerProps<Form, AddMovieField.Format>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AnimatedAppTextInput
        {...field}
        onChangeText={field.onChange}
        errorMessage={fieldState.error?.message}
        textInputContainerStyle={styles.inputContainer}
        containerStyle={styles.inputOuterContainer}
      />
    ),
    [],
  );

  const renderActorsInput: ControllerProps<Form, AddMovieField.Actors>['render'] = useCallback(
    ({ field, fieldState }) => (
      <AnimatedAppTextInput
        {...field}
        onChangeText={field.onChange}
        errorMessage={fieldState.error?.message}
        textInputContainerStyle={styles.inputContainer}
        containerStyle={styles.inputOuterContainer}
      />
    ),
    [],
  );

  return (
    <KeyboardAwareScrollView {...props}>
      <View style={styles.inputs}>
        <AppText>Title:</AppText>
        <Controller name={AddMovieField.Title} control={control} render={renderTitleInput} />
        <AppText>Year:</AppText>
        <Controller name={AddMovieField.Year} control={control} render={renderYearInput} />
        <AppText>Format(VHS, DVD, Blu-ray):</AppText>
        <Controller name={AddMovieField.Format} control={control} render={renderFormatInput} />
        <AppText>Actors(splitted by ,): </AppText>
        <Controller name={AddMovieField.Actors} control={control} render={renderActorsInput} />
      </View>
      <MainButton title={t('add')} style={styles.button} onPress={submitFormWithValidation} />
    </KeyboardAwareScrollView>
  );
};
