import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import appApi from '../api/appApi';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import TagsModal from './TagsModal';
import Divider from '@mui/material/Divider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function NoteDetailsModal({isOpen, note, handleClose, tags}) {
    const [noteData, setNoteData] = useState({});
    const [error, setError] = useState('');
    const [isEditMode, setIsEditMode] = useState(true);
    const [noteNameError, setNoteNameError] = useState(false);
    const [noteNameErrorMessage, setNoteNameErrorMessage] = useState('');
    const [noteContentError, setNoteContentError] = useState(false);
    const [noteContentErrorMessage, setNoteContentErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [isNewNote, setIsNewNote] = useState(true);
    const [openTagsModal, setOpenTagsModal] = useState(false);

    const { user } = useContext(AuthContext);
    const api = appApi();

    useEffect(() => {
        if(note){
            setNoteData(note);
            setIsNewNote(false);
            setIsEditMode(false);
        }else{
            setNoteData({});
            setIsNewNote(true);
            setIsEditMode(true);
        }
    }, [note, tags]);

    const handleArchive = async () => {
        try {
            const response = await api.put(`/api/update-note/${noteData.id}/archive`, {
                data: {
                    archived: !noteData.archived,
                }
            });

            if (response.status === 200) {
                setNoteData(response.data);
            } else {
                setError('Failed to archive note. Please try again.');
            }
        } catch (error) {
            setError('Error archiving note: ' + (error.response?.data?.error || error.message));
        }
    }

    const switchMode = () => {
        setIsEditMode(!isEditMode);
    }

    const onInputChange = (e) => {
        const newNote = {...noteData};
        newNote[`${e.target.name}`] = e.target.value;
        setNoteData(newNote);
    }

    const validateInputs = () => {
        let isValid = true;
        
        if (!noteData.name || noteData.name.length < 3) {
            setNoteNameError(true);
            setNoteNameErrorMessage('Please enter a valid Name.');
            isValid = false;
        } else {
            setNoteNameError(false);
            setNoteNameErrorMessage('');
        }
    
        if (!noteData.content || noteData.content.length < 6) {
            setNoteContentError(true);
            setNoteContentErrorMessage('Content must be at least 6 characters long.');
            isValid = false;
        } else {
            setNoteContentError(false);
            setNoteContentErrorMessage('');
        }
    
        return isValid;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');
        if(validateInputs()){
            try {
                let response;
                if(isNewNote){
                    response = await api.post(`/api/create-note`, {
                        data: {...noteData, userId: user.userId}
                    });
                }else{
                    response = await api.put(`/api/update-note/${noteData.id}`, {
                        data: {...noteData}
                    });
                }

                if (response.status === 200) {
                    setNoteData(response.data);
                    switchMode();
                } else {
                    setError('Failed to update/create note. Please try again.');
                }
            } catch (error) {
                setError('Error updating note: ' + (error.response?.data?.error || error.message));
            }
        }
    }

    const handleCloseTagModal = () => {
        setOpenTagsModal(false);
    }

    const handleSelectedTag = async (tag) => {
        try {
            const newTags = noteData.Tags ? noteData.Tags.map(tag => tag.id) : [];
            newTags.push(tag.id);
            const response = await api.post(`/api/note/${noteData.id}/tags`, {
                data: {
                    tags: newTags,
                }
            });

            if (response.status === 200) {
                const newNoteData = {...noteData};
                newNoteData.Tags.push(tag);
                setNoteData(newNoteData);
                handleCloseTagModal();
            } else {
                setError('Failed to add tags to note. Please try again.');
            }
        } catch (error) {
            setError('Error adding tags to note: ' + (error.response?.data?.error || error.message));
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="note"
            aria-describedby="note-details"
        >
            <Box sx={style}>
                {isEditMode ? <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Note Name"
                            name="name"
                            autoFocus
                            value={noteData.name}
                            onChange={(e) => onInputChange(e)}
                            error={noteNameError}
                            helperText={noteNameErrorMessage}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            name="content"
                            label="Content"
                            id="content"
                            value={noteData.content}
                            onChange={(e) => onInputChange(e)}
                            error={noteContentError}
                            helperText={noteContentErrorMessage}
                        />
                        {error && (
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        )}
                        {infoMessage && (
                            <Typography variant="body2" color="success" align="center">
                                {infoMessage}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="contained" onClick={handleSave}> Save</Button>
                        </Box>
                    </>
                    : <>
                        <Typography id="note-name" variant="h6" component="h2">
                            {noteData.name}
                        </Typography>
                        <Typography id="note-createdAt" sx={{ mt: 2 }}>
                            {moment(noteData.createdAt).format('MMMM Do YYYY, h:mm A')}
                        </Typography>
                        <Typography id="note-content" sx={{ mt: 2, mb: 5 }}>
                            {noteData.content}
                        </Typography>
                        <Divider component="div" />
                        {noteData.Tags?.map((tag,idx) => (
                            <Typography id={"note-tag"+idx} sx={{ mt: 2 }}>
                                {tag.name}
                            </Typography>
                        ))}
                        <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="text" onClick={() => setOpenTagsModal(true)}> Add Tags to Note</Button>
                        <Divider component="div" />
                        {error && (
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="outlined" onClick={handleArchive}> {noteData.archived ? 'Unarchive':'Archive'}</Button>
                            <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="contained" onClick={switchMode}> Edit</Button>
                        </Box>
                    </>
                }
                <TagsModal isOpen={openTagsModal} tags={tags} handleClose={handleCloseTagModal} setTag={(tag) => handleSelectedTag(tag)}/>
            </Box>
        </Modal>
    );
}

export default NoteDetailsModal;