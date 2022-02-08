import {Form, Button, Container, Row} from 'react-bootstrap'
import {useState, useEffect, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'

const AddPet = (props: {petStatus: any[]; setPetStatus: (arg0: string[]) => void}) => {
  const petStatus = useRef<HTMLSelectElement>(null)
  const newPetName = useRef<HTMLInputElement>(null)

  interface newPetInterface {
    id: string
    category: {
      id: number
      name: string
    }
    name: string | undefined
    photoUrls: [string]
    tags: [{id: string; name: string}]
    status: string | undefined
  }

  const [newPet, setNewPet] = useState<newPetInterface>({
    id: '',
    category: {
      id: 0,
      name: 'string',
    },
    name: 'doggie',
    photoUrls: ['string'],
    tags: [
      {
        id: '',
        name: 'string',
      },
    ],
    status: 'available',
  })

  const addNewPet = async () => {
    setNewPet({...newPet, id: uuidv4(), name: petStatus.current?.value, status: petStatus.current?.value})

    await fetch('https://petstore.swagger.io/v2/pet', {
      method: 'POST',
      body: JSON.stringify(newPet),
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

  return (
    <Container>
      <Row style={{padding: '40px 0px'}}>
        <Form>
          <Form.Group className='mb-3' controlId='petName'>
            <Form.Label>Pet Name</Form.Label>
            <Form.Control type='text' placeholder='Pet name' ref={newPetName} required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='kategoriaProduktu'>
            <Form.Label>Pet Status</Form.Label>
            <Form.Select ref={petStatus} required>
              {props.petStatus.map(status => (
                <option key={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant='primary' type='submit' onClick={addNewPet}>
            Add
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default AddPet
