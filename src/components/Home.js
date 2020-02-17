import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import _ from 'lodash';
import { Dropdown } from 'react-native-material-dropdown';

/*      COMPONENTS AND HELPERS       */
import ListItem from './common/ListItem';
import { fetchUserRepos } from '../api/fetchGHUsers';
import { languageOptions, sortOptions } from '../utils/dropdownOptions';

/*      STYLING        */
import * as Colors from '../res/colors';

export default class Home extends Component {

    state = {
        userInput: '',
        userRepos: null,
        selectedLanguage: '',
        selectedSort: '',
        errorMessage: '',
        message: 'Please enter a user or org name',
    }

    //user clicks search icon
    onSearch = async () => {
        const { userInput, selectedLanguage, selectedSort } = this.state;

        //fetch repos for given users/organization
        if (userInput.length !== 0) {
            const userRepos = await fetchUserRepos(userInput, selectedLanguage, selectedSort);

            if (userRepos) {
                this.setState({ userRepos, selectedLanguage: '', selectedSort: '' });
            } else {
                this.setState({ userRepos: null, message: 'No users or organizations found. Please try a different user name.' })
            }
        } else {
            this.setState({ errorMessage: 'Please enter a user or organization name' });
        }
    }

    //user input
    handleInputChange(value, name) {
        this.setState({ [name]: value, errorMessage: '' });
    }

    //display repos list
    repoList() {
        const { userRepos } = this.state;
        return <FlatList
            data={userRepos}
            renderItem={({ item }) =>
                <ListItem
                    name={item.name}
                    description={item.description}
                    lastUpdated={item.updated_at}
                    stars={item.stargazers_count}
                    language={item.language}
                />}
            keyExtractor={item => item.id}
        />;
    }

    render() {
        const { errorMessage, userRepos, message } = this.state;

        const searchIcon = () => <Icon
            name='search'
            type='feather'
            size={25}
            color='#adadad'
            onPress={this.onSearch}
        />;

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.searchContainer}>
                        <Text style={styles.pageTitle}>Search GitHub Repos by User</Text>
                        <Input
                            placeholder='user or org name'
                            onChangeText={(value) => this.handleInputChange(value, 'userInput')}
                            containerStyle={styles.inputContainer}
                            leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                            inputStyle={styles.input}
                            rightIcon={searchIcon}
                            errorStyle={{ color: 'red' }}
                            errorMessage={errorMessage}
                        />
                        <View style={styles.sortContainer}>
                            <Dropdown
                                label='sort'
                                data={sortOptions()}
                                containerStyle={{ width: '40%', marginRight: 10 }}
                                value={this.state.selectedSort}
                                onChangeText={value => this.setState({ selectedSort: value })}
                                textColor={Colors.DEFAULT.lightGrayText}
                            />
                            <Dropdown
                                label='language'
                                data={languageOptions()}
                                containerStyle={{ width: '40%' }}
                                value={this.state.selectedLanguage}
                                onChangeText={value => this.setState({ selectedLanguage: value })}
                                textColor={Colors.DEFAULT.lightGrayText}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Colors.DEFAULT.lightBlue, opacity: 0.7, marginTop: 10 }} />
                </View>
                <View style={styles.resultsContainer}>
                    {userRepos !== null ? this.repoList() : <Text style={styles.messageTxt}>{message}</Text>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingBottom: 15,
    },
    topContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: Colors.DEFAULT.backgroundWhite,
        paddingTop: 40,
        marginBottom: 10
    },
    searchContainer: {
        flex: 0,
        width: '80%',
    },
    inputContainer: {
        marginTop: 8,
        zIndex: 10,
    },
    input: {
        color: Colors.DEFAULT.lightGrayText,
    },
    resultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageTitle: {
        textAlign: 'center',
        color: Colors.DEFAULT.lightGrayText,
        fontWeight: '700',
        fontSize: 20
    },
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -12
    },
    messageTxt: {
        color: Colors.DEFAULT.lightGrayText
    }
});
