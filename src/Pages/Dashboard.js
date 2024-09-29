import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useAuthContext } from 'Context/AuthContext';

const Dashboard = () => {
    const { user } = useAuthContext();
  document.title = 'Dashboard';

  return (
    <React.Fragment>
      <Container fluid className='dashboard'>
        <Card className='dashboard-main-card'>
          <CardBody className='dashboard-body'>
            <h5>Dashboard {user?.roles?.[0]}</h5>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
