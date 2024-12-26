import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import appApi from '../api/appApi';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MainBar from './MainBar';
import NotesTable from './NotesTable';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NoteDetailsModal from './NoteDetailsModal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TagsModal from './TagsModal';

function Home() {
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [noteDetails, setNoteDetails] = useState(null);
    const [error, setError] = useState('');
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [filter, setFilter] = useState('ACTIVE');
    const [openTagsModal, setOpenTagsModal] = useState(false);

    const { user } = useContext(AuthContext);
    const api = appApi();

    useEffect(() => {
        fetchData();
    }, [filter, selectedTag]);

    const fetchData = async () => {
        try {
            let notesResponse;
            if(filter === 'BY_TAG' && selectedTag) {
                notesResponse = await api.get(`/api/notes/user/${user.userId}/tag/${selectedTag.id}`);
            }else if(filter === 'ARCHIVED'){
                notesResponse = await api.get(`/api/notes/user/${user.userId}/archived`);
            }else if(filter === 'ACTIVE'){
                notesResponse = await api.get(`/api/notes/user/${user.userId}`);
            }
            
            const tagsResponse = await api.get('/api/tags');
            
            if(notesResponse) setNotes(notesResponse.data);
            setTags(tagsResponse.data);
        } catch (error) {
            setError('Error fetching data:' + error);
        }
    };

    const openNote = (note) => {
        setNoteDetails(note);
        setOpenNoteModal(true);
    }

    const handleCloseNoteModal = () => {
        setOpenNoteModal(false);
    };

    const deleteNote = async (note) => {
        try {
            const deleteResponse = await api.delete(`/api/note/${note.id}`);

            if (deleteResponse.status === 200) {
                fetchData();
            } else {
                setError('Failed to delete note. Please try again.');
            }
        } catch (error) {
            setError('Error deleting note: ' + (error.response?.data?.error || error.message));
        }
    }

    const changeFilter = (e,newFilter) => {
        setSelectedTag(null);
        setFilter(newFilter);
        if(newFilter === 'BY_TAG'){
            setOpenTagsModal(true);
        }
    }

    const handleCloseTagModal = () => {
        setOpenTagsModal(false);
    }

    const handleSelectedTag = (tag) => {
        setSelectedTag(tag);
        handleCloseTagModal();
    }

    return (
        <Box sx={{ 
            height: '100vh',
            backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundRepeat: 'no-repeat',
        }}
        >
            <MainBar/>
            <Stack spacing={5}
                sx={{
                    p: 5,
                }}
            >
                {error && (
                    <Typography variant="body2" color="error" align="center">
                        {error}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <ToggleButtonGroup
                        value={filter}
                        exclusive
                        onChange={changeFilter}
                    >
                        <ToggleButton value="ACTIVE">
                            Active
                        </ToggleButton>
                        <ToggleButton value="ARCHIVED">
                            Archived
                        </ToggleButton>
                        <ToggleButton value="BY_TAG">
                            By Tag
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button sx={{ ml: 2}} size='large' type="submit" variant="contained" onClick={() => openNote(null)}> New Note</Button>
                </Box>
                {selectedTag && <Typography component="h1" variant="h5">*{selectedTag.name} </Typography>}
                <NotesTable notes={notes} openNote={openNote} deleteNote={deleteNote}/>
            </Stack>
            <NoteDetailsModal isOpen={openNoteModal} note={noteDetails} handleClose={handleCloseNoteModal} tags={tags}/>
            <TagsModal isOpen={openTagsModal} tags={tags} handleClose={handleCloseTagModal} setTag={(tag) => handleSelectedTag(tag)}/>
        </Box>
    );
}

export default Home;