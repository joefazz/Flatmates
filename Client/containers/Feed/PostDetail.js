import React from 'react';
import { View, Text, Platform, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';

import { PostDetailComponent } from '../../components/Feed/PostDetailComponent';
import { POST_DETAILS_QUERY, POST_LIST_QUERY } from '../../graphql/queries';
import { BackButton } from '../../widgets';

export class PostDetail extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.data.road,
        headerLeft: Platform.OS === 'ios' ? <BackButton goBack={ () => navigation.goBack() }/> : null,
    });

    constructor(props) {
        super(props);

        this.state = {
            data: props.navigation.state.params.data,
        };
    }

    componentWillReceiveProps(newProps) {

    }

    render() {
        return (
            <Text>Hello</Text>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const bindActions = (dispatch) => {
    return {
        
    };
}

const allPostsQuery = graphql(POST_LIST_QUERY, {
    props: ({ data: { loading, allPosts } }) => ({
        loading, allPosts
    })
})

export default compose(
    connect(mapStateToProps, bindActions),
    allPostsQuery,
)(PostDetail);
