import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Card, Title, TouchableRipple } from 'react-native-paper';

const { width } = Dimensions.get('window');

const ads = [
  { id: 1, title: 'Special Home Loan Offer', image: 'home-loan.jpg' },
  { id: 2, title: 'Low Interest Personal Loans', image: 'personal-loan.jpg' },
  { id: 3, title: 'Vehicle Loan Festival Offer', image: 'vehicle-loan.jpg' },
];

const loanTypes = [
  { id: 1, title: 'Personal Loan', route: 'PersonalLoan' },
  { id: 2, title: 'Home Loan', route: 'HomeLoan' },
  { id: 3, title: 'Vehicle Loan', route: 'VehicleLoan' },
  { id: 4, title: 'Property Loan', route: 'PropertyLoan' },
];

export const HomeScreen = ({ navigation }: any) => {
  const renderCarouselItem = ({ item }: any) => (
    <Card style={styles.carouselItem}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.title}</Title>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={ads}
        renderItem={renderCarouselItem}
        sliderWidth={width}
        itemWidth={width - 40}
        autoplay
        loop
      />
      <View style={styles.grid}>
        {loanTypes.map((loan) => (
          <TouchableRipple
            key={loan.id}
            onPress={() => navigation.navigate(loan.route)}
            style={styles.gridItem}
          >
            <Card style={styles.card}>
              <Card.Content>
                <Title>{loan.title}</Title>
              </Card.Content>
            </Card>
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  carouselItem: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 15,
  },
  card: {
    height: 120,
    justifyContent: 'center',
  },
});