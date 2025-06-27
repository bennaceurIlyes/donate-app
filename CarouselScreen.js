import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Animated, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './context/ThemeContext';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'تبرع بسهولة',
    description: 'تبرع بسهولة وسرعة من خلال تطبيقنا',
    icon: 'heart-circle',
    iconColor: '#FF6F61',
  },
  {
    id: '2',
    title: 'تتبع تبرعاتك',
    description: 'تابع حالة تبرعاتك وتاريخها',
    icon: 'analytics',
    iconColor: '#2196F3',
  },
  {
    id: '3',
    title: 'ساعد المحتاجين',
    description: 'ساهم في مساعدة المحتاجين في مجتمعك',
    icon: 'people-circle',
    iconColor: '#4CAF50',
  },
];

const CarouselScreen = ({ navigation }) => {
  const { colors, FONTS, SHADOWS } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const renderSlide = ({ item }) => (
    <Animated.View 
      style={[
        styles.slide, 
        {
          backgroundColor: colors.background,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            })
          }],
        }
      ]}
    >
      <View style={[
        styles.iconContainer,
        { backgroundColor: item.iconColor + '15', ...SHADOWS.medium }
      ]}>
        <Ionicons name={item.icon} size={120} color={item.iconColor} />
      </View>
      <Text style={[
        styles.title,
        { color: colors.primary, fontFamily: FONTS.bold }
      ]}>{item.title}</Text>
      <Text style={[
        styles.description,
        { color: colors.textSecondary, fontFamily: FONTS.regular }
      ]}>{item.description}</Text>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        getItemLayout={getItemLayout}
        inverted={I18nManager.isRTL}
      />
      <View style={[
        styles.footer,
        { backgroundColor: colors.card, ...SHADOWS.medium }
      ]}> 
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === currentIndex ? slides[index].iconColor : colors.border,
                  width: index === currentIndex ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },
});

export default CarouselScreen; 