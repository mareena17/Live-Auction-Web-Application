import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from '../common/AppHeader';
import CurrentBidding from './CurrentBidding';
import FormHelperText from '@material-ui/core/FormHelperText';
import BidDetails from './BidsDetails';
import { fetchBidDetails } from '../../actions/BidActions';
import { fetchCurrentAuctionDetails } from '../../actions/BidActions';
import { getItemById } from '../../actions/ItemsActions';
import _ from 'lodash';

class Bids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidItemId: this.props.match.params.bidItemId
        ? Number(this.props.match.params.bidItemId)
        : 0,
      auctionDetails: {},
      itemDetails: {},
      messageFlag: false,
      message: ''
    };
  }

  componentDidMount() {
    this.props
      .fetchCurrentAuctionDetails()
      .then(response => {
        this.setState(
          {
            auctionDetails: response.data
          },
          this.setItem(response.data)
        );
      })
      .catch(error => {
        console.log('Error fetching current auction ', error);
      });
  }

  setItem = auction => {
    if (auction) {
      if (auction.itemId) {
        this.props
          .getItemById(auction.itemId)
          .then(response => {
            this.setState({
              itemDetails: response.data
            });
          })
          .catch(error => {
            console.log('Error fetching details of auctioned item ', error);
          });
      } else {
        this.setState({
          messageFlag: true,
          message: 'No item has been scheduled for auction for this slot.'
        });
      }
    } else {
      this.setState({
        messageFlag: true,
        message:
          'No auction has been scheduled by the admin for this slot. Please check again later.'
      });
    }
  };

  componentDidUpdate(prevProps) {}
  render() {
    const { classes, fetchBidDetails } = this.props;
    const { auctionDetails, itemDetails, message, messageFlag } = this.state;
    return (
      <Fragment>
        <AppHeader />
        <div className={classes.wrapper}>
          {this.state.bidItemId === 0 ? (
            messageFlag ? (
              <FormHelperText error={true} classes={{ root: classes.error }}>
                {message}
              </FormHelperText>
            ) : (
              !_.isEmpty(this.state.auctionDetails) && (
                <CurrentBidding
                  auctionDetails={auctionDetails}
                  itemDetails={itemDetails}
                />
              )
            )
          ) : (
            <BidDetails
              fetchBidDetails={fetchBidDetails}
              itemId={this.state.bidItemId}
            />
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
  },
  error: {
    fontFamily: 'Lucida Console, Monaco, monospace',
    fontSize: 20
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
      fetchBidDetails,
      getItemById,
      fetchCurrentAuctionDetails
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Bids)
);
