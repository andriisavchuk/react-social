import React, { Component } from 'react',
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader',
import ProfileAbout from './ProfileAbout',
import ProfileCreds from './ProfileCreds',
import Spinner from '../common/Spinner';

class Profile extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(Profile);