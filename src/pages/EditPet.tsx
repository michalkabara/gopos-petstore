import {Form, Button, Container, Row} from 'react-bootstrap'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const EditPet = (props: {setPetStatus: (arg0: string[]) => void; petStatus: any[]}) => {
  const {petId} = useParams()

  interface currentPetInterface {
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

  const [currentPet, setCurrentPet] = useState<currentPetInterface>({
    id: '',
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
    await fetch(`https://petstore.swagger.io/v2/pet/${petId}`, {
      method: 'PUT',
      body: JSON.stringify(currentPet),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
        organizationId: '219',
      },
    })
    e.preventDefault()
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

  const handleChange = (e: React.FormEvent) => {
    setCurrentPet({...currentPet, name: (e.target as HTMLInputElement).value})
    console.log(currentPet)
  }

  const deletePet = async (e: React.FormEvent) => {
    await fetch(`https://petstore.swagger.io/v2/pet/${petId}`, {
      method: 'DELETE',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
        organizationId: '219',
      },
    })
    e.preventDefault()
  }

  return (
    <Container>
      <Row style={{padding: '40px 0px'}}>
        <Form>
          <Form.Group className='mb-3' controlId='petName'>
            <Form.Label>Pet Name</Form.Label>
            <Form.Control
              name='petName'
              defaultValue={currentPet.name}
              type='text'
              placeholder='Pet name'
              onChange={e => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='kategoriaProduktu'>
            <Form.Label>Pet Status</Form.Label>
            <Form.Select value={currentPet.status}>
              {props.petStatus.map(status => (
                <option key={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <div>
            <Button variant='primary' type='submit' onClick={postPetData} style={{marginRight: '10px'}}>
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
