import React  from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ExampleImage from "../../assets/icons/examples-image.png";
import CapabilitieseImage from "../../assets/icons/capabilities-image.png";
import LimitImage from "../../assets/icons/limits-image.png";
import "./LandingPage.css";
const LandingPage = () => {
    return (
        <Container className="my-3 my-md-5 px-4">
            <Row className="g-4 justify-content-center">
                {/* Examples Column */}
                <Col xs={12} md={6} lg={4}>
                    <div className="text-center h-100 p-3">
                        <img 
                            src={ExampleImage} 
                            className='icon img-fluid mb-3' 
                            style={{ maxWidth: '80px', height: 'auto' }}
                        />
                        <h2 style={{color:"var(--text-color)"}} className="fs-5 fs-md-4 mb-3">Use Cases</h2>
                        <div className="d-flex flex-column gap-3">
                            <div className="example-item p-2 rounded text-start text-sm-center">
                                Explain digital transformation to non-technical stakeholders
                            </div>
                            <div className="capability-item p-2 rounded">
                                Best practices for implementing AI in financial services
                            </div>
                            <div className="capability-item p-2 rounded">
                                How to optimize IT infrastructure for cloud migration
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Capabilities Column */}
                <Col xs={12} md={6} lg={4}>
                    <div className="text-center h-100 p-3">
                        <img 
                            src={CapabilitieseImage} 
                            className='icon img-fluid mb-3' 
                            style={{ maxWidth: '80px', height: 'auto' }}
                        />
                        <h2 style={{color:"var(--text-color)"}} className="fs-5 fs-md-4 mb-3">Core Expertise</h2>
                        <div className="d-flex flex-column gap-3">
                            <div className="capability-item p-2 rounded">
                                End-to-end digital transformation consulting
                            </div>
                            <div className="capability-item p-2 rounded">
                                Agile-driven enterprise solution development
                            </div>                            
                            <div className="capability-item p-2 rounded">
                                AI-powered business process optimization
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Commitments Column */}
                <Col xs={12} md={6} lg={4}>
                    <div className="text-center h-100 p-3">
                        <img 
                            src={LimitImage} 
                            className='icon img-fluid mb-3' 
                            style={{ maxWidth: '80px', height: 'auto' }}
                        />
                        <h2 style={{color:"var(--text-color)"}} className="fs-5 fs-md-4 mb-3">Ethical Framework</h2>
                        <div className="d-flex flex-column gap-3">
                            <div className="limitation-item p-2 rounded">
                                Client data confidentiality guarantee
                            </div>
                            <div className="limitation-item p-2 rounded">
                                Compliance with EU digital regulations
                            </div>
                            <div className="limitation-item p-2 rounded">
                                Sustainable innovation roadmap adherence
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LandingPage;