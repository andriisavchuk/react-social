import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputFieldGroup from '../common/InputFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SocialsInputGroup from '../common/SocialsInputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocailInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      linkedin: '',
      facebook: '',
      youtube: '',
      twitter: '',
      instagram: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    console.log('submit');
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Student', value: 'Student' },
      { label: 'Intern', value: 'Intern' },
      { label: 'General Labourer', value: 'General Labourer' },
      { label: 'Teacher or Instructor', value: 'Teacher or Instructor' },
      { label: 'Entrepreneur', value: 'Entrepreneur' },
      { label: 'Manager', value: 'Manager' },
      { label: 'CEO', value: 'CEO' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's create your profile to allow other people to know more about you.
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
              <InputFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="A unique handle for oyur profile URL. Your full name, company name, nickname"
              />

              <SelectListGroup
                placeholder="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are in in your career"
              />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile);