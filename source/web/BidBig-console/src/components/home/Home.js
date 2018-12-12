import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from '../common/AppHeader';
import MenuItem from './MenuItem';
import _ from 'lodash';

class Home extends Component {
  render() {
    const { classes, roles } = this.props;
    return (
      <Fragment>
        <AppHeader />
        <div className={classes.homeWrapper}>
          <MenuItem
            name={'Profile'}
            description={'View and Manage your profile'}
            path={'/profile'}
          />
          {!_.find(roles, { authority: 'ADMIN' }) && (
            <MenuItem
              name={'My Items'}
              description={'Post and Manage your items'}
              path={'/items'}
            />
          )}
          {_.find(roles, { authority: 'ADMIN' }) && (
            <MenuItem
              name={'Auctions'}
              description={'Manage Auction schedules'}
              path={'/auctions'}
            />
          )}
          <MenuItem
            name={'Auction Items'}
            description={
              'View details of items available for auction in a date range'
            }
            path={'/auction-items'}
          />
          <MenuItem
            name={'Live Bidding'}
            description={
              _.find(roles, { authority: 'ADMIN' })
                ? 'View live bidding'
                : 'View and participate in live bidding'
            }
            path={'/bids'}
          />
        </div>
      </Fragment>
    );
  }
}

const styles = () => ({
  homeWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '70px 50px 50px 50px'
  }
});

const mapStateToProps = state => {
  return {
    roles: state.user.roles || []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
