import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import moment from 'moment';
import * as Colors from '../../res/colors';

export default class ListItem extends Component {
    render() {
        const { lastUpdated, stars, language, description, name } = this.props;
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
                <Text style={styles.title}>{name}</Text>
                <Text style={[styles.description, styles.grayText]}>{description}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.grayText}>{language}</Text>
                    {starIcon}
                    <Text style={[styles.grayText, { marginHorizontal: 5 }]}>{stars}</Text>
                    <Text style={[styles.grayText, { marginLeft: 10 }]}>Updated {formattedDate}</Text>
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
        fontWeight: '500'
    },
    grayText: {
        color: Colors.DEFAULT.lightGrayText,
    },
});