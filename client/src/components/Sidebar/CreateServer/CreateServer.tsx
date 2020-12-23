import React from 'react'
import styled from 'styled-components'
import { IoAdd } from 'react-icons/io5'

const CreateServerStyles = styled.div`
  border-top: 1px solid #e0e0e0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 3.8rem;
  color: rgba(23, 26, 42, 0.7);
  font-weight: 500;
  font-size: 1.1rem;
  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: #006eff;
  }

  button {
    position: relative;
    border: 0;
    background: inherit;
    padding: 0;
    cursor: pointer;
  }
`

const CreateServer: React.FC = () => {
  return (
    <CreateServerStyles>
      <div>Create Your Own Server</div>
      <button>
        <IoAdd />
      </button>
    </CreateServerStyles>
  )
}

export default CreateServer
