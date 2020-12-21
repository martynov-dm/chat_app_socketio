import React from 'react'
import styled from 'styled-components'

const CreateServerStyles = styled.div`
  border-top: 1px solid #e0e0e0;

  display: flex;
  align-items: center;
  padding: 1rem;
  height: 3.8rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
  font-size: 1.1rem;
`

const CreateServer: React.FC = () => {
  return <CreateServerStyles>Create Your Own Server + </CreateServerStyles>
}

export default CreateServer
