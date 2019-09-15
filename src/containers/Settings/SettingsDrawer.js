import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

function SettingsDrawer(props) {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);

    const toggleDrawer = (open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setIsVisible(open);
    };

    const settingsList = () => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
            <List>
              {['Setting 1', 'Setting 2'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Setting 3', 'Setting 4'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
        </div>
    );

    const openButton = null;
     // <Button onClick={toggleDrawer(true)}>Open Left</Button>

    return (
        <div>
            {openButton}
            <Drawer open={isVisible} onClose={toggleDrawer(false)}>
              {settingsList()}
            </Drawer>
        </div>
    );
};

export default SettingsDrawer;
