import React, { useState, useEffect } from "react";
import { Card } from "./shared/Card";
import { Button } from "./shared/Button";

export default function AnnouncementForm({existingAnnouncement, onSave, onCancel}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const isEditing = !!existingAnnouncement;

    useEffect(() => {
        if (isEditing) {
            setTitle(existingAnnouncement.title);
            setDescription(existingAnnouncement.description);
        }
    }, [existingAnnouncement, isEditing]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title && description) {
            onSave({title, description});
        }
    };

    return (
        <Card>
            <h2 className="form-title">{isEditing ? 'Edit Announcement' : 'Create Announcement'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input 
                        type="text" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-input" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea  
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="6"
                        className="form-textarea"
                    >
                    </textarea>
                </div>
                <div className="form-group">
                    <Button onClick={onCancel} variant="secondary" type="button">Cancel</Button>
                    <Button type="submit">{isEditing ? "Save Changes" : "Create Announcement"}</Button>
                </div>
            </form>
        </Card>
    );
}