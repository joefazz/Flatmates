import * as React from 'react';
import { graphql } from 'react-apollo';
import { Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { PostDetailComponent } from '../../components/Feed/PostDetailComponent';
import { Colors } from '../../consts';
import { UPDATE_POST_MUTATION } from '../../graphql/mutations';
import { toConstantWidth } from '../../utils/PercentageConversion';

interface Props  {
    navigation: {state: {
        params: {
            data: {
                id
            }
        }
    }, push: (route: string, params: {fbUserId?: string, data?: object}) => void},
    mutate: ({ variables: { id: string, lastSeen: Date }}) => Promise<any>
};

interface State {
    data: {
        id?: string,
        createdAt: string,
        lastSeen: string,
        createdBy: {
            billsPrice: number,
            rentPrice: number,
            houseImages: Array<string>,
            road: string,
            spaces: number,
            users: Array<any>,
            coords: Array<number>
        },
        description: string,
        title: string
    },
    isLoading: boolean
};

export class PostDetail extends React.Component<Props, State> {
    protected static navigationOptions = ({ navigation }) => ({
        title: 'Post Detail',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        ),
        headerRight: <Icon name={'ios-star-outline'} style={{ marginRight: toConstantWidth(1.8) }} color={Colors.white} size={28} />
    });

    constructor(props) {
        super(props);

        this.state = {
            data: props.navigation.state.params.data,
            isLoading: true
        };
    }

    async getPostDetails() {
        try {
            const { data: { updatePost } } = await this.props.mutate({
                variables: {
                    id: this.props.navigation.state.params.data.id,
                    lastSeen: new Date().toISOString()
                }
            });

            const combinedData = Object.assign(this.state.data, updatePost);

            console.log(combinedData);

            this.setState({ isLoading: false, data: combinedData });
        } catch (error) {
            console.log('There was an error: ' + error + '... This will turn into a ui element eventually...');
        }
    }

    componentDidMount() {
        this.getPostDetails();
    }

    render() {
        return (
            <>
                <StatusBar barStyle={'light-content'} />
                <PostDetailComponent
                    title={this.state.data.title}
                    description={this.state.data.description}
                    house={this.state.data.createdBy}
                    createdAt={this.state.data.createdAt}
                    lastSeen={this.state.data.lastSeen}
                    id={this.state.data.id}
                    isLoading={this.state.isLoading}
                    navigation={this.props.navigation}
                />
            </>
        );
    }
}

export default graphql(UPDATE_POST_MUTATION)(PostDetail);
