import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

class AppHeader extends Component {
  render() {
    const { classes, name } = this.props;
    return (
      <AppBar className={classes.header}>
        <Toolbar className={classes.headerContent}>
          <Link to={'/home'} style={{ color: 'transparent' }}>
            <Typography
              variant="h3"
              color="primary"
              align="center"
              classes={{ root: classes.appName }}
            >
              {'BidBig'}
            </Typography>
          </Link>
          <div className={classes.messageWrapper}>
            <Typography
              variant="h6"
              color="primary"
              align="center"
              classes={{ root: classes.welcomeMessage }}
            >
              {`Welcome ${name}`}
            </Typography>
            <Link to="/logout" style={{ color: 'transparent' }}>
              <Typography
                variant="h6"
                color="secondary"
                align="center"
                classes={{ root: classes.logout }}
              >
                {'Logout'}
              </Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = () => ({
  header: {},
  headerContent: {
    justifyContent: 'space-between'
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  appName: {
    color: 'white',
    fontFamily: 'Lucida Console, Monaco, monospace'
  },
  welcomeMessage: {
    color: 'white',
    marginRight: 20,
    fontFamily: 'Lucida Console, Monaco, monospace'
  },
  logout: {
    fontFamily: 'Lucida Console, Monaco, monospace'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.user.name
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({}, dispatch);
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppHeader)
);
