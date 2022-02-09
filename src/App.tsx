import {useState, useEffect} from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import {Link, Routes, Route} from 'react-router-dom'
import './App.css'
import PetsList from './pages/PetsList'
import AddPet from './pages/AddPet'
import EditPet from './pages/EditPet'

function App() {
  const [pets, setPets] = useState<any[]>([])
  const [petStatus, setPetStatus] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getPetsData = async (status = '1') => {
    setIsLoading(true)
    setPets([])
    const response = await fetch(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`)
    const petsData = await response.json()
    setPets(petsData)
    setIsLoading(false)
  }

  useEffect(() => {
    getPetsData()
  }, [])

  useEffect(() => {
    const getStoreInventory = async () => {
      const response = await fetch('https://petstore.swagger.io/v2/store/inventory')
      const storeInventory = await response.json()
      const petStatus = Object.keys(storeInventory)
      setPetStatus(petStatus)
    }
    getStoreInventory()
  }, [])

  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Container style={{gap: '20px'}}>
          <Navbar.Text>
            <Link to='/'>GoPos PetList</Link>
          </Navbar.Text>

          <Nav className='me-auto' style={{gap: '20px'}}>
            <Navbar.Text>
              <Link to='/'>Pets list</Link>
            </Navbar.Text>

            <Navbar.Text>
              <Link to='/addpet'>Add Pet</Link>
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path='/'
          element={
            <PetsList pets={pets} isLoading={isLoading} petStatus={petStatus} getPetsData={getPetsData} />
          }
        />
        <Route path='/addpet' element={<AddPet petStatus={petStatus} setPetStatus={setPetStatus} />} />
        <Route path='/pets/:petId' element={<EditPet setPetStatus={setPetStatus} petStatus={petStatus} />} />
      </Routes>
    </div>
  )
}

export default App
