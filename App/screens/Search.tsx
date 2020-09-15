import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { SearchBar } from '../components/SearchBar';
import { SearchItem } from '../components/List';
import { getRecentSearch } from '../util/recentSearch';

class Search extends Component {
  state = {
    query: '',
    recentSearch: []
  };

  componentDidMount() {
    getRecentSearch().then((recentSearch) => {
      console.log(recentSearch);
      this.setState({ recentSearch });
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.recentSearch}
        renderItem={({ item }) => (
          <SearchItem
            name={item.name}
            onPress={() =>
              this.props.navigation.navigate('Details', {
                lat: item.lat,
                lon: item.lon
              })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <StatusBar style="dark" />
            <SearchBar
              searchButtonEnabled={this.state.query.length >= 5}
              onChangeText={(query) => this.setState({ query })}
              onSearch={() => {
                this.props.navigation.navigate('Details', {
                  zipcode: this.state.query
                });
              }}
              placeholder="Address"
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 16,
                color: '#aaa',
                marginTop: 10,
                marginBottom: 5
              }}
            >
              Recents
            </Text>
          </View>
        }
      />
    );
  }
}

export default Search;
