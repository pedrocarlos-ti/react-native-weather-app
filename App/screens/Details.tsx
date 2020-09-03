import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { format } from 'date-fns';

import { weatherApi, Weather } from '../util/weatherApi';
import { Container } from '../components/Container';
import { WeatherIcon } from '../components/WeatherIcon';
import { BasicRow } from '../components/List';
import { H1, H2, P } from '../components/Text';

const groupForecastByday = (list) => {
  const data = {};

  list.forEach((item) => {
    const [day] = item.dt_txt.split(' ');
    if (data[day]) {
      if (data[day].temp_max < item.main_max) {
        data[day].temp_max = item.main.temp_max;
      }

      if (data[day].temp_min > item.main_min) {
        data[day].temp_min = item.main.temp_min;
      }
    } else {
      data[day] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max
      };
    }

    data[day] = {
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max
    };
  });

  const formattedList = Object.keys(data).map((key) => ({
    day: key,
    ...data[key]
  }));

  return formattedList;
};

export default class Details extends React.Component {
  state = {
    currentWeather: {},
    loadingCurrentWeather: true,
    forecast: [],
    loadingForecast: true
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords);
      this.getCurrentWeather({ coords: position.coords });
      this.getForecast({ coords: position.coords });
    });
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
      .then((response) => {
        this.setState({
          loadingForecast: false,
          forecast: groupForecastByday(response.list)
        });
      })
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

          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            {this.state.forecast.map((day) => (
              <BasicRow
                key={day.day}
                style={{ justifyContent: 'space-between' }}
              >
                <P>{format(new Date(day.day), 'dd/MM/yyyy')}</P>
                <View style={{ flexDirection: 'row' }}>
                  <P style={{ fontWeight: '700', marginRight: 10 }}>
                    {Math.round(day.temp_max)}
                  </P>
                  <P>{Math.round(day.temp_min)}</P>
                </View>
              </BasicRow>
            ))}
          </View>
        </ScrollView>
      </Container>
    );
  }
}
