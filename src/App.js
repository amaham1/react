import logo from './logo.svg';
import './App.css';
import { Button, Nav, NavDropdown, Navbar, Container} from 'react-bootstrap'
import { useState, useContext } from 'react';
import React from 'react';
import arr from './data.js';
import Detail from './Detail.js'
import { Link, Route, Switch} from 'react-router-dom';
import axios from 'axios'
import Cart from './Cart.js'

export const 재고context = React.createContext();

function App() {

  const [shoes, setShoes] = useState(arr);
  const [재고, 재고변경] = useState([10,11,12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">shoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Switch>
        <Route exact path="/">
          {/* 배너 */}
          <div className="mt-4 p-5 bg-primary text-white rounded background">
            <h1> 환영합니다. </h1>
            <p> 여기는 아무나의 공간입니다.</p>
            <Button variant="primary">Primary</Button>
          </div>
          {/* 상품목록 */}
          <div className="container">

            <재고context.Provider value={재고}>
              <div className="row">
                {
                  shoes.map( (e,i)=>{
                    return (
                        <Goods shoes={e} index={i} key={i}/>  
                    )
                  })
                }
              </div>
            </재고context.Provider>

            <button className="btn btn-primary" onClick={()=>{ 

              

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((res)=>{
                setShoes([...shoes, ...res.data]);
              })
              .catch(()=>{
                console.log('실패')
              })
            }}>자세히 보기</button>
          </div>
        </Route>
        
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고변경={재고변경}/>
          </재고context.Provider>
        </Route>
        <Route path="/cart">
          <Cart/>
        </Route>
        <Route path="/:id">
          <div>1이다</div>
        </Route>
      </Switch>
      {/* <Route path="/help" component={Help}></Route> */}


    </div>
  );
}



function Goods(props) {

    return (
      <div className="col-md-4">
          <img src={`https://codingapple1.github.io/shop/shoes${props.index+1}.jpg`} width="100%" alt=""/>
          <h4> {props.shoes.title}</h4>
          <p> {props.shoes.price} </p>
          <p></p>
          <Test/>
      </div>
    )
}

function Test() {

  const 재고 = useContext(재고context);
  return (
    <p>{재고}</p>
  )
}

export default App;
