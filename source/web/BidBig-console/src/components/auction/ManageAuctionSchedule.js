import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import moment from 'moment';

class ManageAuctionSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      startTime: '10:00',
      endTime: '12:00',
      slots: '',
      updateSuccessful: false,
      updateSuccessText: ''
    };
  }
  handleChange = field => event => {
    this.setState({ updateSuccessful: false, updateSuccessText: '' });
    this.setState({ [field]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { createAuctionSchedule } = this.props;
    const { date, startTime, endTime, slots } = this.state;
    console.log(date);
    console.log(startTime);
    const schedule = {
      auctionDate: moment.utc(new Date(date + ' ' + startTime)).valueOf(),
      startTime: moment.utc(new Date(date + ' ' + startTime)).valueOf(),
      endTime: moment.utc(new Date(date + ' ' + endTime)).valueOf(),
      slots: slots
    };
    createAuctionSchedule(schedule)
      .then(() => {
        this.setState({
          updateSuccessful: true,
          updateSuccessText: 'Auction schedule successfully created!'
        });
      })
      .catch(error => {
        console.log('Error saving auction schedule ', error);
      });
  };
  convertToEpoch = (date, time) => {
    if (time) {
      return new Date(`${date}T${time}`).getTime();
    } else {
      return new Date(`${date}T00:00`).getTime();
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.titleBarWrapper}>
          <Typography
            variant="h3"
            align="left"
            classes={{ root: classes.title }}
          >
            {'Manage Auction Schedule'}
          </Typography>
        </div>
        {this.state.updateSuccessful && (
          <FormHelperText classes={{ root: classes.helperText }}>
            {this.state.updateSuccessText}
          </FormHelperText>
        )}
        <form onSubmit={this.handleSubmit} className={classes.scheduleForm}>
          <TextField
            id="date"
            type="date"
            label="Auction Date"
            value={this.state.date}
            required
            className={classes.textField}
            onChange={this.handleChange('date')}
          />
          <TextField
            id="startTime"
            type="time"
            label="Start Time"
            value={this.state.startTime}
            required
            className={classes.textField}
            onChange={this.handleChange('startTime')}
          />

          <TextField
            id="endTime"
            type="time"
            label="End Time"
            value={this.state.endTime}
            required
            className={classes.textField}
            onChange={this.handleChange('endTime')}
          />
          <TextField
            id="slots"
            type="number"
            label="Number of Slots"
            min="0"
            value={this.state.slots}
            required
            className={classes.textField}
            onChange={this.handleChange('slots')}
          />
          <div className={classes.btnWrapper}>
            <Button
              variant="contained"
              color={'primary'}
              className={classes.saveBtn}
              type={'submit'}
            >
              {'Save Schedule'}
            </Button>
          </div>
        </form>
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
  titleBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Lucida Console, Monaco, monospace'
  },
  textField: {
    width: '30vw'
  },
  saveBtn: {
    margin: '15px 5px 15px 0',
    padding: '5px',
    textTransform: 'none'
  },
  helperText: {
    fontSize: 16,
    color: '#33cc33'
  }
});

export default withStyles(styles)(ManageAuctionSchedule);
