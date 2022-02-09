import {Container, Row, Badge, Button, Table, Card, Dropdown, Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const PetsList = (props: {pets: any; isLoading: any; petStatus: any[]; getPetsData: (arg0: any) => void}) => {
  return (
    <Container>
      <Row style={{paddingTop: '40px'}}>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Choose Pet Status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {props.petStatus.map(status => (
              <Dropdown.Item key={status} onClick={() => props.getPetsData(status)}>
                {status}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>

      <Row style={{padding: '40px 0px'}}>
        {props.isLoading ? (
          <Spinner animation='grow' />
        ) : (
          <Card>
            <Table>
              <thead>
                <tr>
                  <th>Pet name</th>
                  <th>Pet status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.pets.length === 0
                  ? 'No results'
                  : props.pets.map((pet: {id: number; name: string; status: string}) => (
                      <tr key={pet.id}>
                        <td>
                          <p>{pet.name}</p>
                        </td>
                        <td>
                          <Badge bg='success'>{pet.status}</Badge>
                        </td>
                        <td>
                          <Link to={`/pets/${pet.id}`}>
                            <Button variant='secondary'>Edytuj</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </Card>
        )}
      </Row>
    </Container>
  )
}

export default PetsList
