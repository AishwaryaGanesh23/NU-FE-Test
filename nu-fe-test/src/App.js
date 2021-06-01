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

const countriesURL = "https://restcountries.eu/rest/v2/all";
const count =0;
const useStyles = makeStyles({
  table: {
    minWidth: 650,
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


  return (
    <>
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
                    <TableCell align="left">{country.name}</TableCell>
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
