import { useNavigation } from '@react-navigation/native';
import React, { PropsWithChildren, useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { Show, ShowItem } from '../Arcsi/types';

export const ShowEpisode = (
  props: PropsWithChildren<{ item: ShowItem; show: Show }>
) => {
  const { image_url, name, play_date } = props.item;
  const { cover_image_url, name: showName } = props.show;

  // TODO get the canonical URL from backend
  const canonizedCoverUrl = useMemo(() => {
    const parts = cover_image_url.split('/');
    return `https://media.lahmacun.hu/${parts[3]}/${image_url}`;
  }, [image_url, cover_image_url]);

  const navigation: any = useNavigation();

  return (
    <TouchableNativeFeedback
      style={styles.wrapper}
      onPress={() =>
        navigation.navigate('Episode', {
          episode: props.item,
          url: canonizedCoverUrl,
          showName
        })
      }>
      <View>
        <Image style={styles.coverImage} source={{ uri: canonizedCoverUrl }} />
        <Text style={styles.episodeName}>{name}</Text>
        <Text style={styles.episodeDescription}>Play Date: {play_date}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  coverImage: {
    width: 360,
    height: 360,
    alignSelf: 'center'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  episodeName: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: '500'
  },
  episodeDescription: {
    marginTop: 5,
    maxWidth: 150
  }
});
