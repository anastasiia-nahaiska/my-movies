import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppDispatch } from '@store/hooks';
import { moviesSlice } from '@store/slices/movies.slice';
import { AddMovieRequest } from '@services/movies/movies.dto';
import { showToastWithError } from '@utils/show-toast-with-error';
import { useLocalization } from '@localization/useLocalization.hook';
import { AddMovieForm } from './add-movie-form/AddMovieForm.component';
import { DefaultHeader } from '@components/headers/default-header/DefaultHeader.component';
import { MainStackParamList, MainStackRoutes } from '@navigation/main-stack/main-stack.routes';

import { styles } from './add-movie.styles';

export const AddMovie: React.FC<NativeStackScreenProps<MainStackParamList, MainStackRoutes.AddMovie>> = ({ navigation }) => {
  const { t } = useLocalization();
  const dispatch = useAppDispatch();

  const onSubmit = async (params: AddMovieRequest) => {
    try {
      // Todo: uncomment when BE fix token;
      // await dispatch(addMovie(params));

      // Todo: remove when BE fix token;
      dispatch(moviesSlice.actions.addMovie(params));
      navigation.goBack();
    } catch (e) {
      showToastWithError(e, t);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DefaultHeader title={t('addMovie')} onArrowBackPress={navigation.goBack} />
      <AddMovieForm onSubmitPress={onSubmit} />
    </SafeAreaView>
  );
};
