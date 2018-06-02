import React from 'react';
import { SectionList, Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Application, User, House } from '../../types/Entities';
import {
    toConstantFontSize,
    toConstantHeight,
    toConstantWidth
} from '../../utils/PercentageConversion';
import { FontFactory } from '../../consts/font';
import { Colors } from '../../consts';
import { RectButton } from 'react-native-gesture-handler';
import { group } from '../../styles/Group';

interface Props {
    receivedApplications?: Array<Application>;
    sentApplications: Array<Application>;
    isFetchingSent: boolean;
    isFetchingReceived?: boolean;
    showReceived: boolean;
    navigation: {
        navigate: (
            route: string,
            params: {
                id: string;
                houseData?: House;
                userData?: User;
                housePlayerIDs?: Array<string>;
                isSent: boolean;
            }
        ) => void;
    };
}

export class ApplicationListComponent extends React.PureComponent<Props> {
    render() {
        if (this.props.isFetchingReceived || this.props.isFetchingSent) {
            return <ActivityIndicator />;
        }

        const sections = this.props.showReceived
            ? [
                  {
                      title: 'Received Applications',
                      data: this.props.receivedApplications,
                      renderItem: this.renderReceivedItem
                  },
                  {
                      title: 'Sent Applications',
                      data: this.props.sentApplications,
                      renderItem: this.renderSentItem
                  }
              ]
            : [
                  {
                      title: 'Sent Applications',
                      data: this.props.sentApplications,
                      renderItem: this.renderSentItem
                  }
              ];

        return (
            <SectionList
                sections={sections}
                renderSectionHeader={this.renderSection}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            width: toConstantWidth(100),
                            backgroundColor: Colors.grey,
                            height: 1
                        }}
                    />
                )}
                keyExtractor={(item: Application, index) => item.createdAt.toString() + index}
            />
        );
    }

    renderEmpty = () => {
        return <Text>No data to display</Text>;
    };

    renderSentItem = ({ item }: { item: Application }) => {
        return (
            <RectButton
                style={group.listItem}
                underlayColor={Colors.brandPrimaryColor}
                onPress={() => {
                    this.props.navigation.navigate('ApplicationDetail', {
                        id: item.id,
                        houseData: item.to,
                        isSent: true
                    });
                }}
            >
                <Image
                    source={{ uri: item.to.houseImages[0] }}
                    style={styles.profilePicture}
                    resizeMode={'cover'}
                />
                <View style={group.descWrapper}>
                    <Text style={group.title}>
                        {item.to.road}, £{item.to.rentPrice + item.to.billsPrice}
                    </Text>
                    <Text style={group.subtitle} numberOfLines={1}>
                        {item.to.post.description}
                    </Text>
                </View>
            </RectButton>
        );
    };

    renderReceivedItem = ({ item }: { item: Application }) => {
        return (
            <RectButton
                style={group.listItem}
                underlayColor={Colors.brandPrimaryColor}
                onPress={() =>
                    this.props.navigation.navigate('ApplicationDetail', {
                        id: item.id,
                        userData: item.from,
                        housePlayerIDs: item.to.users.map((user) => user.playerId),
                        isSent: false
                    })
                }
            >
                <Image
                    source={{ uri: item.from.profilePicture }}
                    style={styles.profilePicture}
                    resizeMode={'cover'}
                />
                <View style={group.descWrapper}>
                    <Text style={group.title}>
                        {item.from.name}, {item.from.age}
                    </Text>
                    <Text style={group.subtitle}>{item.from.course}</Text>
                </View>
                <View style={true && group.unreadMarker} />
            </RectButton>
        );
    };

    renderSection = ({ section }) => {
        if (this.props.sentApplications.length === 0 && section.title === 'Sent Applications') {
            return <View />;
        }
        return <Text style={styles.sectionHeader}>{section.title}</Text>;
    };
}

const styles = StyleSheet.create({
    sectionHeader: {
        alignSelf: 'flex-start',
        padding: 5,
        fontSize: toConstantFontSize(2.6),
        ...FontFactory({ weight: 'Bold' }),
        color: Colors.textHighlightColor
    },

    profilePicture: {
        height: toConstantHeight(10),
        width: toConstantHeight(10)
    }
});
