import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Book from '@material-ui/icons/Book';
import Visibility from '@material-ui/icons/Visibility';

class Item extends Component {
  render() {
    const { classes, slot, key, itemId, action, view } = this.props;
    return (
      <div key={key} className={classes.pageWrapper}>
        <Paper className={classes.paper}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography
                  variant="h5"
                  classes={{
                    root: !slot.itemId
                      ? classes.availableLabelText
                      : classes.unavailableLabelText
                  }}
                  gutterBottom
                >
                  {slot.itemId ? 'Unavailable' : 'Available'}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h6"
                  classes={{ root: classes.infoLabelText }}
                >
                  Auction Date:{' '}
                  {moment
                    .utc(slot.auctionDate)
                    .local()
                    .format('MM-DD-YYYY')}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  classes={{ root: classes.infoLabelText }}
                >
                  Start Time:{' '}
                  {moment
                    .utc(slot.startTime)
                    .local()
                    .format('HH:mm:ss A')}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  classes={{ root: classes.infoLabelText }}
                >
                  End Time:{' '}
                  {moment
                    .utc(slot.endTime)
                    .local()
                    .format('HH:mm:ss A')}
                </Typography>
              </Grid>
              <Grid item>
                {!slot.itemId ? (
                  <Tooltip title={'Book'} aria-label={'Book'}>
                    <Fab
                      color="secondary"
                      className={classes.book}
                      onClick={() => action(itemId, slot)}
                    >
                      <Book />
                    </Fab>
                  </Tooltip>
                ) : (
                  <Tooltip title={'View'} aria-label={'View'}>
                    <Fab
                      color="secondary"
                      className={classes.viewDetails}
                      onClick={() => view(itemId, slot)}
                    >
                      <Visibility />
                    </Fab>
                  </Tooltip>
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
    width: 225
    //maxWidth: 800
  },
  infoLabelText: {
    fontFamily: 'Lucida Console, Monaco, monospace',
    fontSize: 14
  },
  availableLabelText: {
    color: '#00cc44',
    fontFamily: 'Lucida Console, Monaco, monospace',
    fontSize: 16
  },
  unavailableLabelText: {
    color: '#e60000',
    fontFamily: 'Lucida Console, Monaco, monospace',
    fontSize: 16
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  book: {
    background: '#33cc33',
    marginRight: 5
  },
  viewDetails: {
    background: '#0088cc',
    marginRight: 5
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    pageSize: state.items.pageSize,
    pageIndex: state.items.pageIndex
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Item)
  )
);
