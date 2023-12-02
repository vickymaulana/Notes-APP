import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import ListNotes from './ListNotes';

const AddNotes: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCardClick = () => {
        setExpanded(!expanded);
    };

    const handleFormClick = (e: React.MouseEvent<HTMLFormElement>) => {
        e.stopPropagation();
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('https://api.contoh.com/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                // Note saved successfully
                setTitle('');
                setDescription('');
                setExpanded(false);
                setNotification('Note saved successfully');
                setIsSuccess(true);
            } else {
                // Handle error
                setNotification('Failed to save note');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Failed to save note', error);
            setNotification('Failed to save note');
            setIsSuccess(false);
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (notification) {
            timeout = setTimeout(() => {
                setNotification('');
                setIsSuccess(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [notification]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '400px', cursor: 'pointer' }}>
                <Card
                    className={`my-3 ${expanded ? 'expanded' : ''}`}
                    onClick={handleCardClick}
                >
                    <Card.Body>
                        <Card.Title>Writing Notes</Card.Title>
                        {notification && (
                            <Alert variant={isSuccess ? 'success' : 'danger'}>
                                {notification}
                            </Alert>
                        )}
                        {expanded && (
                            <form onClick={handleFormClick} onSubmit={handleSave}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Notes Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </form>
                        )}
                    </Card.Body>
                </Card>
                <ListNotes />
            </div>
        </div>
    );
};

export default AddNotes;
