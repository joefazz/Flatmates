import * as React from 'react';
import { graphql } from 'react-apollo';
import { StatusBar } from 'react-native';

import { PostDetailComponent } from '../../components/Feed/PostDetailComponent';
import { POST_DETAILS_QUERY } from '../../graphql/queries';

interface Props  {
    navigation: {state: {params: {data: {id?: number}}}},
    loading: boolean,
    post: object
};

interface State {
    data: {id?: string},
    isLoading: boolean
}

export class PostDetail extends React.Component<Props, State> {
    public static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.data.createdBy.road,
    });

    constructor(props) {
        super(props);

        this.state = {
            data: props.navigation.state.params.data,
            isLoading: props.loading
        };
    }

    public componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.state.isLoading) {
            this.setState({ isLoading: newProps.loading });

            if (newProps.post !== this.state.data) {
                this.setState({ data: newProps.post });
            }
        }
    }

    public render() {
        console.log(this.state);
        return (
            <React.Fragment>
                <StatusBar barStyle={'light-content'} />
                <PostDetailComponent navigation={this.props.navigation} {...this.state} />
            </React.Fragment>
        );
    }
}

export default graphql(POST_DETAILS_QUERY, {
    options(props: Props) {
        return {
            variables: {
                id: props.navigation.state.params.data.id
            }
        };
    },
    props({ data: { loading, post } }) {
        return {
            loading,
            post,
        };
    }
})(PostDetail);
