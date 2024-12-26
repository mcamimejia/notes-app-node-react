import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

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

function TagsModal({isOpen, tags, handleClose, setTag}) {
    const [selectedTag, setSelectedTag] = useState(null);

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <Box sx={style}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {tags.map((tag, idx) => {
                        const labelId = `tag-${tag.name}`;
                        return (
                            <ListItem
                                key={labelId+idx}
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={selectedTag && selectedTag.id === tag.id}
                                            onClick={(e) => setSelectedTag(tag)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId+idx} primary={tag.name} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="contained" onClick={(e) => {e.preventDefault(); setTag(selectedTag)}}> Set Tag</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default TagsModal;