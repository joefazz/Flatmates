import * as React from 'react';
import { graphql } from 'react-apollo';
import { Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

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
    profile: any;
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
        headerTitle: navigation.state.params.data.createdBy.road,
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name={Platform.OS === 'ios' ? focused ? 'ios-home' : 'ios-home-outline' : 'md-home'} color={tintColor} size={32} />
        ),
        headerRight: Platform.OS === 'ios' ? <Icon name={'ios-star-outline'} style={{ marginRight: toConstantWidth(1.8) }} color={Colors.white} size={28} /> : <React.Fragment />
    });

    // TODO: FIND A WAY TO CONNECT THIS SCREEN TO STATE SO I CAN USE PROFILE TO COMPARE AND GET PERCENTAGE
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
                    profile={this.props.profile}
                    lastSeen={this.state.data.lastSeen}
                    id={this.state.data.id}
                    isLoading={this.state.isLoading}
                    navigation={this.props.navigation}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.get('profile')
});

export default graphql(UPDATE_POST_MUTATION)(connect(mapStateToProps)(PostDetail));
