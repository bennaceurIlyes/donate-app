import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  useColorScheme,
  I18nManager,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import WateringPlantIllustration from './WateringPlantIllustration';
import HandsShakingIllustration from './HandsShakingIllustration';
import CheckmarksIllustration from './CheckmarksIllustration';

const { width } = Dimensions.get('window');

// Force RTL layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const carouselData = [
  {
    id: '1',
    message: 'Help Those in Need',
    description: 'Support people facing difficult circumstances through our outreach programs.',
    backgroundColor: '#f8e9e9',
    illustration: WateringPlantIllustration,
  },
  {
    id: '2',
    message: 'We grow together - you are not alone',
    description: 'Join our community of volunteers and make a difference together.',
    backgroundColor: '#e9f0f8',
    illustration: HandsShakingIllustration,
  },
  {
    id: '3',
    message: 'Step-by-step success',
    description: 'Your journey, your pace. We are here to support you every step of the way.',
    backgroundColor: '#e9f8ed',
    illustration: CheckmarksIllustration,
  },
  {
    id: '4',
    message: 'Ready to begin?',
    description: 'Start your journey of making a positive impact today.',
    backgroundColor: '#f8e9e9',
    isLastSlide: true,
  },
];

const IntroCarousel = ({ onGetStarted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const renderItem = ({ item, index }) => {
    const Illustration = item.illustration;
    return (
      <View style={[
        styles.slide, 
        { backgroundColor: isDarkMode ? colors.darkBackground : item.backgroundColor }
      ]}>
        {Illustration ? (
          <Animated.View 
            style={[
              styles.illustrationContainer,
              { opacity: fadeAnim }
            ]}
          >
            <Illustration width={width * 0.8} height={width * 0.8} />
          </Animated.View>
        ) : null}
        <View style={[
          styles.textContainer,
          { backgroundColor: isDarkMode ? colors.darkCard : colors.white }
        ]}>
          <Text style={[
            styles.title,
            { color: isDarkMode ? colors.white : colors.textDark }
          ]}>{item.message}</Text>
          <Text style={[
            styles.description,
            { color: isDarkMode ? colors.lightGray : colors.textMedium }
          ]}>{item.description}</Text>
        </View>
        
        {item.isLastSlide && (
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={onGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {carouselData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex && styles.activeDot,
            { backgroundColor: isDarkMode ? colors.darkDot : colors.borderLight }
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? colors.darkBackground : colors.warmWhite }
    ]}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  illustrationContainer: {
    width: '100%',
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  textContainer: {
    width: '100%',
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  title: {
    fontFamily: typography.fontFamily.handwriting,
    fontSize: typography.fontSize.xxxl,
    textAlign: 'left',
    marginBottom: spacing.md,
    fontWeight: typography.fontWeight.bold,
  },
  description: {
    fontFamily: typography.fontFamily.main,
    fontSize: typography.fontSize.lg,
    textAlign: 'left',
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: colors.coral,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    ...shadows.sm,
    marginTop: spacing.xl,
  },
  getStartedText: {
    color: colors.white,
    fontFamily: typography.fontFamily.main,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.coral,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default IntroCarousel; 