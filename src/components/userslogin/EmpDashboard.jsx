import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './SApp'
import Button from '@mui/material/Button';
import Empfind from "./Empfind";
import Empcard from './Empcard';
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";



function EmpDashboard(props) {
  const [profileForms, cProfileForms] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [show,setShow]=useState(false)
  const [show2,setShow2]=useState(false)
  const [ashow2,asetShow2]=useState(false)

  const refreshList = () => {
    props.client.getEmployerForms().then((response) => cProfileForms(response.data));
  };

  const querySearch2 = (searchEmpParams) => {
    props.client.queryResult2(searchEmpParams).then((response) => cProfileForms(response.data))
  }

  useEffect(() => {
    refreshList();
  }, []);
  
  function buildcards() {
    return profileForms.map((current) => {
      return (
        <>
        <Empcard id={current._id} 
          firstname={current.firstname} 
          lastname={current.lastname} 
          email={current.email}
          bio={current.bio} 
          linkedin={current.linkedin} 
          github={current.github} 
          portfolio={current.portfolio} 
          hired={current.hired?"true":"false"}
          skills={current.skills} 
          picture={current.picture} 
          course={current.course} 
          date={current.date} 
          cv={current.cv} ></Empcard>
        </>
      );
    });
  }
    return (

      <main>
        <Container className="contentContainer">
          <Row className="headerRow">
            <h5 className="header-title">Employer Dashboard</h5>
            <h4>logged in as {props.username}</h4>
          </Row>
      <div style={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
      <Button  variant="contained" color="primary" onClick={props.logout}>
          {" "}
          Logout{" "}
        </Button>
      </div>
        <br />
        <div class="row row-cols-1 row-cols-md-3 g-4">
        {buildcards()}
        </div>
      <Row className="bodyRow mx-auto text-center mt-2">
      <Col>
        { show2? 
          <>
        <Empfind
            client={props.client}
            querySearch2 = {querySearch2}
            currentProfileForm={current}
          />
          <a class="buttonSignUp" onClick={() => setShow2(!show2)}>See less</a>
          <a class="buttonSignUp" onClick={() => refreshList()}>Clear Filtered List</a>
          </>
        :<a class="buttonSignUp" onClick={() => setShow2(!show2)}>Find Participant</a> }
        </Col>
        </Row>
        </Container>
      </main>

  );
  
}
export default EmpDashboard;