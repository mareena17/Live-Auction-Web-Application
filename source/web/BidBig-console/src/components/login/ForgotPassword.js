import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { forgotPassword } from '../../actions/UserActions';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      successFlag: false,
      successText: '',
      errorFlag: false,
      errorMessage: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username } = this.state;
    const { forgotPassword } = this.props;
    forgotPassword(username)
      .then(() => this.handleSuccess())
      .catch(error => this.handleError(error));
  };

  handleSuccess = () => {
    this.resetForm();
    this.setState({
      successFlag: true,
      successText: 'A link has been sent to your email address. Please check.'
    });
  };

  handleError = response => {
    this.setState({
      errorFlag: true,
      errorMessage:
        'Looks like this username is not registered. Please try again with a registered username.',
      resendFlag: false
    });
  };

  resetForm = () => {
    this.setState({
      username: ''
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.formWrapper}>
        <form
          onSubmit={this.handleSubmit}
          className={classes.forgotPasswordForm}
        >
          <Typography
            variant="h1"
            color="primary"
            align="center"
            classes={{ root: classes.heading }}
          >
            {'BidBig'}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            classes={{ root: classes.heading }}
          >
            {'Did you forget your password?'}
          </Typography>
          <Typography
            variant="subheading"
            align="center"
            classes={{ root: classes.heading }}
          >
            {
              'Provide your username and we will send you a link to your email address to reset your password'
            }
          </Typography>
          {this.state.successFlag && (
            <FormHelperText classes={{ root: classes.helperText }}>
              {this.state.successText}
            </FormHelperText>
          )}
          {this.state.errorFlag && (
            <FormHelperText error={true}>
              {this.state.errorMessage}
            </FormHelperText>
          )}
          <TextField
            id="username"
            type="text"
            label="Username"
            value={this.state.username}
            required
            className={classes.textField}
            onChange={this.handleChange('username')}
          />
          <Button
            variant="contained"
            color={'primary'}
            className={classes.resetBtn}
            type={'submit'}
          >
            {'Reset Password'}
          </Button>
          <Typography variant="body1" align="center">
            Go back to{' '}
            <Link to="/login" style={{ color: 'inherit' }}>
              Login
            </Link>
          </Typography>
        </form>
      </div>
    );
  }
}

const styles = () => ({
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  forgotPasswordForm: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    width: '40vw'
  },
  heading: {
    marginTop: 20,
    fontFamily: 'Lucida Console, Monaco, monospace'
  },
  textField: {
    margin: 'auto',
    width: '30vw'
  },
  resetBtn: {
    margin: 'auto',
    marginTop: '15px',
    marginBottom: '15px',
    padding: '5px',
    width: '30vw'
  },
  helperText: {
    fontSize: 16,
    color: '#33cc33'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      forgotPassword
    },
    dispatch
  );
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ForgotPassword)
  )
);
