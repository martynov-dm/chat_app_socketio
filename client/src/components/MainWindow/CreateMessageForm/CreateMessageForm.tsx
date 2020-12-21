import React from 'react'
import styled from 'styled-components'
import { RiSendPlane2Fill } from 'react-icons/ri'

const MessagesSectionLayout = styled.form`
  display: flex;
  align-items: center;
  border-top: 1px solid #e0e0e0;
  height: 3.8rem;
  width: 100%;

  svg {
    width: 2rem;
    height: 2rem;
    fill: #006eff;
    margin-right: 2rem;
  }

  button {
    position: relative;
    border: 0;
    background: #fff;
    padding: 0;
    cursor: pointer;
  }

  input:first-child {
    flex: 1 1 100%;
    padding: 1rem;
    border: 0;
    font-size: 1rem;
  }
`

const CreateMessageForm: React.FC = () => {
  return (
    <MessagesSectionLayout>
      <input placeholder='Type a Message...' />
      <button type='submit'>
        <RiSendPlane2Fill />
      </button>
    </MessagesSectionLayout>
  )
}

export default CreateMessageForm
