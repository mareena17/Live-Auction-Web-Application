import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
/* import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel'; */
import FormHelperText from '@material-ui/core/FormHelperText';
import Slot from './Slot';
import {
  bookSlotForAuction,
  fetchAllSlots,
  clearSlots
} from '../../actions/AuctionActions';
import { setStatusToAuctioned } from '../../actions/ItemsActions';
import _ from 'lodash';

class ItemAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      selection: 'date',
      updateSuccessful: false,
      updateSuccessText: ''
    };
  }

  componentWillUnmount() {
    this.props.clearSlots();
  }

  handleChange = field => event => {
    this.setState({ updateSuccessful: false, updateSuccessText: '' });
    this.setState({ [field]: event.target.value });
    if (_.eq(field, 'startDate') && _.eq(this.state.selection, 'date')) {
      this.setState({
        endDate: event.target.value
      });
    }
  };

  handleDateSelectionChange = event => {
    this.setState({ selection: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { startDate, endDate } = this.state;
    let start = moment.utc(new Date(startDate + ' 00:00')).valueOf();
    let end = moment.utc(new Date(endDate + ' 23:59')).valueOf();
    this.props.fetchAllSlots(start, end);
  };

  handleSlotSelection = (itemId, slot) => {
    const auctionSlot = {
      id: slot.id,
      itemId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      auctionDate: slot.auctionDate
    };
    this.props
      .bookSlotForAuction(auctionSlot)
      .then(() => {
        this.props.setStatusToAuctioned(this.props.itemId);
        this.setState({
          updateSuccessful: true,
          updateSuccessText:
            'Slot booked successfully! You can view details of bids on this item on My Items page'
        });
      })
      .catch(error => {
        console.log('Error booking the slot ', error);
      });
  };

  showDetails = (itemId, slot) => {
    console.log('Item id: ', itemId);
    console.log('Slot: ', slot);
  };

  render() {
    const { classes, itemId, slots } = this.props;
    const { updateSuccessful, updateSuccessText } = this.state;
    return (
      <div className={classes.wrapper}>
        <div className={classes.titleBarWrapper}>
          <Typography
            variant="h3"
            align="left"
            classes={{ root: classes.title }}
          >
            {'Place Your Item For Auction'}
          </Typography>
        </div>
        {!updateSuccessful ? (
          <form onSubmit={this.handleSubmit} className={classes.scheduleForm}>
            {/* <FormControl className={classes.formControl}>
              <FormLabel className={classes.dateSelectorLabel}>
                Select
              </FormLabel>
              <RadioGroup
                aria-label="date-selector"
                name="dateSelector"
                className={classes.group}
                value={this.state.selection}
                onChange={event => this.handleDateSelectionChange(event)}
              >
                <FormControlLabel
                  className={classes.radioControl}
                  value="date"
                  control={<Radio />}
                  label="A Date"
                />
                <FormControlLabel
                  className={classes.radioControl}
                  value="dateRange"
                  control={<Radio />}
                  label={'Date Range'}
                />
              </RadioGroup>
            </FormControl> */}
            <TextField
              id="startDate"
              type="date"
              label={this.state.selection === 'date' ? 'Date' : 'Start Date'}
              value={this.state.startDate}
              required
              className={classes.textField}
              onChange={this.handleChange('startDate')}
            />
            {_.eq(this.state.selection, 'dateRange') && (
              <TextField
                id="endDate"
                type="date"
                label="End Date"
                value={this.state.startDate}
                required
                className={classes.textField}
                onChange={this.handleChange('endDate')}
              />
            )}
            <div className={classes.btnWrapper}>
              <Button
                variant="contained"
                color={'primary'}
                className={classes.saveBtn}
                type={'submit'}
              >
                {'Show All Slots'}
              </Button>
            </div>
            {!_.isEmpty(slots) && (
              <div className={classes.slotsWrapper}>
                {slots.map(slot => {
                  return (
                    <Slot
                      itemId={itemId}
                      key={slot.id}
                      slot={slot}
                      action={this.handleSlotSelection}
                      view={this.showDetails}
                    />
                  );
                })}
              </div>
            )}
          </form>
        ) : (
          <FormHelperText classes={{ root: classes.helperText }}>
            {updateSuccessText}
          </FormHelperText>
        )}
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
  scheduleForm: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '10px',
    justifyContent: 'flex-start'
  },
  dateSelectorLabel: {
    fontSize: 12,
    lineHeight: 5
  },
  slotsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '10px',
    justifyContent: 'flex-start'
  },
  radioControl: {
    transform: 'scale(.8)'
  },
  group: {
    flexDirection: 'row',
    marginLeft: 20
  },
  textField: {
    width: '30vw'
  },
  saveBtn: {
    margin: '15px 5px 15px 0',
    padding: '5px',
    textTransform: 'none'
  },
  formControl: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row'
  }
});

const mapStateToProps = state => {
  return {
    username: state.user.username,
    slots: state.auctions.slots
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAllSlots,
      bookSlotForAuction,
      clearSlots,
      setStatusToAuctioned
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemAuction)
);
