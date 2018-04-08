import * as React from 'react';
import { SectionList, SectionListData, Text, View } from 'react-native';
import { Application } from '../../types/Entities';

interface Props {
    applications: Array<SectionListData<{ title: string; data: Array<Application> }>>;
}

export class ApplicationListComponent extends React.PureComponent<Props> {
    render() {
        return (
            <SectionList
                sections={this.props.applications}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSection}
            />
        );
    }

    renderItem = ({ item }: { item: Application }) => {
        return (
            <View>
                <Text>Application {item.message}</Text>
            </View>
        );
    };

    renderSection = ({ section }) => {
        return <Text>{section.title}</Text>;
    };
}
