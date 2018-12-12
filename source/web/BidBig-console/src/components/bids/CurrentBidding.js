import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';
import { sendBid, fetchMaxBiddingPrice } from '../../actions/BidActions';

class CurrentBidding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '',
      seconds: '00',
      biddingPrice: '',
      currentBidding: ''
    };
    this.secondsRemaining = 0;
    this.intervalHandle = null;
  }

  componentDidMount() {
    console.log(this.props.auctionDetails);
    this.setInitialTime(this.props.auctionDetails);
    this.startCountDown();
    this.fetchMaxBid();
  }

  startCountDown = () => {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.secondsRemaining = this.state.minutes * 60 + this.state.seconds;
  };

  tick = () => {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - min * 60;
    this.setState({
      minutes: min,
      seconds: sec
    });
    if (sec < 10) {
      this.setState({
        seconds: '0' + this.state.seconds
      });
    }
    if (min < 10) {
      this.setState({
        minutes: '0' + min
      });
    }
    if ((min === 0) & (sec === 0)) {
      clearInterval(this.intervalHandle);
    }
    this.secondsRemaining--;
  };

  fetchMaxBid = () => {
    try {
      setInterval(async () => {
        const res = await this.props.fetchMaxBiddingPrice(
          this.props.auctionDetails.id
        );
        const { data } = await res;
        this.setState({
          currentBidding: data
        });
      }, 30000);
    } catch (e) {
      console.log(e);
    }
  };

  setInitialTime = data => {
    const start = moment();
    const end = moment(data.endTime);
    let duration = moment.duration(end.diff(start));
    this.setState({
      minutes: duration.asMinutes(),
      seconds: duration.asSeconds()
    });
  };

  handleChange = event => {
    this.setState({ biddingPrice: event.target.value });
  };

  sendBiddingValue = itemId => {
    const { auctionDetails, sendBid, user } = this.props;
    const bid = {
      userId: user.username,
      auctionId: auctionDetails.id,
      itemId,
      amount: this.state.biddingPrice,
      created: new Date().getTime()
    };
    sendBid(bid)
      .then(() => {})
      .catch(error => {
        console.log('Error sending the bidding value ', error);
      });
  };

  render() {
    const { classes, itemDetails, user } = this.props;
    const { minutes, seconds, currentBidding } = this.state;
    return (
      <div className={classes.pageWrapper}>
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt={itemDetails.itemId}
                  src={this.state.source}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    {itemDetails.name}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {itemDetails.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Minimum Bidding Price: {`$${itemDetails.minBidPrice}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Current Bidding Price: {`$${currentBidding}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Time Remaining: {`${minutes}:${seconds}`}
                  </Typography>
                </Grid>
                {!_.find(user.roles, { authority: 'ADMIN' }) && (
                  <Grid item>
                    <TextField
                      id="biddingPrice"
                      type="number"
                      min={itemDetails.minBidPrice}
                      step="1"
                      placeholder="Bidding Price"
                      value={this.state.biddingPrice}
                      required
                      className={classes.biddingPrice}
                      onChange={this.handleChange}
                    />
                    <Tooltip title={'Send'} aria-label={'Send'}>
                      <Fab
                        color="secondary"
                        className={classes.send}
                        onClick={() =>
                          this.sendBiddingValue(itemDetails.itemId)
                        }
                      >
                        <Send />
                      </Fab>
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const styles = () => ({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    padding: 20,
    margin: '40px 10px 10px 0',
    width: 410
    //maxWidth: 800
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  biddingPrice: {
    width: '20vw'
  },
  send: {
    background: '#6fdc6f',
    marginRight: 5
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators(
    {
      sendBid,
      fetchMaxBiddingPrice
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CurrentBidding)
);
