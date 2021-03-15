import React, { useEffect, useState } from 'react';
import CreateModal from '../CreateCollection/createCollection';
import DeleteModal from '../DeleteCollection/deleteCollection';
import EditModal from '../EditCollection/editCollection';
import AddCardModal from '../CreateCard/createCards';
import EditDeleteCardModal from '../EditAndDeleteCards/editAndDeleteCards';
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
import { ListSubheader } from '@material-ui/core';


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
 	button: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		borderRadius: 3,
		color: 'white',
		height: 48,
		padding: '0 30px',
	 }
}));

let currentTitle = '';
let currentID = '';
let deleteTitle = '';
let deleteID = '';
let editTitle = '';
let editID = '';

export function TemporaryDrawer(props) {

	const classes = useStyles();
	const [state, setState] = React.useState({
		left: false,
		collectionTitle: ''
	});
	const [allCards, setAllCards] = useState([]);
	const [chooseOpen, setChooseOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [createModalShow, setCreateModalShow] = useState(false);
	const [deleteModalShow, setDeleteModalShow] = useState(false);
	const [editModalShow, setEditModalShow] = useState(false);
	const [addCardModalShow, setAddCardModalShow] = useState(false);
	const [editDeleteCardModalShow, setEditDeleteCardModalShow] = useState(false);

	useEffect(() => {
		setAllCards(props.allData);
	}, [props.allData])

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

	const toggleDrawerDisplayCreateModal = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [anchor]: open });
		setCreateModalShow(true);
	};

	const toggleDrawerDisplayEditModal = (anchor) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [anchor]: false });
		setEditModalShow(true);
	};

	const toggleDrawerDisplayDeleteModal = (anchor) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [anchor]: false });
		setDeleteModalShow(true);
	};

	const toggleDrawerDisplayAddCardModal = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [anchor]: open });
		setAddCardModalShow(true);
	};

	const toggleDrawerDisplayEditDeleteCardModal = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [anchor]: open });
		setEditDeleteCardModalShow(true);
	};

  	function handleChooseClick(value) {
		let temp = allCards.filter((i) => 
			i.title === value
		)
		currentTitle = (temp[0].title);
		currentID = (temp[0]._id);
		props.selectCollection(temp[0]._id);
		setState({ ...state, left: false });
	}

	function handleEditClick(value) {
		let temp = allCards.filter((i) => 
			i.title === value
		)
		editTitle = (temp[0].title);
		editID = (temp[0]._id);
	}

	function handleDeleteClick(value) {
		let temp = allCards.filter((i) => 
			i.title === value
		)
		deleteTitle = (temp[0].title);
		deleteID = (temp[0]._id);
	}

  	let listTitlesToChoose = allCards.map((i) => {
		return(
			<ListItem button key={i.title} className={classes.nested} onClick={() => handleChooseClick(i.title)}>
				<ListItemText primary={i.title}/>
			</ListItem>
		)
	});

	let listTitlesToEdit = allCards.map((i) => {
		return(
			<ListItem button key={i.title} className={classes.nested} onClick={() => handleEditClick(i.title)}>
				<ListItemText primary={i.title}/>
			</ListItem>
		)
	});

	let listTitlesToDelete = allCards.map((i) => {
		return(
			<ListItem button key={i.title} className={classes.nested} value={i.title} onClick={() => handleDeleteClick(i.title)}>
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
			<ListSubheader>
				<ListItemText primary={"Collections"} />
			</ListSubheader>
				<ListItem button key={"chooseCollection"} onClick={handleChooseOpen}>
				<ListItemIcon><ListRoundedIcon color="primary"/></ListItemIcon>
				<ListItemText primary={"Choose a Collection"} />
				{chooseOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={chooseOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{listTitlesToChoose}
				</List>
				</Collapse>
      </List>
		<List>
			<ListItem button key={"addCollection"} onClick={toggleDrawerDisplayCreateModal(anchor, false)}>
				<ListItemIcon><AddBoxRoundedIcon color="primary"/></ListItemIcon>
				<ListItemText primary={"Add a Collection"} />
			</ListItem>
      </List>	
		<List>
          <ListItem button key={"editCollection"} onClick={handleEditOpen}>
            <ListItemIcon><EditRoundedIcon color="primary"/></ListItemIcon>
            <ListItemText primary={"Edit a Collection"} />
				{editOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={editOpen} timeout="auto" unmountOnExit>
			<List component="div" disablePadding onClick={toggleDrawerDisplayEditModal(anchor, false)}>
				{listTitlesToEdit}
			</List>
			</Collapse>
      </List>
		<List>
			<ListItem button key={"deleteCollection"} onClick={handleDeleteOpen}>
            <ListItemIcon><DeleteRoundedIcon color="primary"/></ListItemIcon>
            <ListItemText primary={"Delete a Collection"} />
				{deleteOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={deleteOpen} timeout="auto" unmountOnExit>
			<List component="div" disablePadding onClick={toggleDrawerDisplayDeleteModal(anchor, false)}>
				{listTitlesToDelete}
			</List>
			</Collapse>
      </List>
		<Divider />
		<List>
			<ListSubheader>
				<ListItemText primary={"Cards"} />
			</ListSubheader>
				<ListItem button key={"addCard"} onClick={toggleDrawerDisplayAddCardModal(anchor, false)}>
					<ListItemIcon><AddBoxRoundedIcon color="primary"/></ListItemIcon>
					<ListItemText primary={"Add a Card to Current Collection"} />
				</ListItem>
				<ListItem button key={"editDeleteCards"} onClick={toggleDrawerDisplayEditDeleteCardModal(anchor, false)}>
					<ListItemIcon><EditRoundedIcon color="primary"/></ListItemIcon>
					<ListItemText primary={"Edit/Delete Cards in Current Collection"} />
				</ListItem>
		</List>
    </div>
  );

	return (
		<div>
		{['left'].map((anchor) => (
			<React.Fragment key={anchor}>
				<Button className={classes.button} variant="contained" onClick={toggleDrawer(anchor, true)}>Menu</Button>
					<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
						{list(anchor)}
					</Drawer>
					<CreateModal 
						addcollection={props.addCollection}
						show={createModalShow} 
						onHide={() => setCreateModalShow(false)}
					/>
					<EditModal 
						editcollection={props.editCollection}
						edittitle={editTitle}
						editid={editID}
						show={editModalShow} 
						onHide={() => setEditModalShow(false)}
					/>
					<DeleteModal 
						deletecollection={props.deleteCollection}
						deletetitle={deleteTitle}
						deleteid={deleteID}
						show={deleteModalShow} 
						onHide={() => setDeleteModalShow(false)}
					/>
					<AddCardModal 
						addcard={props.addCard}
						collectionid={currentID}
						currentitle={currentTitle}
						show={addCardModalShow} 
						onHide={() => setAddCardModalShow(false)}
					/>
					<EditDeleteCardModal
						deletecard={props.deleteCard}
						editcard={props.editCard}
						collectiondata={props.collectionData}
						collectionid={currentID}
						currentitle={currentTitle}
						show={editDeleteCardModalShow} 
						onHide={() => setEditDeleteCardModalShow(false)}
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
