import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";

import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
const countriesURL = "https://restcountries.eu/rest/v2/all";
const count =0;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const classes = useStyles();
  
  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
    // setCountriesData(response.data);    
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  const [countryList, setCountryList] = React.useState([]);
  const [anchor, setAnchor] = React.useState('right');
  
  const [state, setState] = React.useState({
    right: false,
  });
 
  const toggleDrawer = (anchor, open, country) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setCountryList([country ? country.flag: '',
                    country ? "Country: "+country.name : '',
                    country ? "Capital: "+country.capital : '',
                    country ? "Population: "+country.population : '',
                    country ? "Region: "+country.region : '',
                    country ? "Subregion: "+country.subregion : '',
                    country ? "Calling code: "+country.callingCodes : '',
                    country ? "Subregion: "+country.subregion : '',
                    country ? "Lat Long: "+country.latlng : '',
                    country ? "Demonym: "+country.demonym : '',
                    country ? "Borders: "+country.borders : '',
                  ]);
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

        {countryList.map((text, index) => (
          <ListItem key={text}>
            <ListItem>{index === 0 ? <img src={text} alt="" width="75px" /> : <ListItemText primary={text} /> }</ListItem>
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );




  return (
    <>

  <div>
     { 
     <React.Fragment key={anchor}>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
      }
    </div>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Countries table">
              <TableHead>
                <TableRow>
                  <TableCell  style={{width: '5%'}}>
                    <strong>Sr. No</strong>
                  </TableCell>
                  <TableCell  style={{width: '300px'}}>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="left"style={{width: '300px'}}>
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country,index) => (           
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      {index+1}
                    </TableCell>
                    <TableCell align="left" onClick={toggleDrawer(anchor, true,country)} >
                     {country.name}
                    </TableCell>

                    <TableCell align="center" >
                      <img src={country.flag} alt="" width="50px" />
                    </TableCell>
                    <TableCell align="left">{country.capital}</TableCell>
                    <TableCell align="left">{country.population}</TableCell>
                    <TableCell align="left">{country.region}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;