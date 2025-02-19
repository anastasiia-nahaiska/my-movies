import React, { useCallback } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Theme } from '@theme/theme.types';
import { AppText } from '@components/app-text';
import { Line } from '@components/line/Line.component';
import { useSignOut } from '@app/hooks/useSignOut.hook';
import { usePalette, useTheme } from '@theme/usePalette.hook';
import { LanguageCode } from '@localization/localization.service';
import { useLocalization } from '@localization/useLocalization.hook';
import { Switch } from '@components/controls/switch/Switch.component';
import { BigHeader } from '@components/headers/big-header/BigHeader.component';
import { TextButton } from '@components/buttons/text-button/TextButton.component';

import { styles } from './settings.styles';

export const Settings: React.FC = () => {
  const { text } = usePalette();
  const { changeTheme, theme } = useTheme();
  const { language, t, changeLanguage } = useLocalization();

  const signOut = useSignOut();

  const [isEnglish, isDarkTheme] = [language === LanguageCode.EN, theme === Theme.Dark];

  const handleLanguageSwitching = useCallback(() => {
    changeLanguage(isEnglish ? LanguageCode.UK : LanguageCode.EN);
  }, [isEnglish]);

  const handleThemeSwitching = useCallback(() => {
    changeTheme(isDarkTheme ? Theme.Light : Theme.Dark);
  }, [isDarkTheme]);

  return (
    <SafeAreaView style={styles.container}>
      <BigHeader title={t('settings')} />
      <View style={styles.settings}>
        <Switch onPress={handleThemeSwitching} selected={isDarkTheme} labelStart={<AppText>{t('darkTheme')}</AppText>} hitSlop={20} />
        <Line />
        <Switch onPress={handleLanguageSwitching} selected={isEnglish} labelStart={<AppText>{t('english')}</AppText>} hitSlop={20} />
        <Line />
        <TextButton title={t('signOut')} hitSlop={20} endElement={<Ionicons name="log-out-outline" size={24} color={text} />} onPress={signOut} />
      </View>
    </SafeAreaView>
  );
};
