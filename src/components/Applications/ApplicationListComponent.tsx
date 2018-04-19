import * as React from 'react';
import { SectionList, Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Application, User } from '../../types/Entities';
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
    receivedApplications: Array<Application>;
    sentApplications: Array<Application>;
    isFetchingSent: boolean;
    isFetchingReceived: boolean;
    navigation: { navigate: (route: string, params: { id: string; data: User }) => void };
}

export class ApplicationListComponent extends React.PureComponent<Props> {
    render() {
        if (this.props.isFetchingReceived || this.props.isFetchingSent) {
            return <ActivityIndicator />;
        }

        return (
            <SectionList
                sections={[
                    { title: 'Received Applications', data: this.props.receivedApplications }
                ]}
                renderItem={this.renderItem}
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

    renderItem = ({ item }: { item: Application }) => {
        return (
            <RectButton
                style={group.listItem}
                underlayColor={Colors.brandPrimaryColor}
                onPress={() =>
                    this.props.navigation.navigate('ApplicationDetail', {
                        id: item.id,
                        data: item.from
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
