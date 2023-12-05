import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Importing search icon
import styles from './ListNotes.module.css'; // Importing the CSS module

interface Note {
    id: string;
    title: string;
    description: string;
}

const ListNotes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [lastFetchStatus, setLastFetchStatus] = useState<Date | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://655771b0bd4bcef8b612a862.mockapi.io/api/v1/notes');
                if (response.ok) {
                    const data = await response.json();
                    setNotes(data);
                    setLastFetchStatus(new Date());
                } else {
                    console.log('Gagal mengambil catatan');
                }
            } catch (error) {
                console.log(error);
            }
        };

        const pollData = () => {
            fetchData();
            const intervalId = setInterval(fetchData, 10000000);

            return () => clearInterval(intervalId);
        };

        pollData();
    }, [lastFetchStatus]);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note);
    };

    const handleCloseModal = () => {
        setSelectedNote(null);
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
            await fetch(`https://655771b0bd4bcef8b612a862.mockapi.io/api/v1/notes/${noteId}`, {
                method: 'DELETE'
            });
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
            setSelectedNote(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditNote = (note: Note) => {
        setSelectedNote(note);
    };

    const handleUpdateNote = async (updatedNote: Note) => {
        try {
            const response = await fetch(`https://655771b0bd4bcef8b612a862.mockapi.io/api/v1/notes/${updatedNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNote),
            });

            if (response.ok) {
                setNotes(prevNotes =>
                    prevNotes.map(note => (note.id === updatedNote.id ? updatedNote : note))
                );
                setSelectedNote(null);
            } else {
                console.log('Gagal mengupdate catatan');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <FaSearch className={styles.searchIcon} />
                <Form.Control
                    type="text"
                    placeholder="Search notes by title..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
    
            <Row xs={1} md={2} lg={3} className={`g-4 ${styles.cardContainer}`}>
                {filteredNotes.map((note, index) => (
                    <Col key={index}>
                        <Card
                            className={`shadow ${styles.cardHoverEffect}`}
                            onClick={() => handleNoteClick(note)}
                        >
                            <Card.Body className={styles.cardBody}>
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Text>
                                    {note.description.length > 30
                                        ? `${note.description.substring(0, 30)}...`
                                        : note.description}
                                </Card.Text>
                                <div>
                                    <Button variant="primary" onClick={(e) => { e.stopPropagation(); handleEditNote(note); }}>Edit</Button>
                                    <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={selectedNote !== null} onHide={handleCloseModal} className={styles.modalFade}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedNote?.title || ''}
                                onChange={(e) =>
                                    setSelectedNote((prevNote) => ({
                                        ...prevNote,
                                        title: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={selectedNote?.description || ''}
                                onChange={(e) =>
                                    setSelectedNote((prevNote) => ({
                                        ...prevNote,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateNote(selectedNote)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListNotes;