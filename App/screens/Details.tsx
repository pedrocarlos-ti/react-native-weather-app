import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { weatherApi, Weather } from '../util/weatherApi';

import { Container } from '../components/Container';
import { WeatherIcon } from '../components/WeatherIcon';
import { BasicRow } from '../components/List';
import { H1, H2 } from '../components/Text';

export default class Details extends React.Component {
  state = {
    currentWeather: {},
    loadingCurrentWeather: true
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords);
      this.getCurrentWeather({ coords: position.coords });
      // this.getForecast({ coords: position.coords });
    });

    const zipcode = 54160546;
  }

  getCurrentWeather = ({ zipcode, coords }: Weather) =>
    weatherApi('/weather', { zipcode, coords })
      .then((response) => {
        this.props.navigation.setOptions({ title: response.name });
        this.setState({
          currentWeather: response,
          loadingCurrentWeather: false
        });
      })
      .catch((err) => console.log(err));

  getForecast = ({ zipcode, coords }: Weather) =>
    weatherApi('/forecast', { zipcode, coords })
      .then((response) => {})
      .catch((err) => console.log(err));

  render() {
    if (this.state.loadingCurrentWeather) {
      return (
        <Container>
          <ActivityIndicator color="white" size="large" />
        </Container>
      );
    }

    const { weather, main } = this.state.currentWeather;

    console.log(main);

    return (
      <Container>
        <ScrollView>
          <WeatherIcon icon={weather[0].icon} />
          <H1>{`${Math.round(main.temp)}º`}</H1>
          <BasicRow>
            <H2>{`Umidade: ${main.humidity}º`}</H2>
          </BasicRow>
          <BasicRow>
            <H2>{`Mínimo: ${Math.round(main.temp_min)}º`}</H2>
            <H2>{`Máximo: ${Math.round(main.temp_max)}º`}</H2>
          </BasicRow>
        </ScrollView>
      </Container>
    );
  }
}
