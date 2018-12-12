import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import { getItemById, getImage } from '../../actions/ItemsActions';
import moment from 'moment';

class ItemDetailsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctionItem: null,
      source: null
    };
  }

  componentDidMount() {
    if (this.props.itemId !== 0) {
      this.props
        .getItemById(this.props.itemId)
        .then(response => {
          this.setState({
            auctionItem: response.data
          });
          this.loadImage(response.data.imageLocation);
        })
        .catch(error => {
          console.log('Error fetching the item ', error);
        });
    }
  }

  loadImage = imageLocation => {
    this.props
      .getImage(`/items/downloadImage/${imageLocation}`)
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

  render() {
    const { classes, onClose } = this.props;
    const { auctionItem } = this.state;
    return (
      <div className={classes.dialogPaper}>
        <div className={classes.pageWrapper}>
          {auctionItem && (
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt={auctionItem.name}
                      src={this.state.source}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={16}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h4">
                        {auctionItem.name}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        {auctionItem.description}
                      </Typography>
                      <Typography color="textSecondary">
                        ID: {auctionItem.itemId}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Minimum Bidding Price: {`$${auctionItem.minBidPrice}`}
                      </Typography>
                      <Typography variant="subtitle1">
                        Date Added:{' '}
                        {moment(auctionItem.created).format(
                          'MM-DD-YYYY - HH:mm'
                        )}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Tooltip title={'View'} aria-label={'View'}>
                        <Fab
                          color="secondary"
                          className={classes.close}
                          onClick={onClose}
                        >
                          <Close />
                        </Fab>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

const styles = () => ({
  dialogPaper: {
    position: 'absolute',
    backgroundColor: '#FFF',
    padding: '0px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: 4
  },
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
  header: {
    fontFamily: 'Lucida Console, Monaco, monospace',
    fontSize: 20
  },
  close: {
    background: '#ff4d4d',
    marginRight: 5
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
      getItemById,
      getImage
    },
    dispatch
  );
};
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemDetailsDialog)
);
