import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import DateRange from '@material-ui/icons/DateRange';
import Visibility from '@material-ui/icons/Visibility';
import {
  getImage,
  deleteItem,
  fetchAllItems,
  setSelectedItem
} from '../../actions/ItemsActions';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null
    };
  }
  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item.itemId !== prevProps.item.itemId) {
      this.loadImage();
    }
  }

  loadImage = () => {
    this.props
      .getImage(`/items/downloadImage/${this.props.item.imageLocation}`)
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        this.setState({ source: 'data:;base64,' + base64 });
      });
  };

  handleItemEdit = item => {
    this.props.setSelectedItem(item);
    this.props.openModal();
  };

  handleItemDelete = itemId => {
    this.props
      .deleteItem(itemId)
      .then(() => {
        this.props.fetchAllItems(
          this.props.item.username,
          0,
          this.props.pageSize
        );
      })
      .catch(error => {
        console.log('Error deleting the item ', error);
      });
  };

  handleAuctionItem = itemId => {
    this.props.history.push(`/auctions/${itemId}`);
  };

  handleViewBidDetails = itemId => {
    this.props.history.push(`/bids/${itemId}`);
  };

  render() {
    const { classes, item, key } = this.props;
    return (
      <div key={key} className={classes.pageWrapper}>
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt={item.itemId}
                  src={this.state.source}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    {item.name}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {item.description}
                  </Typography>
                  <Typography color="textSecondary">
                    ID: {item.itemId}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Minimum Bidding Price: {`$${item.minBidPrice}`}
                  </Typography>
                  <Typography variant="subtitle1">
                    Date Added:{' '}
                    {moment(item.created).format('MM-DD-YYYY - HH:mm')}
                  </Typography>
                </Grid>
                {item.status === 1 && (
                  <Grid item>
                    <Tooltip
                      title={'Schedule an Auction'}
                      aria-label={'Schedule this item for auction'}
                    >
                      <Fab
                        color="secondary"
                        className={classes.timer}
                        onClick={() => this.handleAuctionItem(item.itemId)}
                      >
                        <DateRange />
                      </Fab>
                    </Tooltip>
                    <Tooltip title={'Edit'} aria-label={'Edit'}>
                      <Fab
                        color="secondary"
                        className={classes.edit}
                        onClick={() => this.handleItemEdit(item)}
                      >
                        <Edit />
                      </Fab>
                    </Tooltip>
                    <Tooltip title={'Delete'} aria-label={'Delete'}>
                      <Fab
                        color="secondary"
                        className={classes.delete}
                        onClick={() => this.handleItemDelete(item.itemId)}
                      >
                        <Delete />
                      </Fab>
                    </Tooltip>
                  </Grid>
                )}
                {item.status === 2 && (
                  <Grid item>
                    <Tooltip title={'View'} aria-label={'View'}>
                      <Fab
                        color="secondary"
                        className={classes.viewDetails}
                        onClick={() => this.handleViewBidDetails(item.itemId)}
                      >
                        <Visibility />
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
  edit: {
    background: '#6fdc6f',
    marginRight: 5
  },
  delete: {
    background: '#ff4d4d',
    marginRight: 5
  },
  timer: {
    background: '#ffa31a',
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
  return bindActionCreators(
    {
      getImage,
      deleteItem,
      fetchAllItems,
      setSelectedItem
    },
    dispatch
  );
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Item)
  )
);
