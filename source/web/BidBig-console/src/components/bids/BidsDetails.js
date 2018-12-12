import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import _ from 'lodash';
import moment from 'moment';

class BidsDetails extends Component {
  componentDidMount() {
    const { itemId, fetchBidDetails } = this.props;
    fetchBidDetails(itemId);
  }

  render() {
    const { classes, tableHeaders, bids } = this.props;
    const noBids =
      'Bidding on this item is still pending. Please come back later after the auction is done.';
    return (
      <div className={classes.wrapper}>
        <div className={classes.titleBarWrapper}>
          <Typography
            variant="h3"
            align="left"
            classes={{ root: classes.title }}
          >
            {'List of Bids'}
          </Typography>
        </div>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeaders.map(header => {
                    return (
                      <TableCell
                        key={`${header.id}`}
                        padding="dense"
                        numeric={header.numeric}
                        className={classes.headerCell}
                      >
                        {header.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {!_.isEmpty(bids) ? (
                  bids.map((bid, index) => {
                    return (
                      <TableRow
                        hover
                        key={`${bid.auctionId}-${index}`}
                        className={classes.tableRow}
                      >
                        <TableCell
                          classes={{ root: classes.tableCell }}
                          padding="dense"
                        >
                          {bid.userId}
                        </TableCell>
                        <TableCell
                          classes={{ root: classes.tableCell }}
                          padding="dense"
                        >
                          {bid.amount}
                        </TableCell>
                        <TableCell
                          classes={{ root: classes.tableCell }}
                          padding="dense"
                        >
                          {moment
                            .utc(bid.created)
                            .format('MM-DD-YYYY HH:mm:ss A')}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow className={classes.tableRow}>
                    <TableCell
                      className={classes.tableCell}
                      padding="dense"
                      colSpan={tableHeaders.length + 1}
                    >
                      <span className={classes.emptyTableText}>{noBids}</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const styles = () => ({
  wrapper: {
    display: 'flex',
    padding: '70px 50px 50px 50px',
    flexDirection: 'column'
  },
  titleBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Lucida Console, Monaco, monospace'
  },
  card: {
    background: '#FFFFFF',
    margin: '25px 0',
    overflowX: 'auto'
  },
  cardContent: {
    paddingTop: 0,
    paddingLeft: 16,
    paddingRight: 16,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: '13px',
    borderBottomWidth: '2px',
    borderBottomColor: '#3f51b5'
  },
  tableCell: {
    color: '#888',
    borderBottomColor: '#3f51b5'
  },
  tableRow: {
    height: 40
  },
  emptyTableText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5vh'
  }
});

const mapStateToProps = state => {
  return {
    username: state.user.username,
    tableHeaders: state.bids.tableHeaders || [],
    bids: state.bids.bids || []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BidsDetails)
);
