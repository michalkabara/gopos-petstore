import {Form, Button, Container, Row, ToastContainer, Toast} from 'react-bootstrap'
import {useState, useEffect, useRef} from 'react'

const AddPet = (props: {petStatus: any[]; setPetStatus: (arg0: string[]) => void}) => {
  const petStatus = useRef<HTMLSelectElement>(null)
  const [showToast, setShowToast] = useState(false)

  interface newPetInterface {
    id: number
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
    id: 0,
    category: {
      id: 0,
      name: 'string',
    },
    name: '',
    photoUrls: ['string'],
    tags: [
      {
        id: '',
        name: 'string',
      },
    ],
    status: '',
  })

  const handleNameChange = (e: React.FormEvent) => {
    setNewPet({...newPet, name: (e.target as HTMLInputElement).value})
  }

  const addNewPet = async (e: React.FormEvent) => {
    if (newPet.name !== '' || newPet.status !== '') {
      e.preventDefault()
      await fetch('https://petstore.swagger.io/v2/pet', {
        method: 'POST',
        body: JSON.stringify(newPet),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
        },
      })

      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 5000)
    }
  }

  useEffect(() => {
    setNewPet({
      ...newPet,
      id: Math.floor(Math.random() * 100000000),
      status: petStatus.current?.value,
    })
  }, [])

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
            <Form.Control type='text' placeholder='Pet name' onChange={e => handleNameChange(e)} required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='kategoriaProduktu'>
            <Form.Label>Pet Status</Form.Label>
            <Form.Select ref={petStatus} required>
              {props.petStatus.map(status => (
                <option key={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant='primary' type='submit' onClick={e => addNewPet(e)}>
            Add
          </Button>
        </Form>
      </Row>
      {showToast && (
        <ToastContainer className='p-3' position='bottom-end'>
          <Toast>
            <Toast.Header closeButton={false}>
              <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
              <strong className='me-auto'>Success</strong>
            </Toast.Header>
            <Toast.Body>Pet has been added</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  )
}

export default AddPet
