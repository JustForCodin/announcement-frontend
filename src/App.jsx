import React, {useState, useEffect, useCallback} from "react";
import { apiService } from "./services/announcementApiService";
import AnnouncementsList from "./components/AnnouncementsList";
import AnnouncementDetails from "./components/AnnouncementDetails";
import AnnouncementForm from "./components/AnnouncementForm";
import Button from "./components/shared/Button";
import Card from "./components/shared/Card";
import Spinner from "./components/shared/Spinner";
import './App.css';

export default function App() {
  const [announcements, setAnnouncements] = useState([]);
  const [view, setView] = useState('list'); // list, details, create, edit
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnnouncements = useCallback(() => {
    setIsLoading(true);
    apiService.getAnnouncements()
      .then(data => {
        setAnnouncements(data);
        setError('');
      })
      .catch(err => {
        console.error("Failed to fetch announcements:", err);
        setError('Could not connect to the API. Make sure the server is running.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleSave = (announcementData) => {
    const savePromise = view === 'create'
      ? apiService.createAnnouncement(announcementData)
      : apiService.updateAnnouncement(selectedAnnouncement.id, announcementData);

    savePromise
      .then(() => {
        fetchAnnouncements();
        setView('list');
        setSelectedAnnouncement(null);
      })
      .catch(err => {
        console.error("Failed to save announcement:", err);
        setError('Failed to save the announcement. Please try again.');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete announcement?')) {
      apiService.deleteAnnouncement(id)
        .then(() => {
          fetchAnnouncements();
          if (view === 'details' && selectedAnnouncement?.id === id) {
            setView('list');
            setSelectedAnnouncement(null);
          }
        })
        .catch(err => {
          console.error("Failed to delete announcement", err);
          setError('Failed to delete the announcement');
        })
    }
  };

  const handleViewDetails = (id) => {
    setSelectedAnnouncement({id});
    setView('details');
  }

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setView('edit');
  }

  const renderContent = () => {
    if (isLoading && !announcements.length) return <Spinner />;
    if (error) return <Card><p className="text-red text-center text-semibold">{error}</p></Card>

    switch (view) {
      case 'details':
        return <AnnouncementDetails announcementId={selectedAnnouncement.id} onBack={() => {setView('list')}}/>
      case 'create':
      case 'edit':
        return <AnnouncementForm existingAnnouncement={selectedAnnouncement} onSave={handleSave} 
          onCancel={()=>setView('list')} />
      case 'list':
      default:
        return (
          <>
            <div className="flex-justify-end">
              <Button onClick={() => { setView('create'); setSelectedAnnouncement(null); }}>
                New Announcement
              </Button>
            </div>
            <AnnouncementsList
              announcements={announcements}
              onView={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete} 
            />
          </>
        );
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <nav className="app-header-nav">
          <h1 className="app-title">Announcements</h1>
        </nav>
      </header>
      <main className="app-content">
        {renderContent()}
      </main>
      <footer className="app-footer">
        <p>Announcemments app | Author: @JustForCodin</p>
      </footer>
    </div>
  );
}