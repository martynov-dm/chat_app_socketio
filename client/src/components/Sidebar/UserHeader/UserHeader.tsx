import React from 'react'
import styled from 'styled-components'

const UserHeaderStyled = styled.header`
  border-bottom: 1px solid #e0e0e0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 4.8rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: normal;

  img {
    width: 2rem;
  }
`

const UserHeader: React.FC = () => {
  return (
    <UserHeaderStyled>
      <img
        src='https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87089.jpg'
        alt='ava'
      />
      <div>
        <h3>Dmitrii</h3>
      </div>
    </UserHeaderStyled>
  )
}

export default UserHeader
