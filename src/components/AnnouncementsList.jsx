import React from "react";
import { Card } from "./shared/Card";
import { Button } from "./shared/Button";

export default function AnnouncementsList({announcements, onEdit, onView, onDelete}) {
    if (!announcements.length) {
        return (
            <Card>
                <p className="text-center">You don't have any announcements, but you can add one 😊</p>
            </Card>
        );
    }

    return (
        <div className="announcement-list">
            {announcements.map(ann => {
                <Card key={ann.id}>
                    <h3 className="announcement-list-title">{ann.title}</h3>
                    <p className="announcement-list-date">
                        {new Date(ann.dateAdded).toLocaleString()}
                    </p>
                    <p className="announcement-list-description">{ann.description}</p>
                    <div className="announcement-list-actions">
                        <Button onClick={() => onView(ann.id)}>View Details</Button>
                        <Button onClick={() => onEdit(ann)} variant="secondary">Edit</Button>
                        <Button onDelete={() => onDelete(ann.id)} variant="danger">Delete</Button>
                    </div>
                </Card>
            })}
        </div>
    );
}