import Head from 'next/head'
import { useState, useRef, useEffect } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap'

const steps = [
  {
    title: "Event Loop",
    img: {
      src: `/images/event_loop_schema.png`,
      alt: "Title"
    },
    subtitle: {
      text: "Introdution in Event Loop"
    }
  },
  {
    title: "Intridution",
    img: null,
    subtitle: {
      text: "This is the best time of the year"
    }
  }
]

const Subtitle = ({text, selection}) => (
  <p><span className="active">{text.slice(0, selection)}</span>{text.slice(selection)}</p>
)

const Step = ({stepId, selection}) => {

  const idx = stepId % steps.length;

  const step = steps[idx]

  console.log(step)
  return <Container style={{margin: "auto"}}>
    <Row>
      <Col xs={12}>{step.title && <h2>{step.title}</h2>}</Col>
    </Row>

    {step.img && <Row >
      <Col xs={6}>
        <Image src={step.img.src} alt={step.img.alt} thumbnail style={{width: "100%", height: "auto"}} />
      </Col>
    </Row>}

    <Row>
      <Col xs={12}>
        {step.subtitle?.text && <Subtitle text={step.subtitle.text} selection={selection}/>}
      </Col>
    </Row>
    
  </Container>
}

export default function Home() {

  const content = useRef()

  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState(0)

  useEffect(() => {
    content.current.classList.add('show')
  }, [step])

  const handleKeyPress = e => {
    const { key } = e;
    switch (key) {
      case "ArrowRight":
        content.current.classList.add('hide');
        content.current.classList.remove('show');
        setTimeout(() => {
          content.current.classList.remove('hide');
          content.current.classList.add('show');
          setStep(step + 1)
        }, 1000)
        break
      case "ArrowLeft":
        content.current.classList.add('hide');
        content.current.classList.remove('show');
        setTimeout(() => {
          content.current.classList.remove('hide');
          content.current.classList.add('show');
          setStep(step - 1 >= 0 ? step - 1 : 0)
        }, 1000) 
        break   
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div 
      className="container" 
      style={{margin: "auto"}}
      ref={content}
    >
      <Step stepId={step} selection={selection} />
    </div>
  )
}
