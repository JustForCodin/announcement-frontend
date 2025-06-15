import React, {useState, useEffect} from "react";
import { apiService } from "../services/announcementApiService";
import Card from "./shared/Card";
import Button from "./shared/Button";
import Spinner from "./shared/Spinner";

export default function AnnouncementDetails({announcementId, onBack}) {
    const [announcement, setAnnouncement] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        apiService.getAnnouncementById(announcementId)
            .then(data => {
                setAnnouncement(data);
                setError('');
            })
            .catch(err => {
                console.error("Failed to fetch announcement details:", err);
                setError('Could not load announcement details.');
            })
            .finally(() => setIsLoading(false));
    }, [announcementId]);

    if (isLoading) return <Spinner/>;
    if (error) return <Card><p className="text-red text-center">{error}</p></Card>;
    if (!announcement) return null;

    return (
        <div>
            <Button onClick={onBack} variant="secondary">Back</Button>
            <Card>
                <h1 className="announcement-details-header">{announcement.title}</h1>
                <p className="announcement-details-date">
                    Published on {new Date(announcement.dateAdded).toLocaleString()}
                </p>
                <p className="announcement-details-description">
                    {announcement.description}
                </p>
            </Card>
            {announcement.similarAnnouncements?.length > 0 && (
                <Card>
                    <h2 className="similar-announcements-title">Similar announcements</h2>
                    <ul className="similar-announcements-list">
                        {announcement.similarAnnouncements.map(similar => (
                            <li key={similar.id} className="similar-item">
                                <h4 className="similar-item-title">{similar.title}</h4>
                                <p>{similar.description}</p>
                            </li>
                        ))}
                    </ul>
                </Card>
            )}
        </div>
    );
}