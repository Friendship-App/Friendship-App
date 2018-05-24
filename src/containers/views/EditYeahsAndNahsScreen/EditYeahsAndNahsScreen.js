import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';
import rest from '../../../utils/rest';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  getUserTags: userId => dispatch(rest.actions.tagsForUser.get({ userId })),
});

const mapStateToProps = state => ({
  userTags: state.tagsForUser,
});

class EditYeahsAndNahsScreen extends Component {
  state = {
    yeahs: [],
    nahs: [],
  };

  componentWillMount() {
    const userId = this.props.userId;
    this.props.getUserTags(userId).then(data => this.prepareData(data));
  }

  prepareData = userTags => {
    let yeahs = [];
    let nahs = [];
    userTags.map(tag => {
      console.log(`name : ${tag.name}         love : ${tag.love}`);
      tag.love ? yeahs.push(tag) : nahs.push(tag);
    });
    this.setState({ yeahs, nahs });
  };

  render() {
    console.log(this.state);
    const { userTags } = this.props;
    const { yeahs, nahs } = this.props;

    if (userTags.loading || !userTags.sync || !yeahs || !nahs) {
      return <ActivityIndicator />;
    }
    return <EditTagsList />;
  }
}

EditYeahsAndNahsScreen.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditYeahsAndNahsScreen,
);
