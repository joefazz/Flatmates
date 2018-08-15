import React from 'react';
import {
    SectionList,
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
    Image,
    RefreshControl
} from 'react-native';
import { Application, User, House } from '../../types/Entities';
import {
    toConstantFontSize,
    toConstantHeight,
    toConstantWidth
} from '../../utils/PercentageConversion';
import { FontFactory } from '../../consts/font';
import { Colors } from '../../consts';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { group } from '../../styles/Group';
import { Avatar } from 'react-native-elements';

interface Props {
    receivedApplications?: Array<Application>;
    sentApplications: Array<Application>;
    inactiveApplications: Array<Application>;
    isLoadingSent: boolean;
    isLoadingReceived?: boolean;
    houseID?: number;
    refetchSent: () => void;
    refetchReceived?: () => void;
    hasHouse: boolean;
    showReceived: boolean;
    navigation: {
        navigate: (
            route: string,
            params: {
                id: string;
                houseData?: House;
                userData?: User;
                isSent: boolean;
                isActive: boolean;
            }
        ) => void;
    };
}

export class ApplicationListComponent extends React.PureComponent<Props> {
    render() {
        const sections = this.props.showReceived
            ? [
                  {
                      title: 'Received Applications',
                      data: this.props.receivedApplications,
                      renderItem: this.renderItem
                  },
                  {
                      title: 'Sent Applications',
                      data: this.props.sentApplications,
                      renderItem: this.renderItem
                  },
                  {
                      title: 'Pending Applications',
                      data: this.props.inactiveApplications,
                      renderItem: this.renderItem
                  }
              ]
            : [
                  {
                      title: 'Sent Applications',
                      data: this.props.sentApplications,
                      renderItem: this.renderItem
                  },
                  {
                      title: 'Pending Applications',
                      data: this.props.inactiveApplications,
                      renderItem: this.renderItem
                  }
              ];

        if (this.props.showReceived && this.props.receivedApplications.length === 0) {
            if (
                this.props.sentApplications.length === 0 &&
                this.props.inactiveApplications.length === 0
            ) {
                return this.renderEmpty();
            }
        } else if (
            this.props.sentApplications.length === 0 &&
            this.props.inactiveApplications.length === 0
        ) {
            return this.renderEmpty();
        }

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
                refreshControl={
                    <RefreshControl
                        refreshing={
                            this.props.hasHouse
                                ? this.props.isLoadingSent || this.props.isLoadingReceived
                                : this.props.isLoadingSent
                        }
                        onRefresh={() => {
                            this.props.refetchSent();
                            if (this.props.hasHouse) {
                                this.props.refetchReceived();
                            }
                        }}
                    />
                }
                keyExtractor={(item: Application, index) => item.createdAt.toString() + index}
            />
        );
    }

    renderEmpty = () => {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={
                            this.props.hasHouse
                                ? this.props.isLoadingSent || this.props.isLoadingReceived
                                : this.props.isLoadingSent
                        }
                        onRefresh={() => {
                            this.props.refetchSent();
                            if (this.props.hasHouse) {
                                this.props.refetchReceived();
                            }
                        }}
                    />
                }
            >
                <Text
                    style={{
                        ...FontFactory({ weight: 'Bold' }),
                        fontSize: 20,
                        alignSelf: 'center',
                        marginTop: 10,
                        textAlign: 'center'
                    }}
                >
                    No Applications to Display
                    {'\n'}
                    {'\n'}
                    Send some applications or wait until someone else sends one to your house
                </Text>
            </ScrollView>
        );
    };

    renderItem = ({ item, section }: { item: Application; section: { title: string } }) => {
        if (this.props.showReceived) {
            if (!!this.props.houseID && item.to.shortID === this.props.houseID) {
                return (
                    <RectButton
                        style={group.listItem}
                        underlayColor={Colors.brandPrimaryColor}
                        onPress={() =>
                            this.props.navigation.navigate('ApplicationDetail', {
                                id: item.id,
                                userData: item.from,
                                isSent: false,
                                isActive: section.title === 'Pending Applications'
                            })
                        }
                    >
                        {item.from.profilePicture ? (
                            <Image
                                source={{ uri: item.from.profilePicture }}
                                style={styles.profilePicture}
                                resizeMode={'cover'}
                            />
                        ) : (
                            <Avatar
                                icon={{ name: 'person' }}
                                width={toConstantHeight(10)}
                                height={toConstantHeight(10)}
                            />
                        )}
                        <View style={group.descWrapper}>
                            <Text style={group.title}>
                                {item.from.name}, {item.from.age}
                            </Text>
                            <Text style={group.subtitle}>{item.from.course}</Text>
                        </View>
                        {/* <View style={true && group.unreadMarker} /> */}
                    </RectButton>
                );
            } else {
                return (
                    <RectButton
                        style={group.listItem}
                        underlayColor={Colors.brandPrimaryColor}
                        onPress={() => {
                            this.props.navigation.navigate('ApplicationDetail', {
                                id: item.id,
                                houseData: item.to,
                                isSent: true,
                                isActive: section.title === 'Pending Applications'
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
            }
        }

        return (
            <RectButton
                style={group.listItem}
                underlayColor={Colors.brandPrimaryColor}
                onPress={() => {
                    this.props.navigation.navigate('ApplicationDetail', {
                        id: item.id,
                        houseData: item.to,
                        isSent: true,
                        isActive: section.title === 'Pending Applications'
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

    renderSection = ({ section }) => {
        if (this.props.sentApplications.length === 0 && section.title === 'Sent Applications') {
            return <View />;
        }

        if (
            this.props.inactiveApplications.length === 0 &&
            section.title === 'Pending Applications'
        ) {
            return <View />;
        }

        if (
            this.props.receivedApplications.length === 0 &&
            section.title === 'Received Applications'
        ) {
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
