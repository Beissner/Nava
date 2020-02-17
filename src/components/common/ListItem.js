import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import moment from 'moment';
import * as Colors from '../../res/colors';

export default class ListItem extends Component {
    render() {
        const { lastUpdated, stars, language, description, name } = this.props;
        //  const prettyDate = moment(date).local().format("MMM DD YYYY");
        const formattedDate = moment(lastUpdated).format("MMM DD YYYY");

        const starIcon = <Icon
            name='star'
            type='feather'
            size={15}
            color='#adadad'
            iconStyle={{ marginLeft: 10 }}
        />;

        return (
            <View style={styles.rootContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.title}>{this.props.name}</Text>
                <Text style={styles.description}>{this.props.description}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.language}>{this.props.language}</Text>
                    {starIcon}
                    <Text style={styles.stars}>{this.props.stars}</Text>
                    <Text style={styles.date}>Updated {formattedDate}</Text>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 15
    },
    divider: {
        marginVertical: 10
    },
    title: {
        fontSize: 20,
        opacity: 0.8,
        fontWeight: '600',
        color: Colors.DEFAULT.lightBlue,
    },
    description: {
        marginVertical: 5,
        fontSize: 16,
        color: Colors.DEFAULT.lightGrayText,
        fontWeight: '500'
    },
    stars: {
        marginHorizontal: 5,
        color: Colors.DEFAULT.lightGrayText,
    },
    language: {
        color: Colors.DEFAULT.lightGrayText,
    },
    date: {
        color: Colors.DEFAULT.lightGrayText,
        marginLeft: 10,
    }


});