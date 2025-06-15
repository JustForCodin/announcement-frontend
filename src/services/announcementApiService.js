const API_URL = 'http://localhost:5071/api/announcements';

async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({message: 'Response handling failure.'}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) {
        return null;
    }
    return response.json();
}

export const apiService = {
    getAnnouncements: () => fetch(API_URL).then(handleResponse),
    getAnnouncementById: (id) => fetch(`${API_URL}/${id}`).then(handleResponse),

    createAnnouncement: (announcement) => fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(announcement)
    }).then(handleResponse),

    updateAnnouncement: (id, announcement) => ferch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(announcement)
    }).then(handleResponse),

    deleteAnnouncement: (id) => fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    }).then(handleResponse)
};