import {Form, Button, Container, Row} from 'react-bootstrap'
import {ChangeEvent, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const EditPet = (props: {setPetStatus: (arg0: string[]) => void; petStatus: any[]}) => {
  const {petId} = useParams()

  const [currentPet, setCurrentPet] = useState({
    name: '',
    id: '',
    status: '',
  })

  const getPetData = async () => {
    const response = await fetch(`https://petstore.swagger.io/v2/pet/${petId}`)
    const petData = await response.json()
    setCurrentPet(petData)
  }

  useEffect(() => {
    getPetData()
  }, [])

  const postProductData = async () => {
    await fetch('https://petstore.swagger.io/v2/pet', {
      method: 'PUT',
      body: JSON.stringify(currentPet),
      headers: {
        Authorization: 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
        organizationId: '219',
      },
    })
  }

  useEffect(() => {
    const getStoreInventory = async () => {
      const response = await fetch('https://petstore.swagger.io/v2/store/inventory')
      const storeInventory = await response.json()
      const petStatus = Object.keys(storeInventory)
      props.setPetStatus(petStatus)
    }
    getStoreInventory()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof Element) {
      setCurrentPet({...currentPet, name: e.target.value})
      console.log(currentPet.name)
    }
  }

  const deletePet = async () => {
    await fetch(`https://petstore.swagger.io/v2/pet/${petId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
        organizationId: '219',
      },
    })
  }

  return (
    <Container>
      <Row style={{padding: '40px 0px'}}>
        <Form>
          <Form.Group className='mb-3' controlId='petName'>
            <Form.Label>Pet Name</Form.Label>
            <Form.Control name='petName' defaultValue={currentPet.name} type='text' placeholder='Pet name' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='kategoriaProduktu'>
            <Form.Label>Pet Status</Form.Label>
            <Form.Select defaultValue={currentPet.status}>
              {props.petStatus.map(status => (
                <option key={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <div>
            <Button variant='primary' type='submit' onClick={postProductData} style={{marginRight: '10px'}}>
              Save
            </Button>
            <Button variant='danger' type='submit' onClick={deletePet}>
              Delete
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  )
}

export default EditPet
