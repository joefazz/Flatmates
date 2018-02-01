import React, { Fragment } from 'react';
import { View, Text, Platform, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';

import Client from '../../Client';
import { PostDetailComponent } from '../../components/Feed/PostDetailComponent';
import { POST_DETAILS_QUERY } from '../../graphql/queries';
import { BackButton } from '../../widgets';

type Props = {
    navigation: {state: {params: {data: {}}}},
    loading: boolean
};

type State = {
    data: {},
    isLoading: boolean
}

export class PostDetail extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.data.createdBy.road,
        headerLeft: <BackButton />
    });

    constructor(props) {
        super(props);

        this.state = {
            data: props.navigation.state.params.data,
            isLoading: props.loading
        };
    }

    componentDidMount() {
        this.setState({ data: this.getPostDetail() });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loading !== this.state.isLoading) {
            this.setState({ isLoading: newProps.loading });

            if (newProps.Post !== this.state.Post) {
                this.setState({ data: newProps.Post });
            }
        }
    }

    async getPostDetail() {
        try {
            return await Client.query({
                variables: { id: this.state.data.id },
                query: POST_DETAILS_QUERY
            });
        } catch(error) {
            alert(error);
        }
    }

    render() {
        return (
            <Fragment>
                <StatusBar barStyle={'light-content'} />
                <PostDetailComponent navigation={this.props.navigation} {...this.state} />
            </Fragment>
        );
    }
}

const mapStateToProps = () => ({

});

const bindActions = () => {
    return {
        
    };
};

export default connect(mapStateToProps, bindActions)(PostDetail);
