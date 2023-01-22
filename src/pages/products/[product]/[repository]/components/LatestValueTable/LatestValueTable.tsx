import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  Box,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from '@mui/material';

import { Historical } from '@customTypes/repository';

  
function createData(
  name: string,
  latestValue: number,
  latestData: string,
) {
  return { name, latestValue, latestData};
}

interface Prop {
    title: string;
    latestValue: Historical[];
}

function LatestValueTable({title, latestValue}: Prop) {    
  
    const rows: any[] = [];
    
    for (let i = 0; i < latestValue['results'].length; i++) {

      const name = latestValue['results'][i]['name'];
      const Value = latestValue['results'][i]['latest']['value'];
      const Data = latestValue['results'][i]['latest']['created_at'];

      rows.push(createData(name, Value, format(new Date(Data), 'dd/MM/yyyy HH:MM', { locale: ptBR })))    
    }

    return (
      <Box marginTop="12px" overflow="auto" maxHeight="200px">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>{title}</TableCell>
                <TableCell align="right">Último valor</TableCell>
                <TableCell align="right">Última atualização</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.latestValue}</TableCell>
                <TableCell align="right">{row.latestData}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
      </Box>
      );
}

export default LatestValueTable;