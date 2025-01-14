import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Icon, Image, Grid, Container } from 'semantic-ui-react';

const UserProfile = () => {
    const location = useLocation();
    const { user } = location.state;

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-red-500 flex items-center justify-center p-10">
            <Container>
                <Card fluid className="p-6 bg-white shadow-lg border border-gray-200">
                    <Grid columns={3} stackable>
                        <Grid.Column width={10} className="flex justify-center">
                            <Image
                                src={`https://collab-app-backend.onrender.com/userAuth${user.profileImageURL}`}
                                size="medium"
                                circular
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Card.Content>
                                <Card.Header className="text-4xl font-bold text-gray-800">{user.firstName} {user.lastName}</Card.Header>
                                <Card.Meta className="text-lg text-gray-500 mb-4">{user.email}</Card.Meta>
                                <Card.Description className="text-lg text-gray-700">
                                    <p><Icon name='user' /> Gender: {user.gender}</p>
                                </Card.Description>
                            </Card.Content>
                        </Grid.Column>
                    </Grid>
                </Card>
            </Container>
        </div>
    );
};

export default UserProfile;
