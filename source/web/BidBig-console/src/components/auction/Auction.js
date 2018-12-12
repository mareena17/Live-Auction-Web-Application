import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from '../common/AppHeader';
import ManageAuctionSchedule from './ManageAuctionSchedule';
import ItemAuction from './ItemAuction';
import { createAuctionSchedule } from '../../actions/AuctionActions';

class Auction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: this.props.match.params.itemId
        ? Number(this.props.match.params.itemId)
        : 0
    };
  }

  componentDidUpdate(prevProps) {}
  render() {
    const { classes, createAuctionSchedule } = this.props;
    return (
      <Fragment>
        <AppHeader />
        <div className={classes.wrapper}>
          {this.state.itemId === 0 ? (
            <ManageAuctionSchedule
              createAuctionSchedule={createAuctionSchedule}
            />
          ) : (
            <ItemAuction itemId={this.state.itemId} />
          )}
        </div>
      </Fragment>
    );
  }
}

const styles = () => ({
  wrapper: {
    display: 'flex',
    padding: '70px 50px 50px 50px',
    flexDirection: 'column'
  }
});

const mapStateToProps = state => {
  return {
    username: state.user.username
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createAuctionSchedule
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auction)
);
