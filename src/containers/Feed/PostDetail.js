import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { graphql } from 'react-apollo';

import { PostDetailComponent } from '../../components/Feed/PostDetailComponent';
import { POST_DETAILS_QUERY } from '../../graphql/queries';

type Props = {
    navigation: {state: {params: {data: {}}}},
    loading: boolean,
    post: {}
};

type State = {
    data: {id?: string},
    isLoading: boolean
}

export class PostDetail extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.data.createdBy.road,
    });

    constructor(props) {
        super(props);

        this.state = {
            data: props.navigation.state.params.data,
            isLoading: props.loading
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.state.isLoading) {
            this.setState({ isLoading: newProps.loading });

            if (newProps.post !== this.state.data) {
                this.setState({ data: newProps.post });
            }
        }
    }

    render() {
        console.log(this.state);
        return (
            <Fragment>
                <StatusBar barStyle={'light-content'} />
                <PostDetailComponent navigation={this.props.navigation} {...this.state} />
            </Fragment>
        );
    }
}

export default graphql(POST_DETAILS_QUERY, {
    options(props) {
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


