import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from '../common/AppHeader';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Visibility from '@material-ui/icons/Visibility';
import ItemDetailsDialog from '../common/ItemDetailsDialog';
import Modal from '@material-ui/core/Modal';
import _ from 'lodash';
import moment from 'moment';
import { fetchAllAuctionItems } from '../../actions/AuctionActions';

class AuctionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      startDate: '',
      endDate: '',
      selection: 'date',
      search: '',
      selectedItemId: 0
    };
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
    const { pageIndex, pageSize, order, orderBy } = this.props;
    this.getAuctionItems(pageIndex, pageSize, order, orderBy);
  };

  getAuctionItems = (pageIndex, pageSize, order, orderBy) => {
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      const dateObj = {
        startDate: moment.utc(new Date(startDate + ' 00:00')).valueOf(),
        endDate: moment.utc(new Date(endDate + ' 23:59')).valueOf()
      };
      this.props.fetchAllAuctionItems(
        dateObj,
        pageIndex,
        pageSize,
        order,
        orderBy
      );
    }
  };

  handleViewItem = itemId => {
    debugger;
    this.setState({
      selectedItemId: itemId
    });
    this.handleOpen();
  };

  handleRequestSort = (event, property) => {
    const { order, orderBy, pageSize } = this.props;
    let newOrder = 'asc';
    if (orderBy === property && order === 'asc') {
      newOrder = 'desc';
    }
    this.getAuctionItems(0, pageSize, newOrder, property);
  };
  handleChangePage = (event, page) => {
    const { order, orderBy, pageSize } = this.props;
    this.getAuctionItems(page, pageSize, order, orderBy);
  };

  handleChangeRowsPerPage = event => {
    const { order, orderBy } = this.props;
    this.getAuctionItems(0, event.target.value, order, orderBy);
  };

  handleOpen = () => {
    debugger;
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      classes,
      tableHeaders,
      auctionItems,
      pageIndex,
      pageSize,
      order,
      orderBy,
      count
    } = this.props;
    const noItems =
      'There are no items available for auction for this date (range).';
    return (
      <Fragment>
        <AppHeader />
        <div className={classes.wrapper}>
          <Modal
            aria-labelledby="Items"
            aria-describedby="Post a new Item"
            open={this.state.open}
            onClose={this.handleClose}
            disableAutoFocus
          >
            <ItemDetailsDialog
              itemId={this.state.selectedItemId}
              onClose={this.handleClose}
            />
          </Modal>
          <Typography
            variant="title"
            align="left"
            classes={{ root: classes.pageHeading }}
          >
            {'List of items up for auction'}
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.scheduleForm}>
            <FormControl className={classes.formControl}>
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
            </FormControl>
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
                value={this.state.endDate}
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
                {'Show All Items'}
              </Button>
            </div>
          </form>
          <TextField
            id="search"
            type="text"
            placeholder={'Search...'}
            value={this.state.search}
            required
            onChange={this.handleChange('search')}
          />
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map(header => {
                      if (header.sortable) {
                        return (
                          <TableCell
                            key={header.id}
                            numeric={header.numeric}
                            padding="dense"
                            className={classes.headerCell}
                          >
                            <Tooltip
                              title="Sort"
                              enterDelay={300}
                              placement={
                                header.numeric ? 'bottom-end' : 'bottom-start'
                              }
                            >
                              <TableSortLabel
                                active={orderBy === header.id}
                                direction={order}
                                onClick={e =>
                                  this.handleRequestSort(e, header.id)
                                }
                              >
                                {header.label}
                              </TableSortLabel>
                            </Tooltip>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={header.id}
                            padding="dense"
                            numeric={header.numeric}
                            className={classes.headerCell}
                          >
                            {header.label}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!_.isEmpty(auctionItems) ? (
                    auctionItems.map((auction, index) => {
                      return (
                        <TableRow
                          hover
                          key={`${auction.id}-${index}`}
                          className={classes.tableRow}
                        >
                          <TableCell
                            classes={{ root: classes.tableCell }}
                            padding="dense"
                          >
                            {auction.itemId}
                          </TableCell>
                          <TableCell
                            classes={{ root: classes.tableCell }}
                            padding="dense"
                          >
                            {moment
                              .utc(auction.auctionDate)
                              .local()
                              .format('MM-DD-YYYY')}
                          </TableCell>
                          <TableCell
                            classes={{ root: classes.tableCell }}
                            padding="dense"
                          >
                            {moment
                              .utc(auction.startTime)
                              .local()
                              .format('HH:mm:ss A')}
                          </TableCell>
                          <TableCell
                            classes={{ root: classes.tableCell }}
                            padding="dense"
                          >
                            {moment
                              .utc(auction.endTime)
                              .local()
                              .format('HH:mm:ss A')}
                          </TableCell>
                          <TableCell
                            classes={{ root: classes.tableCell }}
                            padding="dense"
                            onClick={() => this.handleViewItem(auction.itemId)}
                          >
                            <Visibility />
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
                        <span className={classes.emptyTableText}>
                          {noItems}
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter className={classes.tableHeader}>
                  <TableRow>
                    <TablePagination
                      count={count}
                      rowsPerPage={pageSize}
                      page={pageIndex}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
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
  scheduleForm: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '10px',
    justifyContent: 'flex-start'
  },
  pageHeading: {
    marginTop: 20,
    fontFamily: 'Lucida Console, Monaco, monospace'
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
    tableHeaders: state.auctions.tableHeaders || [],
    auctionItems: state.auctions.auctionItems || [],
    pageIndex: state.auctions.pageIndex || 0,
    pageSize: state.auctions.pageSize || 10,
    order: state.auctions.order,
    orderBy: state.auctions.orderBy,
    count: state.auctions.count || 0
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAllAuctionItems
    },
    dispatch
  );
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuctionList)
);
