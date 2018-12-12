import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from '../common/AppHeader';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {
  updateProfile,
  fetchAndSetCurrentUser
} from '../../actions/UserActions';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.user.id,
      name: props.user.name,
      username: props.user.username,
      email: props.user.email,
      address: props.user.address,
      city: props.user.city,
      zip: props.user.zip,
      updateSuccessful: false,
      updateSuccessText: ''
    };
  }
  handleChange = field => event => {
    this.setState({ updateSuccessful: false, updateSuccessText: '' });
    this.setState({ [field]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, name, username, email, address, city, zip } = this.state;
    const { updateProfile } = this.props;
    updateProfile({ id, name, username, email, address, city, zip })
      .then(() => this.handleSuccess())
      .catch(error => this.handleError(error));
  };

  handleSuccess = () => {
    this.props.fetchAndSetCurrentUser();
    this.setState({
      updateSuccessful: true,
      updateSuccessText: 'Profile successfully updated!'
    });
  };

  handleError = response => {
    console.log('Error in Sign Up. Please try again later. ', response);
    this.setState({
      signUpError: true,
      signUpErrorText: 'Error in Sign Up. Please try again later.'
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppHeader />
        <div className={classes.wrapper}>
          <Typography
            variant="title"
            align="left"
            classes={{ root: classes.profileHeading }}
          >
            {'My Profile'}
          </Typography>
          {this.state.updateSuccessful && (
            <FormHelperText classes={{ root: classes.helperText }}>
              {this.state.updateSuccessText}
            </FormHelperText>
          )}
          <form onSubmit={this.handleSubmit} className={classes.userForm}>
            <TextField
              id="username"
              type="text"
              label="Username"
              value={this.state.username}
              required
              disabled
              className={classes.textField}
              onChange={this.handleChange('username')}
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              value={this.state.email}
              required
              disabled
              className={classes.textField}
              onChange={this.handleChange('email')}
            />
            <TextField
              id="name"
              type="text"
              label="Name"
              inputProps={{ maxLength: 255 }}
              value={this.state.name}
              required
              className={classes.textField}
              onChange={this.handleChange('name')}
            />
            <Divider />
            <TextField
              id="address"
              type="text"
              label="Address"
              inputProps={{ maxLength: 255 }}
              value={this.state.address}
              required
              className={classes.textField}
              onChange={this.handleChange('address')}
            />
            <div className={classes.cityWrapper}>
              <TextField
                id="city"
                type="text"
                label="City"
                value={this.state.city}
                required
                className={classes.addressField}
                onChange={this.handleChange('city')}
              />
              <TextField
                id="zip"
                type="number"
                min="11111"
                max="99999"
                step="1"
                label="ZIP"
                inputProps={{ maxLength: 5 }}
                value={this.state.zip}
                required
                className={classes.addressField}
                onChange={this.handleChange('zip')}
              />
            </div>
            <div className={classes.btnWrapper}>
              <Button
                variant="contained"
                color={'primary'}
                className={classes.profileBtn}
                type={'submit'}
              >
                {'Update Profile'}
              </Button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      updateProfile,
      fetchAndSetCurrentUser
    },
    dispatch
  );
};

const styles = () => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '70px 50px 50px 50px'
  },
  userForm: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '10px',
    justifyContent: 'flex-start'
  },
  profileHeading: {
    marginTop: 20,
    fontFamily: 'Lucida Console, Monaco, monospace'
  },
  textField: {
    width: '30vw'
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '30vw'
  },
  profileBtn: {
    margin: '15px 5px 15px 0',
    padding: '5px',
    textTransform: 'none'
  },
  addressField: {
    marginRight: '10px'
  },
  cityWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%'
  },
  helperText: {
    fontSize: 16,
    color: '#33cc33'
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserProfile)
);
