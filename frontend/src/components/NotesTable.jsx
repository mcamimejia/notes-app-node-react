import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function NotesTable({notes, openNote, deleteNote}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableBody>
                    {notes && notes.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                            onClick={() => openNote(row)}
                        >
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">
                                {row.tags && row.tags.map((tag) => (
                                    <p>{tag.name},</p>
                                ))}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => deleteNote(row)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default NotesTable;