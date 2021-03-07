import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import './drawer.css';

// 'Choose a Collection', 'Add a Collection', 'Edit a Collection', 'Delete a Collection'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button key={"chooseCollection"}>
            <ListItemIcon><ListRoundedIcon color="primary"/></ListItemIcon>
            <ListItemText primary={"Choose a Collection"} />
          </ListItem>
      </List>
      <Divider />
		<List>
          <ListItem button key={"addCollection"}>
            <ListItemIcon><AddBoxRoundedIcon color="primary"/></ListItemIcon>
            <ListItemText primary={"Add a Collection"} />
          </ListItem>
      </List>
      <Divider />
		<List>
          <ListItem button key={"editCollection"}>
            <ListItemIcon><EditRoundedIcon color="primary"/></ListItemIcon>
            <ListItemText primary={"Edit a Collection"} />
          </ListItem>
      </List>
      <Divider />
		<List>
          <ListItem button key={"deleteCollection"}>
            <ListItemIcon><DeleteRoundedIcon color="primary"/></ListItemIcon>
            <ListItemText primary={"Delete a Collection"} />
          </ListItem>
      </List>
      <Divider />
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
        </React.Fragment>
      ))}
    </div>
  );
}