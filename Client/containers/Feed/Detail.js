import React from 'react';
import { View, Text, Platform } from 'react-native'
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { FeedDetailComponent } from '../../components/Feed/FeedDetailComponent';
import { POST_DETAILS_QUERY } from '../../graphql/queries';
import { BackButton } from '../../widgets';

export class FeedDetail extends React.Component {
    static navigationOptions = (props) => ({
        headerTitle: props.navigation.state.params.data.name,
        headerLeft: Platform.OS === 'ios' ? <BackButton goBack={ () => this.props.navigation.goBack() }/> : null,
    });

    constructor(props) {
        super(props);

        this.state = {
            preloadData: props.navigation.state.params.data,
        };
    }

    componentWillReceiveProps(newProps) {

    }

    render() {
        return (
            <FeedDetailComponent {...this.state} />
        );
    }
}

const getPostDetails = graphql(POST_DETAILS_QUERY)

const mapStateToProps = (state => ({
    login: state.get('login')
}));

const bindActions = (dispatch => ({

}));

export default compose(
    connect(mapStateToProps, bindActions)
)(FeedDetail);
