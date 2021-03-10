import React from 'react';
import CreateModal from '../CreateCollection/createCollection';
// import useModal from '../CreateCollection/useModal';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import './drawer.css';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  nested: {
	paddingLeft: theme.spacing(10),
 },
}));

let currentTitle = '';

export function TemporaryDrawer(props) {

	let allCards = props.allData;

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
	 collectionTitle: ''
  });
  const [chooseOpen, setChooseOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const handleChooseOpen = () => {
	setChooseOpen(!chooseOpen);
	};

	const handleEditOpen = () => {
		setEditOpen(!editOpen);
	};

	const handleDeleteOpen = () => {
		setDeleteOpen(!deleteOpen);
	};

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const toggleDrawerAndOpenModal = (anchor, open) => (event) => {
	if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		return;
	}
	setState({ ...state, [anchor]: open });
	setModalShow(true);
	};

  	function handleChooseClick(value) {
		let temp = allCards.filter((i) => 
			i.title === value
		)
		currentTitle = (temp[0].title);
		props.selectCollection(temp[0]._id);
	}

  let listTitles = allCards.map((i) => {
		return(
			<ListItem button key={i.title} className={classes.nested} value={i.title} onClick={() => handleChooseClick(i.title)}>
				<ListItemText primary={i.title}/>
			</ListItem>
		)
	});

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
		<List>
			<ListItem button key={"chooseCollection"} onClick={handleChooseOpen}>
			<ListItemIcon><ListRoundedIcon color="primary"/></ListItemIcon>
			<ListItemText primary={"Choose a Collection"} />
			{chooseOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={chooseOpen} timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				{listTitles}
			</List>
			</Collapse>
      </List>
      <Divider />
		<List>
			<ListItem button key={"addCollection"} onClick={toggleDrawerAndOpenModal(anchor, false)}>
				<ListItemIcon><AddBoxRoundedIcon color="primary"/></ListItemIcon>
				<ListItemText primary={"Add a Collection"} />
			</ListItem>
      </List>	
      <Divider />
		<List>
          <ListItem button key={"editCollection"} onClick={handleEditOpen}>
            <ListItemIcon><EditRoundedIcon color="primary"/></ListItemIcon>
            <ListItemText primary={"Edit a Collection"} />
				{editOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={editOpen} timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				{listTitles}
			</List>
			</Collapse>
      </List>
      <Divider />
		<List>
			<ListItem button key={"deleteCollection"} onClick={handleDeleteOpen}>
            <ListItemIcon><DeleteRoundedIcon color="primary"/></ListItemIcon>
            <ListItemText primary={"Delete a Collection"} />
				{deleteOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={deleteOpen} timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				{listTitles}
			</List>
			</Collapse>
      </List>
    </div>
  );

	return (
		<div>
		{['left'].map((anchor) => (
			<React.Fragment key={anchor}>
				<Button className='openDrawer' variant="contained" color="primary" onClick={toggleDrawer(anchor, true)}>Menu</Button>
					<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
						{list(anchor)}
					</Drawer>
					<CreateModal 
					addcollection={props.addCollection}
					show={modalShow} 
					onHide={() => setModalShow(false)}
					/>
			</React.Fragment>
		))}
		</div>
  );
}

export function SetCurrentTitle() {
	return (
		<div className="collectionTitle">{currentTitle}</div>
	)
}
