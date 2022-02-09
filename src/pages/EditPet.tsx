import {Form, Button, Container, Row, Toast, ToastContainer} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const EditPet = (props: {setPetStatus: (arg0: string[]) => void; petStatus: any[]}) => {
  const {petId} = useParams()
  const navigate = useNavigate()

  const [showToast, setShowToast] = useState(false)
  interface currentPetInterface {
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

  const [currentPet, setCurrentPet] = useState<currentPetInterface>({
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
    status: 'available',
  })

  const getPetData = async () => {
    const response = await fetch(`https://petstore.swagger.io/v2/pet/${petId}`)
    const petData = await response.json()
    setCurrentPet(petData)
  }

  useEffect(() => {
    getPetData()
  }, [])

  const postPetData = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`https://petstore.swagger.io/v2/pet/`, {
      method: 'PUT',
      body: JSON.stringify(currentPet),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        api_key: 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
      },
    })
    if (!response.ok) {
      throw new Error('Updating pet data failed')
    }
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 5000)
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

  const handleChangePetName = (e: React.FormEvent) => {
    setCurrentPet({...currentPet, name: (e.target as HTMLInputElement).value})
  }

  const handleChangePetStatus = (e: React.FormEvent) => {
    setCurrentPet({...currentPet, status: (e.target as HTMLSelectElement).value})
  }

  const deletePet = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`https://petstore.swagger.io/v2/pet/${petId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        api_key: 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
      },
    })
    navigate('/')
  }

  return (
    <Container>
      <Row style={{padding: '40px 0px'}}>
        <Form onSubmit={postPetData}>
          <Form.Group className='mb-3' controlId='petName'>
            <Form.Label>Pet Name</Form.Label>
            <Form.Control
              name='petName'
              defaultValue={currentPet.name}
              type='text'
              placeholder='Pet name'
              onChange={e => handleChangePetName(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='kategoriaProduktu'>
            <Form.Label>Pet Status</Form.Label>
            <Form.Select value={currentPet.status} onChange={e => handleChangePetStatus(e)}>
              {props.petStatus.map(status => (
                <option key={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <div>
            <Button variant='primary' type='submit' style={{marginRight: '10px'}}>
              Save
            </Button>
            <Button variant='danger' type='submit' onClick={deletePet}>
              Delete
            </Button>
          </div>
        </Form>
      </Row>
      {showToast && (
        <ToastContainer className='p-3' position='bottom-end'>
          <Toast>
            <Toast.Header closeButton={false}>
              <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
              <strong className='me-auto'>Success</strong>
            </Toast.Header>
            <Toast.Body>Pet has been updated</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  )
}

export default EditPet
